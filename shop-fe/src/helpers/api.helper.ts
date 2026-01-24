'use server';

import { API_URL } from "@/constants/api.constant";
import { getSession } from "@/lib/session";

export interface IBaseApiResponse<T> {
  data?: T | any;
  statusCode: number;
  message?: string;
  totalItems?: number,
  optional?: any
}


interface IOptions extends RequestInit {
  body?: any;
  fullUrl?: string;
  skipAuth?: boolean;
  url?: string;
}

export async function api<T>({
  url,
  body,
  fullUrl,
  skipAuth,
  method = "GET",
  ...options
}: IOptions & { method?: string }): Promise<IBaseApiResponse<T>> {

  let headers: HeadersInit = {
    ...(options.headers || {}),
  };

  if (!skipAuth) {
    const session = await getSession();
    const token = session?.token;
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  let bodyData = body;
  if (body instanceof FormData) {
    // fetch tự set content-type
  } else if (body) {
    (headers as Record<string, string>)["Content-Type"] = "application/json";
    bodyData = JSON.stringify(body);
  }

  const response = await fetch(fullUrl || `${API_URL}${url}`, {
    ...options,
    method,
    headers,
    body: bodyData,
    cache: "no-store",
    credentials: 'include'
  });

  // ⚠️ fetch có thể trả body rỗng
  const result = await response
    .json()
    .catch(() => ({}));

  // ✅ 401 → trả object, KHÔNG throw
  if (response.status === 401) {
    return {
      statusCode: 401,
      message: "Unauthorized",
    };
  }

  if (!response.ok) {
    throw new Error(
      result?.message || result?.error || `HTTP ${response.status}`
    );
  }

  return {
    statusCode: response.status,
    ...result,
  };
}

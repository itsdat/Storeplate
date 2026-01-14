'use server';
import { API_URL } from "@/constants/api.constant";
import { BASE_ROUTE } from "@/constants/route.contant";
import { getSession } from "@/lib/session";
import { IBaseErrorRes } from "@/shared/constants/common/IBaseRetun.interface";

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
}: IOptions & { method?: string }): Promise<T & IBaseErrorRes> {
  let headers: HeadersInit = {
    ...(options.headers || {}),
  };

  // Nếu có token thì gắn vào header 
  if (!skipAuth) {
    const session = await getSession()
    const token = session?.token
    // const session = sessionStorage.getItem("token");
    if (token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
  }

  // Serialize body
  let bodyData = body;
  if (body instanceof FormData) {
    // ❌ không set Content-Type, fetch sẽ tự thêm
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
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || `HTTP ${response.status}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      window.location.href = `${BASE_ROUTE.HOME}`;
    }else if(response.status === 500){
      window.location.href = `${BASE_ROUTE.ERROR}`;
    }
    throw new Error(`API Error: ${response.status}`);
  }

  return result;
}

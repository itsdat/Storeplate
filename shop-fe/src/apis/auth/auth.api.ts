"use server";

import { api } from "@/helpers/api.helper";
import { ILogin, IRegister } from "@/interfaces/auth/auth.interface";
import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { ROUTE_CONTROLLERS } from "@/shared/constants/routes/route-controller.constants";
import { ROUTE_FEATURES } from "@/shared/constants/routes/route-feature.constants";
import { CONST_METHODS } from "@/shared/constants/routes/methods.constants";
import { IUser } from "@/interfaces/user/user.interface";

const URL = ROUTE_CONTROLLERS.AUTH;
const FEATURE = ROUTE_FEATURES.AUTH;

const isHttps =
  process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://");

export async function login(payload: ILogin) {
  const res = await api({
    url: `${URL}/${FEATURE.LOGIN}`,
    method: CONST_METHODS.POST,
    body: payload,
    skipAuth: true,
  });

  const sessionData = {
    userId: res?.data?.user.id,
    email: res.data.user.email,
    username: res.data.user.username,
    role: res.data.user.role,
    token: res.data.access_token
  };
  const encryptedSession = await encrypt(sessionData);
  (await
    cookies()).set("token", encryptedSession, {
    httpOnly: true,
    secure: isHttps,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res
}

export async function adminLogin(payload: ILogin) {
  const res = await api({
    url: `${URL}/${FEATURE.ADMIN_LOGIN}`,
    method: CONST_METHODS.POST,
    body: payload,
    skipAuth: true,
  });

  const sessionData = {
    id: res?.data?.admin.id,
    email: res.data.admin.email,
    role: res.data.admin.role,
    token: res.data.access_token
  };
  const encryptedSession = await encrypt(sessionData);
  (await
    cookies()).set("token", encryptedSession, {
    httpOnly: true,
    secure: isHttps,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res
}

export async function register(payload: IRegister){
  const res = await api({
    url: `${URL}/${FEATURE.REGISTER}`,
    method: CONST_METHODS.POST,
    body: payload,
    skipAuth: true
  })
  return res
}

export async function getMe(){
  const res = await api<IUser>({
    url: `${URL}/${FEATURE.GET_ME}`,
    method: CONST_METHODS.GET,
  })
  return res
}

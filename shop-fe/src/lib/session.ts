import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET
if (!secretKey) throw new Error('SESSION_SECRET is not set')

const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined) {
  if (!session) return null
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.error('Failed to verify session:', error)
    return null
  }
}

export async function getSession() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

    try {
      return await decrypt(token);
    } catch {
      return null;
    }
}

export async function getCookie() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

    try {
      return token;
    } catch {
      return null;
    }
}


import { cookies } from "next/headers";

export function getCookieData() {
  const cookieData = cookies().getAll();
  return cookieData
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join("; ");
}

export const cookiesServer = (cookies: { name: string; value: string }[]) => {
  return cookies
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join("; ");
};

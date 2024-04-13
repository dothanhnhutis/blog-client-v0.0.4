export const cookiesServer = (cookies: { name: string; value: string }[]) => {
  return cookies
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join("; ");
};

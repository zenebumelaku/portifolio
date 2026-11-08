import { createHmac, timingSafeEqual } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const cookieName = "portfolio_admin";
const sessionLifetimeSeconds = 8 * 60 * 60;

const getCredentials = () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!email || !password || !secret) return null;
  return { email, password, secret };
};

const sign = (payload: string, secret: string) =>
  createHmac("sha256", secret).update(payload).digest("base64url");

const safeEqual = (left: string, right: string) => {
  const leftHash = createHmac("sha256", "compare").update(left).digest();
  const rightHash = createHmac("sha256", "compare").update(right).digest();
  return timingSafeEqual(new Uint8Array(leftHash), new Uint8Array(rightHash));
};

const readCookie = (request: VercelRequest, name: string) => {
  const cookieHeader = request.headers.cookie;
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const [key, ...valueParts] = part.trim().split("=");
    if (key === name) return valueParts.join("=");
  }
  return null;
};

export const getAdminSession = (request: VercelRequest) => {
  const credentials = getCredentials();
  const token = readCookie(request, cookieName);
  if (!credentials || !token) return null;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;
  if (!safeEqual(signature, sign(payload, credentials.secret))) return null;

  try {
    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as { email?: unknown; exp?: unknown };
    if (
      session.email !== credentials.email ||
      typeof session.exp !== "number" ||
      session.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return { email: credentials.email };
  } catch {
    return null;
  }
};

export const isAdminConfigured = () => Boolean(getCredentials());

export const signInAdmin = (
  request: VercelRequest,
  response: VercelResponse,
) => {
  const credentials = getCredentials();
  if (!credentials) {
    response.status(503).json({
      error:
        "Set ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_SESSION_SECRET in Vercel.",
    });
    return;
  }

  const body =
    typeof request.body === "object" && request.body !== null
      ? (request.body as Record<string, unknown>)
      : {};
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  const validEmail = safeEqual(email, credentials.email);
  const validPassword = safeEqual(password, credentials.password);
  if (!validEmail || !validPassword) {
    response.status(401).json({ error: "Email or password is incorrect." });
    return;
  }

  const payload = Buffer.from(
    JSON.stringify({
      email: credentials.email,
      exp: Math.floor(Date.now() / 1000) + sessionLifetimeSeconds,
    }),
  ).toString("base64url");
  const token = `${payload}.${sign(payload, credentials.secret)}`;
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader(
    "Set-Cookie",
    `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${sessionLifetimeSeconds}${secure}`,
  );
  response.status(200).json({ authenticated: true, email: credentials.email });
};

export const clearAdminSession = (response: VercelResponse) => {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.setHeader(
    "Set-Cookie",
    `${cookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`,
  );
};

export const requireAdmin = (
  request: VercelRequest,
  response: VercelResponse,
) => {
  const session = getAdminSession(request);
  if (!session) {
    response.status(401).json({ error: "Sign in to perform this action." });
    return null;
  }
  return session;
};

export const requireSameOrigin = (
  request: VercelRequest,
  response: VercelResponse,
) => {
  const origin = request.headers.origin;
  const host = request.headers.host;
  if (typeof origin !== "string" || typeof host !== "string") {
    response.status(403).json({ error: "Request origin could not be verified." });
    return false;
  }
  try {
    if (new URL(origin).host !== host.toLowerCase()) {
      response.status(403).json({ error: "Cross-origin request rejected." });
      return false;
    }
  } catch {
    response.status(403).json({ error: "Request origin is invalid." });
    return false;
  }
  return true;
};

export const methodNotAllowed = (
  response: VercelResponse,
  allowed: string[],
) => {
  response.setHeader("Allow", allowed.join(", "));
  response.status(405).json({ error: "Method not allowed." });
};

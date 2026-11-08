import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  clearAdminSession,
  getAdminSession,
  isAdminConfigured,
  methodNotAllowed,
  requireSameOrigin,
  signInAdmin,
} from "../server/auth.js";

export default function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method === "GET") {
    const session = getAdminSession(request);
    return response.status(200).json({
      configured: isAdminConfigured(),
      authenticated: Boolean(session),
      email: session?.email ?? null,
    });
  }

  if (!requireSameOrigin(request, response)) return;
  if (request.method === "POST") return signInAdmin(request, response);
  if (request.method === "DELETE") {
    clearAdminSession(response);
    return response.status(200).json({ authenticated: false });
  }

  return methodNotAllowed(response, ["GET", "POST", "DELETE"]);
}

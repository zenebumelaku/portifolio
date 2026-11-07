import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  methodNotAllowed,
  requireAdmin,
  requireSameOrigin,
} from "../server/auth";
import { getDatabase } from "../server/database";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const adminView = request.query.admin === "1";
    if (request.method === "GET") {
      if (adminView && !requireAdmin(request, response)) return;
      const rows =
        await getDatabase()`SELECT content FROM portfolio_site_content WHERE id = 'site' LIMIT 1`;
      return response.status(200).json(rows[0]?.content ?? null);
    }

    if (!requireSameOrigin(request, response)) return;
    if (!requireAdmin(request, response)) return;
    if (request.method === "PUT") {
      const body = isRecord(request.body) ? request.body : {};
      if (!isRecord(body.content) || JSON.stringify(body.content).length > 500_000) {
        return response.status(400).json({ error: "Site content is invalid." });
      }
      await getDatabase()`INSERT INTO portfolio_site_content (id, content)
                           VALUES ('site', ${JSON.stringify(body.content)}::jsonb)
                           ON CONFLICT (id) DO UPDATE SET
                             content = EXCLUDED.content,
                             updated_at = now()`;
      return response.status(200).json({ saved: true });
    }

    return methodNotAllowed(response, ["GET", "PUT"]);
  } catch (error: unknown) {
    console.error("Portfolio content API error:", error);
    return response.status(500).json({
      error: error instanceof Error ? error.message : "Could not access site content.",
    });
  }
}

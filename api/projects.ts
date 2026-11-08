import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  getAdminSession,
  methodNotAllowed,
  requireAdmin,
  requireSameOrigin,
} from "../server/auth.js";
import { getDatabase } from "../server/database.js";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const reportError = (response: VercelResponse, error: unknown) => {
  console.error("Portfolio projects API error:", error);
  return response.status(500).json({
    error: error instanceof Error ? error.message : "Could not access projects.",
  });
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    if (request.method === "GET") {
      const adminView = request.query.admin === "1";
      if (adminView && !requireAdmin(request, response)) return;
      if (adminView) response.setHeader("Cache-Control", "private, no-store");
      const sql = getDatabase();
      const rows = adminView
        ? await sql`SELECT id, published, project, sort_order
                    FROM portfolio_projects
                    ORDER BY sort_order ASC, id ASC`
        : await sql`SELECT id, published, project, sort_order
                    FROM portfolio_projects
                    WHERE published = true
                    ORDER BY sort_order ASC, id ASC`;
      return response.status(200).json(rows);
    }

    if (!requireSameOrigin(request, response)) return;
    if (!requireAdmin(request, response)) return;
    const sql = getDatabase();

    if (request.method === "PUT") {
      const body = isRecord(request.body) ? request.body : {};
      const project = body.project;
      const sortOrder = body.sortOrder;
      if (
        !isRecord(project) ||
        typeof project.id !== "string" ||
        !/^[a-zA-Z0-9_-]{1,120}$/.test(project.id) ||
        typeof project.published !== "boolean" ||
        typeof sortOrder !== "number" ||
        !Number.isInteger(sortOrder) ||
        sortOrder < 0 ||
        JSON.stringify(project).length > 200_000
      ) {
        return response.status(400).json({ error: "Project data is invalid." });
      }

      const { id, published, ...content } = project;
      await sql`INSERT INTO portfolio_projects (id, published, project, sort_order)
                VALUES (${id}, ${published}, ${JSON.stringify(content)}::jsonb, ${sortOrder})
                ON CONFLICT (id) DO UPDATE SET
                  published = EXCLUDED.published,
                  project = EXCLUDED.project,
                  sort_order = EXCLUDED.sort_order,
                  updated_at = now()`;
      return response.status(200).json({ saved: true });
    }

    if (request.method === "DELETE") {
      const id = request.query.id;
      if (typeof id !== "string" || !/^[a-zA-Z0-9_-]{1,120}$/.test(id)) {
        return response.status(400).json({ error: "Project ID is invalid." });
      }
      await sql`DELETE FROM portfolio_projects WHERE id = ${id}`;
      return response.status(200).json({ deleted: true });
    }

    return methodNotAllowed(response, ["GET", "PUT", "DELETE"]);
  } catch (error: unknown) {
    return reportError(response, error);
  }
}

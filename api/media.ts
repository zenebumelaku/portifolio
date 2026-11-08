import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getAdminSession } from "../server/auth.js";

const imageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];
const projectTypes = [...imageTypes, "video/mp4", "video/webm"];

export const config = {
  api: {
    bodyParser: { sizeLimit: "1mb" },
  },
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  try {
    const body = request.body as HandleUploadBody;
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!getAdminSession(request)) {
          throw new Error("Sign in to upload media.");
        }

        const validPath =
          /^projects\/[a-zA-Z0-9_-]{1,120}\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|gif|avif|mp4|webm)$/i.test(
            pathname,
          ) ||
          /^certifications\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|gif|avif)$/i.test(
            pathname,
          );
        if (!validPath) throw new Error("Media path is invalid.");

        const isCertification = pathname.startsWith("certifications/");
        const isVideo = /\.(mp4|webm)$/i.test(pathname);
        return {
          allowedContentTypes: isCertification ? imageTypes : projectTypes,
          maximumSizeInBytes:
            isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return response.status(200).json(result);
  } catch (error: unknown) {
    console.error("Portfolio media upload error:", error);
    return response.status(400).json({
      error: error instanceof Error ? error.message : "Could not upload media.",
    });
  }
}

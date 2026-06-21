import { getYoutubePublicSnapshot } from "@/lib/youtube-public-snapshot";

export async function GET() {
  try {
    const payload = await getYoutubePublicSnapshot();

    return Response.json(
      payload,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load YouTube snapshot.";

    return Response.json(
      {
        error: message,
        retrievedAt: new Date().toISOString(),
        snapshots: [],
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}

export type YoutubeUpload = {
  id: string;
  title: string;
  publishedAt: string | null;
  url: string;
  thumbnailUrl: string | null;
};

export type YoutubeSnapshot = {
  id: string;
  title: string;
  handle: string;
  channelUrl: string;
  thumbnailUrl: string | null;
  subscribers: number | null;
  views: number | null;
  videos: number | null;
  latestUploads: YoutubeUpload[];
};

export type SnapshotResponse = {
  retrievedAt: string;
  snapshots: YoutubeSnapshot[];
  error?: string;
};

const CHANNELS = [
  { id: "yt-kiwi", handle: "soyverdekiwi" },
  { id: "yt-stivion", handle: "sstivion" },
  { id: "yt-racso", handle: "racsodraws" },
  { id: "yt-netoxclips", handle: "netoclipp" },
  { id: "yt-visionclip", handle: "visionclipvn" },
] as const;

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
} as const;

function decodeXmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function readMatch(source: string, pattern: RegExp) {
  return source.match(pattern)?.[1] ?? null;
}

function parseCompactCount(value: string | null) {
  if (!value) {
    return null;
  }

  const compactMatch = value.match(/([\d.,]+)\s*([KMB])/i);
  if (compactMatch) {
    const rawNumber = compactMatch[1];
    const normalizedNumber =
      rawNumber.includes(",") && rawNumber.includes(".")
        ? rawNumber.replace(/,/g, "")
        : rawNumber.replace(",", ".");

    const parsed = Number(normalizedNumber);

    if (!Number.isNaN(parsed)) {
      const multiplier =
        compactMatch[2].toUpperCase() === "B"
          ? 1_000_000_000
          : compactMatch[2].toUpperCase() === "M"
            ? 1_000_000
            : 1_000;

      return Math.round(parsed * multiplier);
    }
  }

  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
}

function parseIntegerCount(value: string | null) {
  if (!value) {
    return null;
  }

  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
}

async function fetchLatestUploads(channelId: string): Promise<YoutubeUpload[]> {
  const response = await fetch(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
    {
      headers: REQUEST_HEADERS,
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return [];
  }

  const xml = await response.text();
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, 3);

  return entries.map((entry) => {
    const body = entry[1];
    const videoId = readMatch(body, /<yt:videoId>([^<]+)<\/yt:videoId>/);
    const title = decodeXmlEntities(
      readMatch(body, /<title>([\s\S]*?)<\/title>/) ?? "Untitled upload",
    );
    const publishedAt = readMatch(body, /<published>([^<]+)<\/published>/);
    const thumbnailUrl =
      readMatch(body, /<media:thumbnail url="([^"]+)"/) ??
      (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null);

    return {
      id: videoId ?? "",
      title,
      publishedAt,
      url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : "",
      thumbnailUrl,
    };
  });
}

async function fetchChannelSnapshot(handle: string, id: string): Promise<YoutubeSnapshot | null> {
  const response = await fetch(`https://www.youtube.com/@${handle}/about?hl=en`, {
    headers: REQUEST_HEADERS,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Public YouTube page request failed for ${handle}.`);
  }

  const html = await response.text();
  const channelId = readMatch(html, /"channelId":"([^"]+)"/);

  if (!channelId) {
    return null;
  }

  const title =
    decodeXmlEntities(
      readMatch(html, /<meta property="og:title" content="([^"]+)"/) ?? handle,
    ) ?? handle;

  const thumbnailUrl =
    decodeXmlEntities(
      readMatch(html, /<meta property="og:image" content="([^"]+)"/) ?? "",
    ) || null;

  const subscribersText = readMatch(html, /"subscriberCountText":"([^"]+)"/);
  const viewsText = readMatch(html, /"viewCountText":"([^"]+)"/);
  const videosText = readMatch(html, /"videoCountText":"([^"]+)"/);
  const latestUploads = await fetchLatestUploads(channelId);

  return {
    id,
    title,
    handle: `@${handle}`,
    channelUrl: `https://www.youtube.com/@${handle}`,
    thumbnailUrl,
    subscribers: parseCompactCount(subscribersText),
    views: parseIntegerCount(viewsText),
    videos: parseIntegerCount(videosText),
    latestUploads,
  };
}

export async function getYoutubePublicSnapshot(): Promise<SnapshotResponse> {
  const snapshots = await Promise.all(
    CHANNELS.map((channel) => fetchChannelSnapshot(channel.handle, channel.id)),
  );

  return {
    retrievedAt: new Date().toISOString(),
    snapshots: snapshots.filter(
      (snapshot): snapshot is YoutubeSnapshot => snapshot !== null,
    ),
  };
}

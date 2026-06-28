export type YoutubeUpload = {
  id: string;
  title: string;
  publishedAt: string | null;
  url: string;
  thumbnailUrl: string | null;
};

export type YoutubeSnapshot = {
  id: string;
  youtubeChannelId?: string;
  title: string;
  handle: string;
  channelUrl: string;
  thumbnailUrl: string | null;
  subscribers: number | null;
  views: number | null;
  videos: number | null;
  latestUploads: YoutubeUpload[];
  source?: "youtube-data-api" | "public-youtube";
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

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

type YoutubeApiChannel = {
  id: string;
  snippet?: {
    title?: string;
    customUrl?: string;
    thumbnails?: Record<string, { url?: string }>;
  };
  statistics?: {
    subscriberCount?: string;
    hiddenSubscriberCount?: boolean;
    viewCount?: string;
    videoCount?: string;
  };
  contentDetails?: {
    relatedPlaylists?: {
      uploads?: string;
    };
  };
};

type YoutubeApiPlaylistItem = {
  snippet?: {
    title?: string;
    publishedAt?: string;
    thumbnails?: Record<string, { url?: string }>;
    resourceId?: {
      videoId?: string;
    };
  };
  contentDetails?: {
    videoId?: string;
    videoPublishedAt?: string;
  };
};

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

function parseApiNumber(value: string | undefined) {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeHandle(value: string | undefined, fallback: string) {
  const trimmed = (value || fallback).trim();
  if (!trimmed) {
    return fallback.startsWith("@") ? fallback : `@${fallback}`;
  }

  return trimmed.startsWith("@") ? trimmed : `@${trimmed}`;
}

function bestThumbnail(
  thumbnails?: Record<string, { url?: string }>,
): string | null {
  return (
    thumbnails?.maxres?.url ??
    thumbnails?.standard?.url ??
    thumbnails?.high?.url ??
    thumbnails?.medium?.url ??
    thumbnails?.default?.url ??
    null
  );
}

function configuredRefreshTokens() {
  const raw =
    process.env.YOUTUBE_REFRESH_TOKENS ||
    process.env.YOUTUBE_OAUTH_REFRESH_TOKENS ||
    process.env.YOUTUBE_ANALYTICS_REFRESH_TOKENS ||
    process.env.YOUTUBE_ANALYTICS_REFRESH_TOKEN ||
    "";

  return raw
    .split(/\r?\n|,/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function youtubeClientConfig() {
  const clientId =
    process.env.YOUTUBE_CLIENT_ID ||
    process.env.YOUTUBE_ANALYTICS_CLIENT_ID ||
    process.env.GOOGLE_OAUTH_CLIENT_ID ||
    "";
  const clientSecret =
    process.env.YOUTUBE_CLIENT_SECRET ||
    process.env.YOUTUBE_ANALYTICS_CLIENT_SECRET ||
    process.env.GOOGLE_OAUTH_CLIENT_SECRET ||
    "";
  const refreshTokens = configuredRefreshTokens();

  if (!clientId || !clientSecret || refreshTokens.length === 0) {
    return null;
  }

  return { clientId, clientSecret, refreshTokens };
}

async function refreshAccessToken(
  refreshToken: string,
  clientId: string,
  clientSecret: string,
) {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { access_token?: string };
  return payload.access_token ?? null;
}

async function fetchYoutubeApi<T>(path: string, accessToken: string): Promise<T | null> {
  const response = await fetch(`${YOUTUBE_API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

async function fetchAuthenticatedUploads(
  accessToken: string,
  playlistId: string | undefined,
) {
  if (!playlistId) {
    return [];
  }

  const payload = await fetchYoutubeApi<{ items?: YoutubeApiPlaylistItem[] }>(
    `/playlistItems?part=snippet,contentDetails&maxResults=3&playlistId=${encodeURIComponent(
      playlistId,
    )}`,
    accessToken,
  );

  return (payload?.items ?? []).map((item) => {
    const videoId = item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId ?? "";
    const publishedAt =
      item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt ?? null;

    return {
      id: videoId,
      title: item.snippet?.title ?? "Untitled upload",
      publishedAt,
      url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : "",
      thumbnailUrl:
        bestThumbnail(item.snippet?.thumbnails) ||
        (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null),
    };
  });
}

async function snapshotFromApiChannel(
  channel: YoutubeApiChannel,
  accessToken: string,
  fallbackId: string,
): Promise<YoutubeSnapshot> {
  const handle = normalizeHandle(
    channel.snippet?.customUrl,
    channel.snippet?.title || channel.id,
  );
  const uploads = await fetchAuthenticatedUploads(
    accessToken,
    channel.contentDetails?.relatedPlaylists?.uploads,
  );

  return {
    id: fallbackId,
    youtubeChannelId: channel.id,
    title: channel.snippet?.title || handle.replace(/^@/, ""),
    handle,
    channelUrl: `https://www.youtube.com/${handle}`,
    thumbnailUrl: bestThumbnail(channel.snippet?.thumbnails),
    subscribers: channel.statistics?.hiddenSubscriberCount
      ? null
      : parseApiNumber(channel.statistics?.subscriberCount),
    views: parseApiNumber(channel.statistics?.viewCount),
    videos: parseApiNumber(channel.statistics?.videoCount),
    latestUploads: uploads,
    source: "youtube-data-api",
  };
}

async function fetchAuthenticatedSnapshots(): Promise<YoutubeSnapshot[]> {
  const config = youtubeClientConfig();
  if (!config) {
    return [];
  }

  const snapshots = await Promise.all(
    config.refreshTokens.map(async (refreshToken, index) => {
      const accessToken = await refreshAccessToken(
        refreshToken,
        config.clientId,
        config.clientSecret,
      );

      if (!accessToken) {
        return [];
      }

      const payload = await fetchYoutubeApi<{ items?: YoutubeApiChannel[] }>(
        "/channels?part=snippet,statistics,contentDetails&mine=true&maxResults=50",
        accessToken,
      );

      const channels = payload?.items ?? [];
      const channelSnapshots = await Promise.all(
        channels.map((channel) =>
          snapshotFromApiChannel(channel, accessToken, `yt-api-${channel.id || index}`),
        ),
      );

      return channelSnapshots;
    }),
  );

  return snapshots.flat();
}

async function fetchDataApiPublicSnapshots(): Promise<YoutubeSnapshot[]> {
  const config = youtubeClientConfig();
  if (!config) {
    return [];
  }

  const accessToken = await refreshAccessToken(
    config.refreshTokens[0],
    config.clientId,
    config.clientSecret,
  );

  if (!accessToken) {
    return [];
  }

  const snapshots = await Promise.all(
    CHANNELS.map(async (channel) => {
      const payload = await fetchYoutubeApi<{ items?: YoutubeApiChannel[] }>(
        `/channels?part=snippet,statistics,contentDetails&forHandle=${encodeURIComponent(
          channel.handle,
        )}`,
        accessToken,
      );
      const apiChannel = payload?.items?.[0];

      return apiChannel
        ? snapshotFromApiChannel(apiChannel, accessToken, channel.id)
        : null;
    }),
  );

  return snapshots.filter(
    (snapshot): snapshot is YoutubeSnapshot => snapshot !== null,
  );
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
    youtubeChannelId: channelId,
    title,
    handle: `@${handle}`,
    channelUrl: `https://www.youtube.com/@${handle}`,
    thumbnailUrl,
    subscribers: parseCompactCount(subscribersText),
    views: parseIntegerCount(viewsText),
    videos: parseIntegerCount(videosText),
    latestUploads,
    source: "public-youtube",
  };
}

export async function getYoutubePublicSnapshot(): Promise<SnapshotResponse> {
  const [authenticatedSnapshots, dataApiPublicSnapshots, publicSnapshots] = await Promise.all([
    fetchAuthenticatedSnapshots().catch(() => []),
    fetchDataApiPublicSnapshots().catch(() => []),
    Promise.all(
      CHANNELS.map((channel) => fetchChannelSnapshot(channel.handle, channel.id)),
    ),
  ]);

  const ordered = [
    ...authenticatedSnapshots,
    ...dataApiPublicSnapshots,
    ...publicSnapshots.filter(
      (snapshot): snapshot is YoutubeSnapshot => snapshot !== null,
    ),
  ];

  const seen = new Set<string>();
  const snapshots = ordered.filter((snapshot) => {
    const keys = [
      snapshot.youtubeChannelId,
      snapshot.handle.toLowerCase(),
      snapshot.channelUrl.toLowerCase(),
      snapshot.id,
    ].filter((key): key is string => Boolean(key));

    if (keys.some((key) => seen.has(key))) {
      return false;
    }

    keys.forEach((key) => seen.add(key));
    return true;
  });

  return {
    retrievedAt: new Date().toISOString(),
    snapshots,
  };
}

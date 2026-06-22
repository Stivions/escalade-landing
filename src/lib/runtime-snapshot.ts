export type RuntimeProof = {
  timestamp?: string | null;
  hash?: string | null;
  shortHash?: string | null;
  source?: string | null;
  provider?: string | null;
  model?: string | null;
  score?: number | null;
  decision?: string | null;
  xStatus?: string | null;
  youtubeStatus?: string | null;
  storage?: string | null;
};

export type RuntimeDashboardSnapshot = {
  generatedAt?: string | null;
  metrics?: {
    ai_decisions?: number;
    sources_analyzed?: number;
    proofs_generated?: number;
    zero_g_proofs_stored?: number;
    average_processing_time_ms?: number;
  };
  status?: {
    compute?: {
      connected?: boolean;
      providerAddress?: string;
      providerLabel?: string;
      model?: string;
      validationMethod?: string | null;
      verifiability?: string | null;
    };
    storage?: {
      mode?: string;
    };
    safety?: {
      realPosting?: boolean;
      mirrorMode?: boolean;
    };
  };
  proofs?: RuntimeProof[];
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
  "http://localhost:3000";

const runtimeBaseUrl =
  process.env.ESCALADE_RUNTIME_API_URL?.replace(/\/+$/, "") ??
  (siteUrl.includes("localhost")
    ? "https://escalade.dev/api/runtime"
    : `${siteUrl}/api/runtime`);

export async function getRuntimeDashboardSnapshot() {
  try {
    const response = await fetch(`${runtimeBaseUrl}/dashboard`, {
      cache: "no-store",
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as RuntimeDashboardSnapshot;
  } catch {
    return null;
  }
}

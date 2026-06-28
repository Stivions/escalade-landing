"use client";

import * as React from "react";
import { ExternalLink, RefreshCcw } from "lucide-react";
import { useLocaleCopy } from "./locale-provider";
import type {
  SnapshotResponse,
  YoutubeSnapshot,
  YoutubeUpload,
} from "@/lib/youtube-public-snapshot";

type FeedItem = {
  channelId: string;
  channelTitle: string;
  channelHandle: string;
  channelUrl: string;
  upload: YoutubeUpload;
};

function formatMetric(value: number | null) {
  if (value === null) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function repairText(value: string) {
  if (!/[ÃƒÃ‚]/.test(value)) {
    return value;
  }

  try {
    return new TextDecoder("utf-8").decode(
      Uint8Array.from(value, (character) => character.charCodeAt(0)),
    );
  } catch {
    return value;
  }
}

function formatRelativeTime(
  date: string | null,
  locale: "en" | "es",
  referenceDate?: string | null,
) {
  if (!date) {
    return locale === "es" ? "sin fecha" : "no date";
  }

  const referenceTime = referenceDate
    ? new Date(referenceDate).getTime()
    : Date.now();
  const delta = Math.max(0, referenceTime - new Date(date).getTime());
  const minutes = Math.floor(delta / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) {
    return locale === "es" ? "ahora" : "now";
  }

  if (minutes < 60) {
    return locale === "es" ? `hace ${minutes}m` : `${minutes}m ago`;
  }

  if (hours < 24) {
    return locale === "es" ? `hace ${hours}h` : `${hours}h ago`;
  }

  return locale === "es" ? `hace ${days}d` : `${days}d ago`;
}

function formatPublishedDate(date: string | null, locale: "en" | "es") {
  if (!date) {
    return locale === "es" ? "sin fecha" : "no date";
  }

  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(new Date(date));
}

function clampStyle(lines: number): React.CSSProperties {
  return {
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };
}

function sourceName(snapshot: YoutubeSnapshot | null) {
  if (!snapshot) {
    return "YouTube";
  }

  return snapshot.source === "youtube-data-api"
    ? "YouTube Data API"
    : "YouTube public";
}

export function MultiAgentSection({
  initialData,
}: {
  initialData: null | SnapshotResponse;
}) {
  const { copy, locale } = useLocaleCopy();
  const [data, setData] = React.useState<SnapshotResponse | null>(initialData);
  const [selectedId, setSelectedId] = React.useState(
    initialData?.snapshots[0]?.id ?? "",
  );
  const [loading, setLoading] = React.useState(!initialData);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchSnapshot = React.useCallback(async (mode: "initial" | "refresh") => {
    try {
      if (mode === "initial") {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const response = await fetch("/api/youtube-public-snapshot", {
        cache: "no-store",
      });
      const payload = (await response.json()) as SnapshotResponse;

      if (!response.ok) {
        throw new Error(payload.error || "request_failed");
      }

      setData(payload);
      setSelectedId((current) => {
        const nextSelection =
          payload.snapshots.find((snapshot) => snapshot.id === current)?.id ??
          payload.snapshots[0]?.id ??
          "";

        return nextSelection;
      });
      setError(null);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "request_failed";
      setError(message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    const run = async (mode: "initial" | "refresh") => {
      if (cancelled) {
        return;
      }

      await fetchSnapshot(mode);
    };

    void run("initial");
    const intervalId = window.setInterval(() => {
      void run("refresh");
    }, 120000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [fetchSnapshot]);

  const snapshots = React.useMemo(() => {
    return [...(data?.snapshots ?? [])].sort((left, right) => {
      const leftDate = left.latestUploads[0]?.publishedAt
        ? new Date(left.latestUploads[0].publishedAt as string).getTime()
        : 0;
      const rightDate = right.latestUploads[0]?.publishedAt
        ? new Date(right.latestUploads[0].publishedAt as string).getTime()
        : 0;

      return rightDate - leftDate;
    });
  }, [data]);

  const selectedChannel = React.useMemo(() => {
    if (!snapshots.length) {
      return null;
    }

    return (
      snapshots.find((snapshot) => snapshot.id === selectedId) ?? snapshots[0]
    );
  }, [selectedId, snapshots]);

  const feedItems = React.useMemo<FeedItem[]>(() => {
    return snapshots
      .flatMap((snapshot) =>
        snapshot.latestUploads.map((upload) => ({
          channelId: snapshot.id,
          channelTitle: snapshot.title,
          channelHandle: snapshot.handle,
          channelUrl: snapshot.channelUrl,
          upload,
        })),
      )
      .sort((left, right) => {
        const leftDate = left.upload.publishedAt
          ? new Date(left.upload.publishedAt).getTime()
          : 0;
        const rightDate = right.upload.publishedAt
          ? new Date(right.upload.publishedAt).getTime()
          : 0;

        return rightDate - leftDate;
      });
  }, [snapshots]);

  const totalVideos = React.useMemo(() => {
    return snapshots.reduce((sum, snapshot) => sum + (snapshot.videos ?? 0), 0);
  }, [snapshots]);

  const totalLoadedUploads = React.useMemo(() => {
    return snapshots.reduce(
      (sum, snapshot) => sum + snapshot.latestUploads.length,
      0,
    );
  }, [snapshots]);

  const latestRelease = selectedChannel?.latestUploads[0] ?? null;
  const selectedUploads = selectedChannel?.latestUploads.slice(0, 3) ?? [];
  const compactFeed = feedItems.slice(0, 5);
  const referenceTime = data?.retrievedAt ?? null;

  const statCards = [
    {
      label: copy.runtime.channels,
      value: snapshots.length ? String(snapshots.length) : "--",
      meta: locale === "es" ? "en vivo" : "live",
    },
    {
      label: copy.runtime.latestUploads,
      value: totalLoadedUploads ? String(totalLoadedUploads) : "--",
      meta: locale === "es" ? "cargadas" : "loaded",
    },
    {
      label: copy.runtime.videos,
      value: totalVideos ? formatMetric(totalVideos) : "--",
      meta: locale === "es" ? "total" : "total",
    },
  ];

  return (
    <section
      id="agentes"
      className="border-t border-border-primary px-5 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            <p className="text-[13px] font-medium text-tertiary">
              {copy.runtime.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-[42px] leading-[0.96] text-primary sm:text-[56px] lg:text-[70px]">
              {copy.runtime.title}
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-secondary">
              {copy.runtime.description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => void fetchSnapshot("refresh")}
            className="inline-flex h-11 w-fit items-center gap-3 rounded-full border border-[#cfeeee] bg-white/80 px-4 text-[12px] font-semibold text-[#12333b] shadow-[0_18px_50px_rgba(12,63,70,0.08)] transition hover:bg-white"
          >
            <RefreshCcw
              className={`size-4 ${refreshing ? "animate-spin" : ""}`}
              strokeWidth={1.8}
            />
            <span>{copy.runtime.autoRefresh}</span>
            <span className="rounded-full bg-[#d8fff7] px-2 py-1 text-[#00695f]">
              {copy.runtime.autoRefreshValue}
            </span>
          </button>
        </div>

        <div className="mt-10 rounded-[38px] border border-white/80 bg-white/65 p-2 shadow-[0_44px_140px_rgba(6,40,48,0.12)] backdrop-blur-xl sm:p-3">
          <div className="overflow-hidden rounded-[32px] border border-[#153541]/75 bg-[#061117] text-white">
            <div className="flex flex-col gap-4 border-b border-white/10 bg-[radial-gradient(circle_at_18%_0%,rgba(54,246,204,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_38%)] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {statCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3"
                  >
                    <p className="text-[11px] font-medium text-[#90acb4]">
                      {card.label}
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-[26px] font-semibold leading-none">
                        {card.value}
                      </span>
                      <span className="text-[11px] font-medium text-[#54f3cf]">
                        {card.meta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[12px] text-[#a8c4cb]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#1f4851] bg-[#07171e] px-3 py-2">
                  <span className="size-2 rounded-full bg-[#45f3c8] shadow-[0_0_18px_rgba(69,243,200,0.9)]" />
                  {sourceName(selectedChannel)}
                </span>
                <span>
                  {copy.runtime.updated}{" "}
                  <strong className="font-semibold text-white">
                    {data
                      ? formatRelativeTime(
                          data.retrievedAt,
                          locale,
                          referenceTime,
                        )
                      : "--"}
                  </strong>
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-[268px_minmax(0,1fr)_292px]">
              <aside className="border-b border-white/10 p-3 lg:border-b-0 lg:border-r lg:p-4">
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {loading && !snapshots.length ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-[13px] text-[#a8c4cb]">
                      {copy.runtime.loading}
                    </div>
                  ) : null}

                  {snapshots.map((snapshot) => {
                    const isActive = snapshot.id === selectedChannel?.id;
                    const latestSnapshotUpload = snapshot.latestUploads[0] ?? null;

                    return (
                      <button
                        key={snapshot.id}
                        type="button"
                        onClick={() => setSelectedId(snapshot.id)}
                        className={`group rounded-[22px] border px-4 py-4 text-left transition ${
                          isActive
                            ? "border-[#38eac7]/70 bg-[#0e2428] shadow-[0_18px_48px_rgba(31,239,202,0.08)]"
                            : "border-white/8 bg-white/[0.025] hover:border-white/16 hover:bg-white/[0.045]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="size-11 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
                            {snapshot.thumbnailUrl ? (
                              <img
                                src={snapshot.thumbnailUrl}
                                alt={snapshot.title}
                                className="size-full object-cover"
                                loading="lazy"
                                decoding="async"
                              />
                            ) : null}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <p className="truncate text-[14px] font-semibold text-white">
                                {repairText(snapshot.title)}
                              </p>
                              <span className="shrink-0 text-[12px] font-semibold text-[#57f1cf]">
                                {formatMetric(snapshot.subscribers)}
                              </span>
                            </div>
                            <p className="mt-1 truncate text-[12px] text-[#8ba5ad]">
                              {snapshot.handle}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3 text-[12px] text-[#9eb6bd]">
                          <span>
                            {copy.runtime.videos}: {formatMetric(snapshot.videos)}
                          </span>
                          <span>
                            {latestSnapshotUpload
                              ? formatRelativeTime(
                                  latestSnapshotUpload.publishedAt,
                                  locale,
                                  referenceTime,
                                )
                              : copy.runtime.empty}
                          </span>
                        </div>
                        <p
                          className="mt-3 text-[12px] font-medium leading-relaxed text-[#d7fff5]"
                          style={clampStyle(2)}
                        >
                          {latestSnapshotUpload
                            ? repairText(latestSnapshotUpload.title)
                            : copy.runtime.empty}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div className="min-w-0 border-b border-white/10 lg:border-b-0">
                <div className="p-5 sm:p-7">
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-4">
                        <div className="size-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                          {selectedChannel?.thumbnailUrl ? (
                            <img
                              src={selectedChannel.thumbnailUrl}
                              alt={selectedChannel.title}
                              className="size-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-[34px] font-semibold leading-none text-white sm:text-[42px]">
                            {selectedChannel
                              ? repairText(selectedChannel.title)
                              : "--"}
                          </h3>
                          <p className="mt-2 truncate text-[13px] text-[#91aeb6]">
                            YouTube / {selectedChannel?.handle ?? "--"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {selectedChannel ? (
                      <a
                        href={selectedChannel.channelUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-[12px] font-semibold text-[#d8fff6] transition hover:bg-white/[0.08]"
                      >
                        {copy.runtime.viewChannel}
                        <ExternalLink className="size-3.5" strokeWidth={1.8} />
                      </a>
                    ) : null}
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        label: copy.runtime.subscribers,
                        value: formatMetric(selectedChannel?.subscribers ?? null),
                      },
                      {
                        label: copy.runtime.views,
                        value: formatMetric(selectedChannel?.views ?? null),
                      },
                      {
                        label: copy.runtime.videos,
                        value: formatMetric(selectedChannel?.videos ?? null),
                      },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-[22px] border border-white/10 bg-white/[0.035] px-4 py-4"
                      >
                        <p className="text-[12px] font-medium text-[#8da9b0]">
                          {metric.label}
                        </p>
                        <p className="mt-2 text-[36px] font-semibold leading-none text-white">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)]">
                    <article className="overflow-hidden rounded-[26px] border border-white/10 bg-white/[0.035]">
                      {latestRelease?.thumbnailUrl ? (
                        <img
                          src={latestRelease.thumbnailUrl}
                          alt={repairText(latestRelease.title)}
                          className="aspect-video w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                      <div className="p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-[12px] font-semibold text-[#54f3cf]">
                            {copy.runtime.latestRelease}
                          </p>
                          {latestRelease ? (
                            <a
                              href={latestRelease.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#d7fff5]"
                            >
                              {copy.runtime.open}
                              <ExternalLink
                                className="size-3.5"
                                strokeWidth={1.8}
                              />
                            </a>
                          ) : null}
                        </div>
                        <p
                          className="mt-3 text-[20px] font-semibold leading-tight text-white"
                          style={clampStyle(3)}
                        >
                          {latestRelease
                            ? repairText(latestRelease.title)
                            : copy.runtime.empty}
                        </p>
                        <p className="mt-3 text-[12px] text-[#93acb4]">
                          {latestRelease
                            ? `${formatPublishedDate(
                                latestRelease.publishedAt,
                                locale,
                              )} / ${formatRelativeTime(
                                latestRelease.publishedAt,
                                locale,
                                referenceTime,
                              )}`
                            : ""}
                        </p>
                      </div>
                    </article>

                    <div className="rounded-[26px] border border-white/10 bg-white/[0.025] p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-[12px] font-semibold text-[#54f3cf]">
                          {copy.runtime.recentUploads}
                        </p>
                        <span className="text-[12px] text-[#8ca7af]">
                          {sourceName(selectedChannel)}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2.5">
                        {selectedUploads.length ? (
                          selectedUploads.map((upload) => (
                            <a
                              key={upload.id}
                              href={upload.url}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-black/10 px-3.5 py-3 transition hover:bg-white/[0.04]"
                            >
                              <div className="min-w-0">
                                <p
                                  className="text-[14px] font-semibold leading-snug text-white"
                                  style={clampStyle(2)}
                                >
                                  {repairText(upload.title)}
                                </p>
                                <p className="mt-1 text-[12px] text-[#8fa9b0]">
                                  {formatPublishedDate(upload.publishedAt, locale)}
                                </p>
                              </div>
                              <span className="shrink-0 text-[12px] font-semibold text-[#d7fff5]">
                                {formatRelativeTime(
                                  upload.publishedAt,
                                  locale,
                                  referenceTime,
                                )}
                              </span>
                            </a>
                          ))
                        ) : (
                          <p className="text-[14px] text-[#8aa1ab]">
                            {copy.runtime.empty}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="p-5 sm:p-6 lg:border-l lg:border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[13px] font-semibold text-[#54f3cf]">
                      {copy.runtime.publicFeed}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#9bb6bd]">
                      {copy.runtime.sourceValue}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-[12px] font-semibold text-[#d7fff5]">
                    {data
                      ? formatRelativeTime(
                          data.retrievedAt,
                          locale,
                          referenceTime,
                        )
                      : "--"}
                  </span>
                </div>

                <div className="mt-5 space-y-2.5">
                  {compactFeed.length ? (
                    compactFeed.map((item) => (
                      <a
                        key={`${item.channelId}-${item.upload.id}`}
                        href={item.upload.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-[20px] border border-white/8 bg-white/[0.025] px-4 py-3.5 transition hover:bg-white/[0.05]"
                      >
                        <div className="flex items-center gap-2 text-[12px] text-[#8fa9b0]">
                          <span className="size-2 rounded-full bg-[#42f0c8]" />
                          <span>
                            {formatRelativeTime(
                              item.upload.publishedAt,
                              locale,
                              referenceTime,
                            )}
                          </span>
                          <span>{item.channelHandle}</span>
                        </div>
                        <p
                          className="mt-2 text-[14px] font-semibold leading-snug text-white"
                          style={clampStyle(2)}
                        >
                          {repairText(item.upload.title)}
                        </p>
                      </a>
                    ))
                  ) : (
                    <p className="text-[14px] text-[#8aa1ab]">
                      {copy.runtime.empty}
                    </p>
                  )}
                </div>
              </aside>
            </div>

            {error && !snapshots.length ? (
              <div className="border-t border-white/10 px-5 py-4 text-[13px] text-[#8aa1ab]">
                {copy.runtime.unavailable}
              </div>
            ) : null}

            {!error && !loading && !snapshots.length ? (
              <div className="border-t border-white/10 px-5 py-4 text-[13px] text-[#8aa1ab]">
                {copy.runtime.noData}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

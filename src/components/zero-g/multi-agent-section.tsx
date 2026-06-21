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
  if (!/[ÃÂ]/.test(value)) {
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
      })
      .slice(0, 9);
  }, [snapshots]);

  const totalVideos = React.useMemo(() => {
    return snapshots.reduce((sum, snapshot) => sum + (snapshot.videos ?? 0), 0);
  }, [snapshots]);

  const totalLoadedUploads = React.useMemo(() => {
    return snapshots.reduce((sum, snapshot) => sum + snapshot.latestUploads.length, 0);
  }, [snapshots]);

  const latestRelease = selectedChannel?.latestUploads[0] ?? null;
  const latestNetworkEvent = feedItems[0]?.upload.publishedAt ?? null;
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
      label: copy.runtime.updated,
      value: data
        ? formatRelativeTime(data.retrievedAt, locale, referenceTime)
        : "--",
      meta: copy.runtime.autoRefreshValue,
    },
  ];

  return (
    <section id="agentes" className="border-t border-border-primary px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1260px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <p className="text-[13px] font-medium uppercase tracking-[0.24em] text-tertiary">
              {copy.runtime.eyebrow}
            </p>
            <h2 className="mt-5 max-w-4xl font-display text-[42px] leading-[0.96] tracking-tight text-primary sm:text-[56px] lg:text-[72px]">
              {copy.runtime.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">
              {copy.runtime.description}
            </p>
          </div>

          <div>
            <button
              type="button"
              onClick={() => void fetchSnapshot("refresh")}
              className="inline-flex h-12 items-center gap-3 rounded-full border border-[#17333d] bg-[#071018] px-5 text-[12px] font-medium uppercase tracking-[0.22em] text-[#d5f8ef] transition-colors hover:bg-[#0a1620]"
            >
              <RefreshCcw
                className={`size-4 ${refreshing ? "animate-spin" : ""}`}
                strokeWidth={1.6}
              />
              <span>{copy.runtime.autoRefresh}</span>
              <span className="text-[#88cdbd]">{copy.runtime.autoRefreshValue}</span>
            </button>
          </div>
        </div>

        <div className="mt-12">
          <div className="overflow-hidden rounded-[32px] border border-[#16313a] bg-[#071018] text-white shadow-[0_40px_120px_rgba(7,16,24,0.18)]">
            <div className="grid lg:grid-cols-[292px_minmax(0,1fr)_336px]">
              <aside className="border-b border-[#16313a] lg:border-b-0 lg:border-r lg:border-[#16313a]">
                <div className="grid grid-cols-3 gap-px border-b border-[#16313a] bg-[#16313a]">
                  {statCards.map((card) => (
                    <div key={card.label} className="bg-[#071018] px-5 py-5">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#7f9ba7]">
                        {card.label}
                      </p>
                      <div className="mt-2 flex items-end gap-2">
                        <span className="text-[28px] font-semibold leading-none text-white">
                          {card.value}
                        </span>
                        <span className="pb-0.5 text-[11px] uppercase tracking-[0.18em] text-[#8ef5dd]">
                          {card.meta}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="max-h-[780px] overflow-y-auto">
                  {loading && !snapshots.length ? (
                    <div className="px-5 py-6 text-[13px] text-[#8aa1ab]">
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
                        className={`w-full border-b border-[#12232c] px-5 py-5 text-left transition-colors ${
                          isActive ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-0.5 size-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
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
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-[14px] font-semibold text-white">
                                  {repairText(snapshot.title)}
                                </p>
                                <p className="mt-1 truncate text-[11px] uppercase tracking-[0.2em] text-[#7f9ba7]">
                                  {snapshot.handle}
                                </p>
                              </div>
                              <span className="text-[12px] font-medium text-[#8ef5dd]">
                                {formatMetric(snapshot.subscribers)}
                              </span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#8aa1ab]">
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
                              className="mt-3 font-mono text-[11px] leading-relaxed text-[#d7fff5]"
                              style={clampStyle(2)}
                            >
                              {latestSnapshotUpload
                                ? repairText(latestSnapshotUpload.title)
                                : copy.runtime.empty}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div className="min-w-0 border-b border-[#16313a] lg:border-b-0">
                <div className="border-b border-[#16313a] p-7 lg:p-8">
                  <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-4">
                        <div className="size-14 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5">
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
                          <h3 className="truncate text-[38px] font-semibold leading-none text-white">
                            {selectedChannel ? repairText(selectedChannel.title) : "--"}
                          </h3>
                          <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-[#7f9ba7]">
                            <span>YouTube</span>
                            <span>/</span>
                            <span>{selectedChannel?.handle ?? "--"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] uppercase tracking-[0.18em] text-[#8aa1ab]">
                        <span>
                          {copy.runtime.latestUploads}: {selectedChannel?.latestUploads.length ?? 0}
                        </span>
                        <span>
                          {copy.runtime.updated}:{" "}
                          {data
                            ? formatRelativeTime(
                                data.retrievedAt,
                                locale,
                                referenceTime,
                              )
                            : "--"}
                        </span>
                      </div>
                    </div>

                    {selectedChannel ? (
                      <a
                        href={selectedChannel.channelUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-[12px] font-medium uppercase tracking-[0.2em] text-[#d8fff6] transition-colors hover:bg-white/[0.04]"
                      >
                        {copy.runtime.viewChannel}
                        <ExternalLink className="size-3.5" strokeWidth={1.8} />
                      </a>
                    ) : null}
                  </div>

                  <div className="mt-7 grid gap-px overflow-hidden rounded-[24px] border border-[#16313a] bg-[#16313a] md:grid-cols-3">
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
                      <div key={metric.label} className="bg-[#071018] px-5 py-5">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#7f9ba7]">
                          {metric.label}
                        </p>
                        <p className="mt-3 text-[46px] font-semibold leading-none text-white">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
                  <div className="border-b border-[#16313a] p-7 lg:border-b-0 lg:border-r lg:border-[#16313a] lg:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[12px] uppercase tracking-[0.24em] text-[#8ef5dd]">
                        {copy.runtime.latestRelease}
                      </p>
                      {latestRelease ? (
                        <a
                          href={latestRelease.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#d7fff5] transition-colors hover:text-white"
                        >
                          {copy.runtime.open}
                          <ExternalLink className="size-3.5" strokeWidth={1.8} />
                        </a>
                      ) : null}
                    </div>

                    {latestRelease ? (
                      <div className="mt-5">
                        {latestRelease.thumbnailUrl ? (
                          <div className="overflow-hidden rounded-[22px] border border-white/8 bg-white/5">
                            <img
                              src={latestRelease.thumbnailUrl}
                              alt={repairText(latestRelease.title)}
                              className="aspect-[16/9] w-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        ) : null}

                        <p
                          className="mt-5 text-[22px] font-semibold leading-tight text-white"
                          style={clampStyle(3)}
                        >
                          {repairText(latestRelease.title)}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] uppercase tracking-[0.18em] text-[#8aa1ab]">
                          <span>
                            {copy.runtime.published}:{" "}
                            {formatPublishedDate(latestRelease.publishedAt, locale)}
                          </span>
                          <span>
                            {formatRelativeTime(
                              latestRelease.publishedAt,
                              locale,
                              referenceTime,
                            )}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-5 text-[14px] text-[#8aa1ab]">{copy.runtime.empty}</p>
                    )}
                  </div>

                  <div className="p-7 lg:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[12px] uppercase tracking-[0.24em] text-[#8ef5dd]">
                        {copy.runtime.recentUploads}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-[#7f9ba7]">
                        {copy.runtime.sourceValue}
                      </p>
                    </div>

                    <div className="mt-5 space-y-3">
                      {selectedChannel?.latestUploads.length ? (
                        selectedChannel.latestUploads.map((upload) => (
                          <a
                            key={upload.id}
                            href={upload.url}
                            target="_blank"
                            rel="noreferrer"
                            className="grid gap-3 rounded-[20px] border border-white/8 bg-white/[0.02] px-4 py-4 transition-colors hover:bg-white/[0.04] md:grid-cols-[1fr_auto]"
                          >
                            <div className="min-w-0">
                              <p
                                className="text-[14px] font-medium leading-relaxed text-white"
                                style={clampStyle(2)}
                              >
                                {repairText(upload.title)}
                              </p>
                              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-[#8aa1ab]">
                                {formatPublishedDate(upload.publishedAt, locale)}
                              </p>
                            </div>
                            <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                              <span className="text-[11px] uppercase tracking-[0.18em] text-[#d7fff5]">
                                {formatRelativeTime(
                                  upload.publishedAt,
                                  locale,
                                  referenceTime,
                                )}
                              </span>
                              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#7f9ba7]">
                                {copy.runtime.open}
                                <ExternalLink className="size-3.5" strokeWidth={1.8} />
                              </span>
                            </div>
                          </a>
                        ))
                      ) : (
                        <p className="text-[14px] text-[#8aa1ab]">{copy.runtime.empty}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <aside className="min-w-0">
                <div className="flex h-full flex-col">
                  <div className="border-b border-[#16313a] p-7 lg:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[12px] uppercase tracking-[0.24em] text-[#8ef5dd]">
                          {copy.runtime.publicFeed}
                        </p>
                        <p className="mt-2 text-[13px] text-[#8aa1ab]">
                          {copy.runtime.sourceLabel}: {copy.runtime.sourceValue}
                        </p>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#d7fff5]">
                        {copy.runtime.updated}{" "}
                        {data
                          ? formatRelativeTime(
                              data.retrievedAt,
                              locale,
                              referenceTime,
                            )
                          : "--"}
                      </span>
                    </div>

                    <div className="mt-6 space-y-3">
                      {feedItems.length ? (
                        feedItems.map((item) => (
                          <a
                            key={`${item.channelId}-${item.upload.id}`}
                            href={item.upload.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block rounded-[20px] border border-white/8 bg-black/10 px-4 py-4 transition-colors hover:bg-white/[0.04]"
                          >
                            <div className="flex items-start gap-3">
                              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#41f6cc]" />
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-[#7f9ba7]">
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
                                  className="mt-2 text-[13px] leading-relaxed text-white"
                                  style={clampStyle(2)}
                                >
                                  {repairText(item.upload.title)}
                                </p>
                              </div>
                            </div>
                          </a>
                        ))
                      ) : (
                        <p className="text-[14px] text-[#8aa1ab]">{copy.runtime.empty}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto grid grid-cols-3 gap-px bg-[#16313a]">
                    {[
                      {
                        label: copy.runtime.channelsLive,
                        value: snapshots.length ? String(snapshots.length) : "--",
                      },
                      {
                        label: copy.runtime.videos,
                        value: totalVideos ? formatMetric(totalVideos) : "--",
                      },
                      {
                        label: copy.runtime.lastUpdate,
                        value: data
                          ? formatRelativeTime(
                              data.retrievedAt,
                              locale,
                              referenceTime,
                            )
                          : "--",
                      },
                    ].map((item) => (
                      <div key={item.label} className="bg-[#071018] px-5 py-5">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#7f9ba7]">
                          {item.label}
                        </p>
                        <p className="mt-3 text-[32px] font-semibold leading-none text-white">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>

            {error && !snapshots.length ? (
              <div className="border-t border-[#16313a] px-7 py-5 text-[13px] text-[#8aa1ab] lg:px-8">
                {copy.runtime.unavailable}
              </div>
            ) : null}

            {!error && !loading && !snapshots.length ? (
              <div className="border-t border-[#16313a] px-7 py-5 text-[13px] text-[#8aa1ab] lg:px-8">
                {copy.runtime.noData}
              </div>
            ) : null}

            {latestNetworkEvent ? (
              <div className="border-t border-[#16313a] px-7 py-4 text-[11px] uppercase tracking-[0.2em] text-[#7f9ba7] lg:px-8">
                {copy.runtime.latestVideo}:{" "}
                {formatRelativeTime(
                  latestNetworkEvent,
                  locale,
                  referenceTime,
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

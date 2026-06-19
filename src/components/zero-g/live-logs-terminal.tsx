"use client";

import * as React from "react";

type LogLine = {
  ts: string;
  agent: string;
  level: "info" | "ok" | "warn";
  msg: string;
};

const LOGS: LogLine[] = [
  { ts: "14:32:08", agent: "research", level: "info", msg: "scanning github.com/0glabs/*" },
  { ts: "14:32:09", agent: "research", level: "ok", msg: "trend detected: storage SDK" },
  { ts: "14:32:10", agent: "0g.compute", level: "info", msg: "evaluating opportunity" },
  { ts: "14:32:11", agent: "0g.compute", level: "ok", msg: "score: 0.87 — prioritizing" },
  { ts: "14:32:12", agent: "x", level: "info", msg: "generating thread (5 tweets)" },
  { ts: "14:32:14", agent: "x", level: "ok", msg: "draft ready · queued" },
  { ts: "14:32:15", agent: "shorts", level: "info", msg: "processing video id=0x9c2" },
  { ts: "14:32:18", agent: "shorts", level: "ok", msg: "clip extracted · 00:42" },
  { ts: "14:32:19", agent: "orchestrator", level: "info", msg: "validating flow" },
  { ts: "14:32:20", agent: "orchestrator", level: "ok", msg: "flow coherent · approved" },
  { ts: "14:32:21", agent: "0g.storage", level: "info", msg: "writing decision record" },
  { ts: "14:32:22", agent: "0g.storage", level: "ok", msg: "stored · 0g://0x4a2b...c8f1" },
];

const LEVEL_STYLES: Record<LogLine["level"], { color: string; label: string }> = {
  info: { color: "#737373", label: "INFO" },
  ok: { color: "#84cc16", label: " OK " },
  warn: { color: "#fbbf24", label: "WARN" },
};

export function LiveLogsTerminal() {
  const [visibleCount, setVisibleCount] = React.useState(3);

  React.useEffect(() => {
    if (visibleCount >= LOGS.length) return;
    const id = window.setTimeout(() => {
      setVisibleCount((c) => Math.min(c + 1, LOGS.length));
    }, 600);
    return () => window.clearTimeout(id);
  }, [visibleCount]);

  // Reset loop when reaching the end so it feels alive
  React.useEffect(() => {
    if (visibleCount < LOGS.length) return;
    const id = window.setTimeout(() => setVisibleCount(3), 3500);
    return () => window.clearTimeout(id);
  }, [visibleCount]);

  return (
    <div className="overflow-hidden rounded-2xl border border-border-primary bg-[#0a0a0a] shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f56]" />
        <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="size-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-[11px] text-white/40">
          orchestrator — live trace
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-white/40">
          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
          streaming
        </span>
      </div>

      {/* Log body */}
      <div className="h-[420px] overflow-hidden p-4 font-mono text-[12px] leading-relaxed">
        {LOGS.slice(0, visibleCount).map((line, i) => {
          const style = LEVEL_STYLES[line.level];
          return (
            <div
              key={i}
              className="flex items-start gap-3 py-0.5"
              style={{
                opacity: i === visibleCount - 1 ? 1 : 0.55,
                transition: "opacity 0.3s ease",
              }}
            >
              <span className="shrink-0 text-white/30">{line.ts}</span>
              <span
                className="shrink-0 rounded px-1 text-[10px] font-semibold"
                style={{ color: style.color, backgroundColor: `${style.color}1a` }}
              >
                {style.label}
              </span>
              <span className="shrink-0 text-[#7dd3fc]/80">{line.agent}</span>
              <span className="text-white/80">{line.msg}</span>
            </div>
          );
        })}
        {/* Blinking cursor */}
        {visibleCount < LOGS.length && (
          <div className="flex items-center gap-3 py-0.5">
            <span className="shrink-0 text-white/30">--:--:--</span>
            <span className="inline-block h-3 w-1.5 animate-pulse bg-accent" />
          </div>
        )}
      </div>
    </div>
  );
}

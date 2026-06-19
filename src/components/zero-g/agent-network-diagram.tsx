"use client";

import * as React from "react";

/**
 * Network diagram: orchestrator at center, 3 specialized agents around it,
 * connected by animated dashed lines (signal flow).
 */
export function AgentNetworkDiagram() {
  // Center of the SVG
  const cx = 200;
  const cy = 200;

  // Three agents positioned around the orchestrator (top, bottom-left, bottom-right)
  const agents = [
    { id: "research", x: 200, y: 50, label: "Research" },
    { id: "x", x: 60, y: 290, label: "X" },
    { id: "youtube", x: 340, y: 290, label: "Shorts" },
  ];

  return (
    <svg
      viewBox="0 0 400 360"
      className="h-auto w-full"
      fill="none"
      aria-label="Diagrama de red de agentes"
    >
      {/* Connection lines (drawn first so they sit behind nodes) */}
      {agents.map((a, i) => (
        <line
          key={`line-${a.id}`}
          x1={cx}
          y1={cy}
          x2={a.x}
          y2={a.y}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="text-tertiary"
          opacity="0.5"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-16"
            dur={`${1.6 + i * 0.4}s`}
            repeatCount="indefinite"
          />
        </line>
      ))}

      {/* Orchestrator (center) */}
      <g>
        <circle cx={cx} cy={cy} r="38" className="fill-primary" />
        <circle
          cx={cx}
          cy={cy}
          r="50"
          className="stroke-primary"
          strokeWidth="1"
          opacity="0.15"
        >
          <animate
            attributeName="r"
            from="42"
            to="58"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            from="0.25"
            to="0"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          className="fill-inverted font-display"
          fontSize="13"
        >
          0G
        </text>
        <text
          x={cx}
          y={cy + 64}
          textAnchor="middle"
          className="fill-primary font-medium"
          fontSize="11"
        >
          orchestrator
        </text>
      </g>

      {/* Specialized agents */}
      {agents.map((a) => (
        <g key={a.id}>
          <circle
            cx={a.x}
            cy={a.y}
            r="22"
            className="fill-paper stroke-primary"
            strokeWidth="1.5"
          />
          <circle cx={a.x} cy={a.y} r="3" className="fill-accent" />
          <text
            x={a.x}
            y={a.y + 40}
            textAnchor="middle"
            className="fill-secondary font-mono"
            fontSize="10"
          >
            {a.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

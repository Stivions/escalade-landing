import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Escalade — Infraestructura Autónoma de Creación de Contenido";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo.jpg"));
  const logoSrc = `data:image/jpeg;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <img
            src={logoSrc}
            width={96}
            height={96}
            style={{ borderRadius: "22px" }}
            alt="Escalade"
          />
          <span
            style={{
              color: "#fafafa",
              fontSize: "40px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Escalade
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{ display: "flex", width: "64px", height: "5px", backgroundColor: "#84cc16" }}
          />
          <span
            style={{
              color: "#fafafa",
              fontSize: "68px",
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "960px",
            }}
          >
            Infraestructura autónoma de creación de contenido
          </span>
          <span
            style={{ color: "#a3a3a3", fontSize: "30px", maxWidth: "880px", lineHeight: 1.3 }}
          >
            Agentes que investigan, deciden, crean y publican — con una traza
            verificable en cada paso.
          </span>
        </div>

        <span
          style={{
            color: "#737373",
            fontSize: "22px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Autónomo · Verificable · 0G
        </span>
      </div>
    ),
    { ...size },
  );
}

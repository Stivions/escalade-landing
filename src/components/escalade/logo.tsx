import * as React from "react";
import Image from "next/image";

type LogoProps = {
  /** "mark" = solo el símbolo; "full" = símbolo + wordmark "Escalade" */
  variant?: "mark" | "full";
  /** Lado del badge del símbolo en px (es cuadrado) */
  size?: number;
  /** Clases para el wrapper */
  className?: string;
  /** Clases para el wordmark */
  wordmarkClassName?: string;
  /** Etiqueta accesible */
  label?: string;
};

/**
 * Símbolo de Escalade.
 *
 * Usa la imagen de marca (`/logo.jpg`, mark blanco sobre fondo oscuro) presentada
 * como un "badge" cuadrado con esquinas redondeadas. El fondo oscuro es parte del
 * logo, así que se ve consistente sobre superficies claras y oscuras.
 */
export function LogoMark({
  size = 30,
  className = "",
  label = "Escalade",
}: {
  size?: number;
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={`inline-block shrink-0 overflow-hidden rounded-[22%] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.jpg"
        alt={label}
        width={564}
        height={564}
        priority
        className="h-full w-full object-cover"
      />
    </span>
  );
}

export function Logo({
  variant = "full",
  size = 30,
  className = "",
  wordmarkClassName = "",
  label = "Escalade",
}: LogoProps) {
  if (variant === "mark") {
    return <LogoMark size={size} className={className} label={label} />;
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} label={label} />
      <span
        className={`font-display leading-none tracking-tight ${wordmarkClassName}`}
      >
        Escalade
      </span>
    </span>
  );
}

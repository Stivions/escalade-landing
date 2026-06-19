"use client";

const FOOTER_LINKS = [
  {
    title: "Ecosistema",
    links: [
      { label: "0G Compute", href: "#", external: true }, // TODO: URL real
      { label: "0G Storage", href: "#", external: true }, // TODO: URL real
      { label: "Documentación", href: "#", external: true }, // TODO: URL real
      { label: "GitHub", href: "#", external: true }, // TODO: URL real
    ],
  },
  {
    title: "Secciones",
    links: [
      { label: "Problema", href: "#problema" },
      { label: "Agentes", href: "#agentes" },
      { label: "0G", href: "#0g" },
      { label: "Pruebas", href: "#pruebas" },
      { label: "Métricas", href: "#metricas" },
      { label: "Flujo", href: "#flujo" },
      { label: "Resultados", href: "#resultados" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border-primary bg-paper px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <span className="font-display text-3xl leading-none tracking-tight text-primary">
              Escalade
            </span>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-secondary">
              Infraestructura autónoma de creación de contenido. Agentes que
              investigan, deciden, crean, publican y demuestran cada acción.
            </p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-tertiary">
                {col.title}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-[14px] text-secondary transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border-primary pt-6 text-[12px] text-tertiary sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Escalade</p>
          <p>Autónomo · Verificable · 0G</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import * as React from "react";

export type LandingLocale = "en" | "es";

const STORAGE_KEY = "escalade-locale";

const COPY = {
  en: {
    nav: {
      problem: "Problem",
      proof: "Proof",
      runtime: "Runtime",
      results: "Results",
      partner: "Production",
      english: "EN",
      spanish: "ES",
    },
    hero: {
      eyebrow: "Built for social execution",
      title: "AI agents for X and YouTube, powered by Escalade.",
      description:
        "Escalade turns live internet signals into channel-ready posts, Shorts, and verifiable release history.",
    },
    problem: {
      eyebrow: "The problem",
      title: ["One signal.", "Five handoffs."],
      side: "Every relay cools the opportunity before it goes live.",
      centerEyebrow: "One opportunity",
      centerTitle: ["Signal", "breaks apart."],
      centerCaption: "enters live, leaves late",
    },
    solution: {
      eyebrow: "The system",
      title: "One complete loop. Autonomous. Auditable.",
      bodyA:
        "Escalade watches internet signals, scores them, shapes platform-native content, and keeps the release trail attached to each output.",
      bodyB:
        "The point is not more dashboards. The point is one clean loop that can publish and prove what happened.",
      visionEyebrow: "Why it lands",
      vision:
        "Specialized agents stay in sync, so discovery, editing, publishing, and proof stop feeling like separate jobs.",
      computeTitle: "Signal scoring",
      computeBody: "Scores opportunities, routes decisions, and keeps the generation loop moving.",
      storageTitle: "Proof vault",
      storageBody:
        "Release receipts can be stored externally when enabled; local hashes remain the safe fallback.",
    },
    proofLayer: {
      eyebrow: "Publication proof",
      title: "Proof that agents really executed.",
      description:
        "Escalade records the signal, agent, model, content hash, and release state behind every post or Short.",
      statusLink: "Runtime status",
      proofsLink: "Proof ledger",
      receiptTitle: "Release receipt",
      cardEyebrow: "Publication path",
      cardTitle: "From signal to receipt",
      fallback: {
        source: "latest internet signal",
        hash: "hash pending",
        storage: "local proof fallback",
        release: "release prepared",
      },
      stats: {
        decisions: "Decisions",
        proofs: "Receipts",
        channels: "Channels",
        latency: "Latency",
      },
      path: {
        source: "Signal",
        agent: "Agent",
        compute: "AI provider",
        hash: "Hash",
        release: "Release",
      },
      receipt: {
        source: "Source signal",
        agent: "Agent identity",
        compute: "AI provider",
        model: "Model",
        hash: "Content hash",
        storage: "Proof layer",
      },
      whyTitle: "Why proof here?",
      whyBody:
        "X and YouTube show the output. Escalade shows the execution trail: what was seen, who decided, which model ran, and what got released.",
      checks: [
        "Agent identity and model are recorded with each decision.",
        "The source signal and generated output are hashed.",
        "Approved releases can attach the final X or YouTube URL.",
      ],
    },
    runtime: {
      eyebrow: "Live public channel state",
      title: "Real YouTube data, refreshed from the source.",
      description:
        "No guessed totals here. This board reads current public channel numbers and latest uploads directly from YouTube.",
      channels: "channels",
      updated: "updated",
      unavailable: "source unavailable",
      latestUploads: "Latest uploads",
      viewChannel: "Open channel",
      sourceLabel: "Data source",
      sourceValue: "YouTube Data API + public RSS",
      open: "Open",
      latestRelease: "Latest release",
      channelSource: "Channel source",
      publicFeed: "Public feed",
      channelsLive: "Channels live",
      lastUpdate: "Last update",
      subscribers: "Subscribers",
      views: "Views",
      videos: "Videos",
      latestVideo: "Latest upload",
      recentUploads: "Recent uploads",
      published: "Published",
      autoRefresh: "Auto refresh",
      autoRefreshValue: "2 min",
      empty: "No recent uploads found.",
      loading: "Loading public channel snapshot...",
      noData: "No channel data available.",
      xPending: "X live feed will slot in once the runtime source is connected.",
    },
    results: {
      eyebrow: "Proof",
      title: "Published output, shown with real evidence.",
      description:
        "A tighter proof wall for the landing: real screenshots, clearer framing, and one focused preview at a time.",
      openLabel: "Preview",
      links: "Links",
      items: [
        {
          src: "/results/twitter-1.jpg",
          title: "X performance",
          meta: "Account operated by the network",
          caption: "Proof that distribution is already generating reach on X.",
        },
        {
          src: "/results/youtube-1.jpg",
          title: "YouTube overview",
          meta: "Studio snapshot",
          caption: "Channel-level performance with public growth already visible.",
        },
        {
          src: "/results/youtube-2.jpg",
          title: "Content performance",
          meta: "Studio snapshot",
          caption: "Individual uploads and momentum across the channel mix.",
        },
        {
          src: "/results/youtube-3.jpg",
          title: "Audience",
          meta: "Studio snapshot",
          caption: "Audience behavior and repeat attention across releases.",
        },
      ],
    },
    footer: {
      description:
        "Autonomous content infrastructure for X and YouTube, with public proof on every release cycle.",
      sections: "Sections",
      project: "Project",
      collaborators: "Collaborators",
      publicRepo: "Public repo",
      discord: "Discord",
      problem: "Problem",
      flow: "Flow",
      proof: "Proof",
      runtime: "Runtime",
      results: "Results",
      tagline: "Autonomous / Verifiable / Escalade",
    },
    audio: {
      play: "Play audio",
      pause: "Pause audio",
      mute: "Mute audio",
      unmute: "Unmute audio",
      volume: "Audio volume",
    },
  },
  es: {
    nav: {
      problem: "Problema",
      proof: "Pruebas",
      runtime: "Tiempo real",
      results: "Resultados",
      partner: "Producción",
      english: "EN",
      spanish: "ES",
    },
    hero: {
      eyebrow: "Construido para ejecución social",
      title: "Agentes de IA para X y YouTube, impulsados por Escalade.",
      description:
        "Escalade convierte señales vivas de internet en posts, Shorts e historial verificable de cada lanzamiento.",
    },
    problem: {
      eyebrow: "El problema",
      title: ["Una señal.", "Cinco relevos."],
      side: "Cada relevo enfría la oportunidad antes de que salga en vivo.",
      centerEyebrow: "Una oportunidad",
      centerTitle: ["La señal", "se fragmenta."],
      centerCaption: "entra viva, sale tarde",
    },
    solution: {
      eyebrow: "El sistema",
      title: "Un ciclo completo. Autónomo. Auditable.",
      bodyA:
        "Escalade vigila señales de internet, las puntúa, genera contenido nativo para cada plataforma y conserva la trazabilidad de cada salida.",
      bodyB:
        "La idea no es tener más dashboards. La idea es tener un solo ciclo limpio que publique y pruebe lo que pasó.",
      visionEyebrow: "Por qué funciona",
      vision:
        "Los agentes especializados se mantienen sincronizados, para que descubrir, editar, publicar y probar resultados ya no parezcan trabajos separados.",
      computeTitle: "Puntaje de señales",
      computeBody: "Puntúa oportunidades, enruta decisiones y mantiene vivo el ciclo de generación.",
      storageTitle: "Bóveda de pruebas",
      storageBody:
        "Los recibos de lanzamiento pueden almacenarse externamente cuando se habilita; los hashes locales siguen siendo el fallback seguro.",
    },
    proofLayer: {
      eyebrow: "Prueba de publicación",
      title: "Prueba de que los agentes ejecutaron.",
      description:
        "Escalade registra la señal, el agente, el modelo, el hash del contenido y el estado de publicación de cada post o Short.",
      statusLink: "Estado runtime",
      proofsLink: "Proof ledger",
      receiptTitle: "Recibo de lanzamiento",
      cardEyebrow: "Ruta de publicación",
      cardTitle: "De señal a recibo",
      fallback: {
        source: "última señal de internet",
        hash: "hash pendiente",
        storage: "fallback local de prueba",
        release: "lanzamiento preparado",
      },
      stats: {
        decisions: "Decisiones",
        proofs: "Recibos",
        channels: "Canales",
        latency: "Latencia",
      },
      path: {
        source: "Señal",
        agent: "Agente",
        compute: "Proveedor IA",
        hash: "Hash",
        release: "Publicación",
      },
      receipt: {
        source: "Señal fuente",
        agent: "Identidad del agente",
        compute: "Proveedor IA",
        model: "Modelo",
        hash: "Hash del contenido",
        storage: "Capa de prueba",
      },
      whyTitle: "¿Por qué pruebas aquí?",
      whyBody:
        "X y YouTube muestran el resultado. Escalade muestra la ruta de ejecución: qué se vio, quién decidió, qué modelo corrió y qué se publicó.",
      checks: [
        "La identidad del agente y el modelo quedan registrados.",
        "La señal fuente y el output generado quedan hasheados.",
        "Los lanzamientos aprobados pueden adjuntar el link final de X o YouTube.",
      ],
    },
    runtime: {
      eyebrow: "Estado público en vivo",
      title: "Datos reales de YouTube, refrescados desde la fuente.",
      description:
        "Aquí no hay totales inventados. Este panel lee números públicos actuales y últimas subidas directamente desde YouTube.",
      channels: "canales",
      updated: "actualizado",
      unavailable: "fuente no disponible",
      latestUploads: "Últimas subidas",
      viewChannel: "Abrir canal",
      sourceLabel: "Fuente",
      sourceValue: "YouTube Data API + RSS público",
      open: "Abrir",
      latestRelease: "Último lanzamiento",
      channelSource: "Fuente del canal",
      publicFeed: "Feed público",
      channelsLive: "Canales activos",
      lastUpdate: "Última actualización",
      subscribers: "Suscriptores",
      views: "Vistas",
      videos: "Videos",
      latestVideo: "Última subida",
      recentUploads: "Subidas recientes",
      published: "Publicado",
      autoRefresh: "Auto refresh",
      autoRefreshValue: "2 min",
      empty: "No se encontraron subidas recientes.",
      loading: "Cargando snapshot público del canal...",
      noData: "No hay datos de canales disponibles.",
      xPending: "El feed en vivo de X aparecerá cuando conectemos su fuente real.",
    },
    results: {
      eyebrow: "Pruebas",
      title: "Output publicado, mostrado con evidencia real.",
      description:
        "Una pared de pruebas más fina para la landing: capturas reales, mejor encuadre y una vista enfocada a la vez.",
      openLabel: "Vista",
      links: "Links",
      items: [
        {
          src: "/results/twitter-1.jpg",
          title: "Rendimiento en X",
          meta: "Cuenta operada por la red",
          caption: "Prueba de que la distribución ya está generando alcance en X.",
        },
        {
          src: "/results/youtube-1.jpg",
          title: "Resumen de YouTube",
          meta: "Captura de Studio",
          caption: "Rendimiento general del canal con crecimiento público visible.",
        },
        {
          src: "/results/youtube-2.jpg",
          title: "Rendimiento del contenido",
          meta: "Captura de Studio",
          caption: "Uploads individuales y momentum a través del mix del canal.",
        },
        {
          src: "/results/youtube-3.jpg",
          title: "Audiencia",
          meta: "Captura de Studio",
          caption: "Comportamiento de la audiencia y atención recurrente entre lanzamientos.",
        },
      ],
    },
    footer: {
      description:
        "Infraestructura autónoma de contenido para X y YouTube, con prueba pública en cada ciclo de lanzamiento.",
      sections: "Secciones",
      project: "Proyecto",
      collaborators: "Colaboradores",
      publicRepo: "Repo público",
      discord: "Discord",
      problem: "Problema",
      flow: "Flujo",
      proof: "Pruebas",
      runtime: "Tiempo real",
      results: "Resultados",
      tagline: "Autónomo / Verificable / Escalade",
    },
    audio: {
      play: "Reproducir audio",
      pause: "Pausar audio",
      mute: "Silenciar audio",
      unmute: "Activar audio",
      volume: "Volumen de audio",
    },
  },
} as const;

type LocaleContextValue = {
  locale: LandingLocale;
  setLocale: (locale: LandingLocale) => void;
  copy: (typeof COPY)[LandingLocale];
};

const LocaleContext = React.createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<LandingLocale>("en");
  const hydratedRef = React.useRef(false);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const timeoutId = window.setTimeout(() => {
      hydratedRef.current = true;
      if (stored === "es") {
        setLocale("es");
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = locale;
    if (hydratedRef.current) {
      window.localStorage.setItem(STORAGE_KEY, locale);
    }
  }, [locale]);

  const value = React.useMemo(
    () => ({
      locale,
      setLocale,
      copy: COPY[locale],
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocaleCopy() {
  const context = React.useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocaleCopy must be used inside LocaleProvider.");
  }

  return context;
}

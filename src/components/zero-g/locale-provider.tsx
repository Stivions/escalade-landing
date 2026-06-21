"use client";

import * as React from "react";

export type LandingLocale = "en" | "es";

const STORAGE_KEY = "escalade-locale";

const COPY = {
  en: {
    nav: {
      problem: "Problem",
      runtime: "Runtime",
      results: "Proof",
      partner: "0G Partner",
      english: "EN",
      spanish: "ES",
    },
    hero: {
      eyebrow: "Built for social execution with 0G",
      title: "AI agents for X and YouTube, with proof on 0G.",
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
      computeTitle: "0G Compute",
      computeBody: "Scores signals, routes decisions, and keeps the generation loop moving.",
      storageTitle: "0G Storage",
      storageBody: "Anchors release history and proof so outputs can be checked later.",
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
      sourceValue: "YouTube public pages + RSS",
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
      discord: "0G Discord",
      problem: "Problem",
      flow: "Flow",
      runtime: "Runtime",
      results: "Proof",
      tagline: "Autonomous / Verifiable / 0G",
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
      runtime: "Tiempo real",
      results: "Pruebas",
      partner: "Partner 0G",
      english: "EN",
      spanish: "ES",
    },
    hero: {
      eyebrow: "Construido para ejecucion social con 0G",
      title: "Agentes de IA para X y YouTube, con prueba en 0G.",
      description:
        "Escalade convierte senales vivas de internet en posts, Shorts e historial verificable de cada lanzamiento.",
    },
    problem: {
      eyebrow: "El problema",
      title: ["Una senal.", "Cinco relevos."],
      side: "Cada relevo enfria la oportunidad antes de que salga en vivo.",
      centerEyebrow: "Una oportunidad",
      centerTitle: ["La senal", "se fragmenta."],
      centerCaption: "entra viva, sale tarde",
    },
    solution: {
      eyebrow: "El sistema",
      title: "Un ciclo completo. Autonomo. Auditable.",
      bodyA:
        "Escalade vigila senales de internet, las puntua, genera contenido nativo para cada plataforma y conserva la trazabilidad de cada salida.",
      bodyB:
        "La idea no es tener mas dashboards. La idea es tener un solo ciclo limpio que publique y demuestre lo que paso.",
      visionEyebrow: "Por que funciona",
      vision:
        "Los agentes especializados se mantienen sincronizados, para que descubrir, editar, publicar y demostrar ya no parezcan trabajos separados.",
      computeTitle: "0G Compute",
      computeBody: "Puntua senales, enruta decisiones y mantiene vivo el ciclo de generacion.",
      storageTitle: "0G Storage",
      storageBody: "Ancla el historial de lanzamiento y la prueba para poder revisarlos despues.",
    },
    runtime: {
      eyebrow: "Estado publico en vivo",
      title: "Datos reales de YouTube, refrescados desde la fuente.",
      description:
        "Aqui no hay totales inventados. Este panel lee numeros publicos actuales y ultimas subidas directamente desde YouTube.",
      channels: "canales",
      updated: "actualizado",
      unavailable: "fuente no disponible",
      latestUploads: "Ultimas subidas",
      viewChannel: "Abrir canal",
      sourceLabel: "Fuente",
      sourceValue: "Paginas publicas + RSS de YouTube",
      open: "Abrir",
      latestRelease: "Ultimo lanzamiento",
      channelSource: "Fuente del canal",
      publicFeed: "Feed publico",
      channelsLive: "Canales activos",
      lastUpdate: "Ultima actualizacion",
      subscribers: "Suscriptores",
      views: "Vistas",
      videos: "Videos",
      latestVideo: "Ultima subida",
      recentUploads: "Subidas recientes",
      published: "Publicado",
      autoRefresh: "Auto refresh",
      autoRefreshValue: "2 min",
      empty: "No se encontraron subidas recientes.",
      loading: "Cargando snapshot publico del canal...",
      noData: "No hay datos de canales disponibles.",
      xPending: "El feed en vivo de X aparecera cuando conectemos su fuente real.",
    },
    results: {
      eyebrow: "Pruebas",
      title: "Output publicado, mostrado con evidencia real.",
      description:
        "Una pared de pruebas mas fina para la landing: capturas reales, mejor encuadre y una vista enfocada a la vez.",
      openLabel: "Vista",
      links: "Links",
      items: [
        {
          src: "/results/twitter-1.jpg",
          title: "Rendimiento en X",
          meta: "Cuenta operada por la red",
          caption: "Prueba de que la distribucion ya esta generando alcance en X.",
        },
        {
          src: "/results/youtube-1.jpg",
          title: "Resumen de YouTube",
          meta: "Captura de Studio",
          caption: "Rendimiento general del canal con crecimiento publico visible.",
        },
        {
          src: "/results/youtube-2.jpg",
          title: "Rendimiento del contenido",
          meta: "Captura de Studio",
          caption: "Uploads individuales y momentum a traves del mix del canal.",
        },
        {
          src: "/results/youtube-3.jpg",
          title: "Audiencia",
          meta: "Captura de Studio",
          caption: "Comportamiento de la audiencia y atencion recurrente entre lanzamientos.",
        },
      ],
    },
    footer: {
      description:
        "Infraestructura autonoma de contenido para X y YouTube, con prueba publica en cada ciclo de lanzamiento.",
      sections: "Secciones",
      project: "Proyecto",
      collaborators: "Colaboradores",
      publicRepo: "Repo publico",
      discord: "Discord 0G",
      problem: "Problema",
      flow: "Flujo",
      runtime: "Tiempo real",
      results: "Pruebas",
      tagline: "Autonomo / Verificable / 0G",
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

export function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocaleCopy() {
  const context = React.useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocaleCopy must be used inside LocaleProvider.");
  }

  return context;
}

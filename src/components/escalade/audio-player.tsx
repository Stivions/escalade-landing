"use client";

import * as React from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useLocaleCopy } from "./locale-provider";

const STORAGE_KEY = "escalade-audio-settings";
const DEFAULT_VOLUME = 0.38;

type AudioSettings = {
  volume: number;
};

function getInitialAudioSettings(): AudioSettings {
  if (typeof window === "undefined") {
    return {
      volume: DEFAULT_VOLUME,
    };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        volume: DEFAULT_VOLUME,
      };
    }

    const parsed = JSON.parse(raw) as Partial<AudioSettings>;
    return {
      volume:
        typeof parsed.volume === "number" && parsed.volume > 0.02
          ? Math.min(Math.max(parsed.volume, 0), 1)
          : DEFAULT_VOLUME,
    };
  } catch {
    return {
      volume: DEFAULT_VOLUME,
    };
  }
}

export function AudioPlayer() {
  const { copy } = useLocaleCopy();
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const resumeOnInteractionRef = React.useRef(false);
  const settingsLoadedRef = React.useRef(false);
  const restoreVolumeRef = React.useRef(DEFAULT_VOLUME);

  const [muted, setMuted] = React.useState(false);
  const [volume, setVolume] = React.useState(DEFAULT_VOLUME);
  const [playing, setPlaying] = React.useState(false);

  React.useEffect(() => {
    const settings = getInitialAudioSettings();
    const timeoutId = window.setTimeout(() => {
      restoreVolumeRef.current = settings.volume;
      settingsLoadedRef.current = true;
      setVolume(settings.volume);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  React.useEffect(() => {
    if (!settingsLoadedRef.current) {
      return;
    }

    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          volume: restoreVolumeRef.current > 0 ? restoreVolumeRef.current : DEFAULT_VOLUME,
        } satisfies AudioSettings),
      );
    } catch {
      // ignore storage write failures
    }
  }, [volume]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = volume;
    audio.muted = muted;
  }, [muted, volume]);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const syncState = () => setPlaying(!audio.paused);

    const attemptPlay = async () => {
      try {
        await audio.play();
        resumeOnInteractionRef.current = false;
        syncState();
      } catch {
        resumeOnInteractionRef.current = true;
        syncState();
      }
    };

    const handleCanPlay = () => {
      void attemptPlay();
    };

    const isAudioControl = (target: EventTarget | null) =>
      target instanceof Element &&
      Boolean(target.closest("[data-audio-player]"));

    const handlePointerDown = (event: PointerEvent) => {
      if (isAudioControl(event.target)) {
        return;
      }

      if (!resumeOnInteractionRef.current) {
        return;
      }

      void attemptPlay();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAudioControl(event.target)) {
        return;
      }

      if (!resumeOnInteractionRef.current) {
        return;
      }

      void attemptPlay();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        return;
      }

      if (!resumeOnInteractionRef.current) {
        return;
      }

      void attemptPlay();
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", syncState);
    audio.addEventListener("pause", syncState);
    audio.addEventListener("ended", syncState);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (audio.readyState >= 3) {
      void attemptPlay();
    }

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", syncState);
      audio.removeEventListener("pause", syncState);
      audio.removeEventListener("ended", syncState);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      resumeOnInteractionRef.current = false;
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    if (muted || volume === 0) {
      const nextVolume = restoreVolumeRef.current > 0 ? restoreVolumeRef.current : DEFAULT_VOLUME;
      setMuted(false);
      setVolume(nextVolume);
      return;
    }

    restoreVolumeRef.current = volume > 0 ? volume : restoreVolumeRef.current;
    setMuted(true);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    setMuted(nextVolume === 0);

    if (nextVolume > 0) {
      restoreVolumeRef.current = nextVolume;
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/escalade/landing-theme.mp3"
        preload="auto"
        loop
        autoPlay
      />

      <div
        data-audio-player
        className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-white/18 bg-[#0b151b]/72 px-3 py-2.5 text-white shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? copy.audio.pause : copy.audio.play}
          className="flex size-10 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white transition-colors hover:bg-white/16"
        >
          {playing ? <Pause className="size-4" /> : <Play className="ml-0.5 size-4" />}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted || volume === 0 ? copy.audio.unmute : copy.audio.mute}
          className="flex size-10 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white transition-colors hover:bg-white/16"
        >
          {muted || volume === 0 ? (
            <VolumeX className="size-4" />
          ) : (
            <Volume2 className="size-4" />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={muted ? 0 : volume}
          onChange={handleVolumeChange}
          aria-label={copy.audio.volume}
          className="h-1.5 w-24 cursor-pointer accent-[#c0fffb]"
        />
      </div>
    </>
  );
}

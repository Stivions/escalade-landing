"use client";

import * as React from "react";
import { useLocaleCopy } from "./locale-provider";

const HERO_START_DELAY_MS = 1400;

function HeroBackgroundVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    let startTimeout = 0;

    const playFromStart = async () => {
      try {
        video.currentTime = 0;
        await video.play();
      } catch {
        // Keep the first frame visible if autoplay is blocked.
      }
    };

    const freezeLastFrame = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      video.currentTime = Math.max(video.duration - 1 / 30, 0);
      video.pause();
    };

    const schedulePlay = () => {
      if (startTimeout) {
        window.clearTimeout(startTimeout);
      }

      video.currentTime = 0;
      video.pause();

      startTimeout = window.setTimeout(() => {
        void playFromStart();
      }, HERO_START_DELAY_MS);
    };

    video.loop = false;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    video.addEventListener("loadeddata", schedulePlay);
    video.addEventListener("ended", freezeLastFrame);

    if (video.readyState >= 2) {
      schedulePlay();
    }

    return () => {
      if (startTimeout) {
        window.clearTimeout(startTimeout);
      }
      video.removeEventListener("loadeddata", schedulePlay);
      video.removeEventListener("ended", freezeLastFrame);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="/escalade/hero-background.mp4"
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover object-center"
    />
  );
}

export function HeroSection() {
  const { copy } = useLocaleCopy();

  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden bg-black">
      <HeroBackgroundVideo />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,14,0.18)_0%,rgba(5,10,14,0.10)_20%,rgba(5,10,14,0.16)_48%,rgba(5,10,14,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_30%,rgba(5,10,14,0.22)_62%,rgba(5,10,14,0.44)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[36vh] bg-[linear-gradient(180deg,rgba(5,10,14,0)_0%,rgba(5,10,14,0.18)_32%,rgba(5,10,14,0.78)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1320px] items-end justify-center px-5 pb-24 pt-32 sm:px-8 sm:pb-28 sm:pt-36 lg:px-10 lg:pb-32">
        <div className="flex max-w-[980px] flex-col items-center text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#dffeff] sm:text-[12px]">
            {copy.hero.eyebrow}
          </p>

          <h1 className="mt-5 max-w-[980px] text-[46px] font-semibold leading-[0.92] tracking-[-0.05em] text-white drop-shadow-[0_18px_72px_rgba(0,0,0,0.38)] sm:text-[64px] lg:text-[88px]">
            {copy.hero.title}
          </h1>

          <p className="mt-5 max-w-[720px] text-base leading-7 text-white/88 sm:text-[19px] sm:leading-8">
            {copy.hero.description}
          </p>
        </div>
      </div>
    </section>
  );
}

import { TopNav } from "@/components/zero-g/top-nav";
import { HeroSection } from "@/components/zero-g/hero-section";
import { ProblemSection } from "@/components/zero-g/problem-section";
import { SolutionSection } from "@/components/zero-g/solution-section";
import { MultiAgentSection } from "@/components/zero-g/multi-agent-section";
import { ResultsSection } from "@/components/zero-g/results-section";
import { SiteFooter } from "@/components/zero-g/site-footer";
import { AudioPlayer } from "@/components/zero-g/audio-player";
import { LocaleProvider } from "@/components/zero-g/locale-provider";
import { getYoutubePublicSnapshot } from "@/lib/youtube-public-snapshot";

export const dynamic = "force-dynamic";

export default async function Home() {
  const runtimeSnapshot = await getYoutubePublicSnapshot().catch(() => null);

  return (
    <LocaleProvider>
      <main className="relative min-h-screen bg-paper text-primary">
        <TopNav />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <MultiAgentSection initialData={runtimeSnapshot} />
        <ResultsSection />
        <SiteFooter />
        <AudioPlayer />
      </main>
    </LocaleProvider>
  );
}

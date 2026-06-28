import { TopNav } from "@/components/escalade/top-nav";
import { HeroSection } from "@/components/escalade/hero-section";
import { ProblemSection } from "@/components/escalade/problem-section";
import { SolutionSection } from "@/components/escalade/solution-section";
import { ProofLayerSection } from "@/components/escalade/proof-layer-section";
import { MultiAgentSection } from "@/components/escalade/multi-agent-section";
import { ResultsSection } from "@/components/escalade/results-section";
import { SiteFooter } from "@/components/escalade/site-footer";
import { AudioPlayer } from "@/components/escalade/audio-player";
import { LocaleProvider } from "@/components/escalade/locale-provider";
import { getYoutubePublicSnapshot } from "@/lib/youtube-public-snapshot";
import { getRuntimeDashboardSnapshot } from "@/lib/runtime-snapshot";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [channelSnapshot, runtimeDashboard] = await Promise.all([
    getYoutubePublicSnapshot().catch(() => null),
    getRuntimeDashboardSnapshot().catch(() => null),
  ]);

  return (
    <LocaleProvider>
      <main className="relative min-h-screen bg-paper text-primary">
        <TopNav />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ProofLayerSection
          runtime={runtimeDashboard}
          channelCount={channelSnapshot?.snapshots.length ?? 0}
        />
        <MultiAgentSection initialData={channelSnapshot} />
        <ResultsSection />
        <SiteFooter />
        <AudioPlayer />
      </main>
    </LocaleProvider>
  );
}

import { TopNav } from "@/components/zero-g/top-nav";
import { HeroSection } from "@/components/zero-g/hero-section";
import { ProblemSection } from "@/components/zero-g/problem-section";
import { SolutionSection } from "@/components/zero-g/solution-section";
import { MultiAgentSection } from "@/components/zero-g/multi-agent-section";
import { ZeroGSection } from "@/components/zero-g/zero-g-section";
import { VerifiableDecisionsSection } from "@/components/zero-g/verifiable-decisions-section";
import { MetricsSection } from "@/components/zero-g/metrics-section";
import { DemoFlowSection } from "@/components/zero-g/demo-flow-section";
import { ResultsSection } from "@/components/zero-g/results-section";
import { ClosingSection } from "@/components/zero-g/closing-section";
import { SiteFooter } from "@/components/zero-g/site-footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-paper text-primary">
      <TopNav />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <MultiAgentSection />
      <ZeroGSection />
      <VerifiableDecisionsSection />
      <MetricsSection />
      <DemoFlowSection />
      <ResultsSection />
      <ClosingSection />
      <SiteFooter />
    </main>
  );
}

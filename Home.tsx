import { Header } from "@/components/Header";
import { HeroHome } from "@/components/HeroHome";
import { SolutionsSection } from "@/components/SolutionsSection";
import { ImpactSection } from "@/components/ImpactSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CtaSection } from "@/components/CtaSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroHome />
      <SolutionsSection />
      <ImpactSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
};

export default Home;
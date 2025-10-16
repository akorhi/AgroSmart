import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ImageUpload } from "@/components/ImageUpload";
import { CommonPests } from "@/components/CommonPests";
import { FeaturesSection } from "@/components/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ImageUpload />
        <CommonPests />
        <FeaturesSection />
      </main>
    </div>
  );
};

export default Index;

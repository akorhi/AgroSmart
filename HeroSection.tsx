import { Card } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";
import heroImage from "@/assets/krishi-doctor-hero.png";

export const HeroSection = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-primary-lighter/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Icon */}
          <Card className="inline-flex items-center justify-center w-20 h-20 bg-destructive/10 border-destructive/20 mb-6">
            <Stethoscope className="w-10 h-10 text-destructive" />
          </Card>

          {/* Hero Content */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Krishi Doctor - AI Pest & Disease Diagnosis
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload crop images for automatic crop identification and health analysis
          </p>

          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              Auto-detects crop type and severity
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              AI Image Analysis
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              Describe Symptoms
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-8">
            <img 
              src={heroImage} 
              alt="Agricultural AI Technology" 
              className="rounded-xl shadow-lg mx-auto max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
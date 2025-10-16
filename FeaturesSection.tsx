import { Card } from "@/components/ui/card";
import { 
  Scan, 
  Bug, 
  AlertTriangle, 
  Pill, 
  GraduationCap, 
  Microscope, 
  Shield 
} from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Auto-detects crop type from images",
    description: "Advanced AI automatically identifies your crop variety from uploaded photos"
  },
  {
    icon: Bug,
    title: "Identifies pests and diseases",
    description: "Comprehensive database recognizes thousands of agricultural threats"
  },
  {
    icon: AlertTriangle,
    title: "Assesses severity levels",
    description: "Evaluates the extent of damage and urgency of treatment needed"
  },
  {
    icon: Pill,
    title: "Provides treatment recommendations",
    description: "Suggests specific, actionable treatment plans for your situation"
  },
  {
    icon: GraduationCap,
    title: "Educational insights on causes",
    description: "Learn about underlying factors that led to the problem"
  },
  {
    icon: Microscope,
    title: "Scientific explanations",
    description: "Detailed scientific information about pests, diseases, and solutions"
  },
  {
    icon: Shield,
    title: "Prevention strategies",
    description: "Proactive measures to prevent future occurrences of problems"
  }
];

const educationalBenefits = [
  "Learn why problems occur",
  "Understand scientific explanations", 
  "Identify contributing factors",
  "Learn prevention strategies",
  "Perfect for students & farmers"
];

export const FeaturesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Krishi Doctor Features */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Krishi Doctor Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI-powered agricultural diagnostics with educational insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Educational Benefits */}
        <div className="max-w-4xl mx-auto">
          <Card className="feature-highlight p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Educational Benefits</h2>
              <p className="text-muted-foreground">
                More than just diagnosis - learn and understand agriculture science
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {educationalBenefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {educationalBenefits.slice(3).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground text-center">
                <strong className="text-primary">Perfect for students & farmers:</strong> 
                {" "}Gain deep understanding of agricultural science while solving real-world problems
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
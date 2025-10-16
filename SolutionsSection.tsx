import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Sprout, 
  Cloud, 
  Stethoscope, 
  TestTube, 
  Mic, 
  Wrench,
  ArrowRight,
  Leaf
} from "lucide-react";
import { Link } from "react-router-dom";

export const SolutionsSection = () => {
  const solutions = [
    {
      icon: Sprout,
      title: "Crop Advisory & Guidance",
      description: "Get step-by-step cultivation guidance for kharif, rabi, and summer crops with region-specific best practices.",
      color: "bg-green-500"
    },
    {
      icon: Cloud,
      title: "Weather & Climate Updates",
      description: "Hyperlocal weather forecasts and farming decision recommendations based on weather conditions.",
      color: "bg-blue-500"
    },
    {
      icon: Stethoscope,
      title: "Krishi Doctor - Pest & Disease Diagnosis",
      description: "Identify crop issues using images and get organic and chemical treatment recommendations.",
      color: "bg-red-500"
    },
    {
      icon: TestTube,
      title: "Soil Health & Fertilizers",
      description: "Soil testing guidance and crop-specific fertilizer recommendations for your region.",
      color: "bg-purple-500"
    },
    {
      icon: Mic,
      title: "Voice & Multilingual Support",
      description: "Voice assistance in Hindi, Marathi, and English designed for rural users.",
      color: "bg-orange-500"
    },
    {
      icon: Wrench,
      title: "Equipment & Techniques",
      description: "Smart farming tools, machinery recommendations, and leasing options.",
      color: "bg-teal-500"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 text-primary font-medium mb-4">
            <Leaf className="w-5 h-5" />
            Complete Solutions
            <Leaf className="w-5 h-5" />
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Complete Farming Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From seed to harvest, AgroSmart provides comprehensive support for every aspect of modern agriculture
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <Card key={index} className="p-8 hover:shadow-lg transition-all duration-300 group border border-border">
                <div className={`w-16 h-16 ${solution.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {solution.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {solution.description}
                </p>
                
                <Button variant="ghost" className="text-primary hover:text-primary p-0 h-auto group-hover:translate-x-1 transition-transform duration-300">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Transform Your Farming?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using AgroSmart to increase yields, 
            reduce costs, and make data-driven decisions.
          </p>
          <Button asChild size="lg" className="gap-2 px-8 py-4 text-lg rounded-full">
            <Link to="/krishi-doctor">
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
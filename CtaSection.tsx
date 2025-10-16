import { Button } from "@/components/ui/button";
import { MessageSquare, Video, Check, Users, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export const CtaSection = () => {
  const features = [
    "AI-powered crop advisory",
    "Real-time weather insights", 
    "Pest & disease diagnosis",
    "Multilingual support",
    "24/7 availability",
    "Expert recommendations"
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Active Farmers" },
    { icon: Clock, value: "24/7", label: "AI Support" },
    { icon: TrendingUp, value: "25%", label: "Yield Increase" }
  ];

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Smart Farming Today
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            Join thousands of farmers using AI to boost yields and reduce costs.
          </p>
          
          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-left">
                <Check className="w-5 h-5 text-primary-foreground flex-shrink-0" />
                <span className="text-primary-foreground/90">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" variant="secondary" className="gap-2 px-8 py-4 text-lg rounded-full">
              <Link to="/ai-chat">
                <MessageSquare className="w-5 h-5" />
                Start AI Chat Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 gap-2 px-8 py-4 text-lg rounded-full bg-transparent">
              <Link to="/videos">
                <Video className="w-5 h-5" />
                Watch Success Stories
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <IconComponent className="w-8 h-8 mx-auto mb-4 text-primary-foreground" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-4">Get Started in Seconds</h3>
          <p className="text-primary-foreground/80 mb-8">
            No setup required. Start chatting with our AI farming expert right away.
          </p>
        </div>
      </div>
    </section>
  );
};
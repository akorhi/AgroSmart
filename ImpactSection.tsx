import { Card } from "@/components/ui/card";
import { TrendingUp, MapPin, MessageSquare, Sprout } from "lucide-react";

export const ImpactSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      number: "15,247",
      title: "Farmers Empowered",
      subtitle: "Active users across India"
    },
    {
      icon: MapPin,
      number: "1,823",
      title: "Villages Covered",
      subtitle: "Across Maharashtra, Karnataka & MP"
    },
    {
      icon: MessageSquare,
      number: "87,432",
      title: "Queries Answered",
      subtitle: "AI-powered farming solutions"
    },
    {
      icon: Sprout,
      number: "18-32%",
      title: "Yield Improvement",
      subtitle: "Reported by active users"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-4">
          <p className="text-primary font-medium text-lg">Our Impact</p>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Transforming Agriculture Across India
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real numbers, real impact. See how AgroSmart is making a difference in the lives of farmers and agricultural communities.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <IconComponent className="w-12 h-12 text-primary mx-auto mb-6" />
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{stat.title}</h3>
                <p className="text-muted-foreground">{stat.subtitle}</p>
              </Card>
            );
          })}
        </div>

        {/* Description */}
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-4">Growing Every Day</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our AI-powered platform continues to expand its reach, helping more farmers make informed decisions, 
            increase productivity, and adopt sustainable farming practices. Join our growing community of successful 
            farmers who trust AgroSmart for their agricultural needs.
          </p>
        </div>
      </div>
    </section>
  );
};
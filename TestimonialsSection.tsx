import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Krishi Doctor identified pink bollworm infestation in my cotton field within minutes. Following the organic treatment plan, I saved 8 acres and increased my profit by ₹1.2 lakh this season.",
      name: "Ramesh Vitthal Patil",
      location: "Akola, Maharashtra",
      profession: "Cotton & Soybean Farmer (12 acres)",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
      initials: "RP"
    },
    {
      quote: "The hyperlocal weather forecasts helped me time my spraying perfectly. I avoided 3 failed spray attempts during unexpected rains, saving ₹18,000 in pesticide costs alone.",
      name: "Sunita Rajendra Deshmukh",
      location: "Yavatmal, Maharashtra",
      profession: "Soybean Farmer (6 acres)",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
      initials: "SD"
    },
    {
      quote: "Using AI chatbot guidance, I improved my soil health and switched to integrated pest management. My pomegranate yield increased from 8 tons to 11 tons per acre in just one season.",
      name: "Vijay Shankar Kumar",
      location: "Solapur, Maharashtra",
      profession: "Pomegranate Farmer (15 acres)",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150",
      initials: "VK"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-4">
          <p className="text-primary font-medium text-lg">Farmer Stories</p>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Farmers Say About Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real experiences from farmers who have transformed their agricultural practices with AgroSmart's intelligent guidance and support.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-shadow duration-300 border border-border">
              <Quote className="w-8 h-8 text-primary mb-6" />
              
              <blockquote className="text-muted-foreground mb-8 leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.initials}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-sm text-primary font-medium">{testimonial.profession}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-8">
            Join Thousands of Successful Farmers
          </h3>
          <p className="text-muted-foreground mb-12 max-w-3xl mx-auto">
            Experience the power of AI-driven farming guidance and become part of our growing community of farmers 
            who are increasing their yields and profits with smart agriculture.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.7/5</div>
              <div className="text-muted-foreground">Average User Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">92%</div>
              <div className="text-muted-foreground">Problem Resolution Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">AI Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
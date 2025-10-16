import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Video, Zap, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroHome = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] via-[hsl(var(--hero-gradient-middle))] to-[hsl(var(--hero-gradient-end))] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-white/10 rounded-full blur-xl" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your Smart Farming Companion
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-300 mb-8">
            Anytime, Anywhere
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Empowering farmers with AI-driven crop advisory, real-time weather insights, 
            pest diagnosis, market prices, and sustainable farming practices across India.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 px-8 py-4 text-lg rounded-full">
              <Link to="/ai-chat">
                <MessageSquare className="w-5 h-5" />
                Get AI Farming Advice
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 gap-2 px-8 py-4 text-lg rounded-full bg-transparent">
              <Link to="/videos">
                <Video className="w-5 h-5" />
                Watch Farming Videos
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Real-time AI Support</h3>
            <p className="text-white/80">
              Get instant answers to your farming questions with advanced AI technology
            </p>
          </Card>

          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Community Driven</h3>
            <p className="text-white/80">
              Connect with fellow farmers and agricultural experts nationwide
            </p>
          </Card>

          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Multilingual</h3>
            <p className="text-white/80">
              Available in Hindi, Marathi, and English for easy communication
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
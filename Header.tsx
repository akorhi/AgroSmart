import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Leaf, Home, MessageSquare, Cloud, Stethoscope, Video, LogOut, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export const Header = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-foreground">AgroSmart</h1>
              <p className="text-xs text-muted-foreground">Smart Agriculture Assistant</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button 
              asChild 
              variant={location.pathname === "/" ? "default" : "ghost"} 
              size="sm" 
              className={`rounded-full px-4 ${location.pathname === "/" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button 
              asChild 
              variant="ghost" 
              size="sm" 
              className="rounded-full px-4 hover:bg-muted gap-2"
            >
              <Link to="/ai-chat">
                <MessageSquare className="w-4 h-4" />
                AI Assistant
              </Link>
            </Button>
            <Button 
              asChild 
              variant="ghost" 
              size="sm" 
              className="rounded-full px-4 hover:bg-muted gap-2"
            >
              <Link to="/weather">
                <Cloud className="w-4 h-4" />
                Weather
              </Link>
            </Button>
            <Button 
              asChild 
              variant="ghost" 
              size="sm" 
              className="rounded-full px-4 hover:bg-muted gap-2"
            >
              <Link to="/krishi-doctor">
                <Stethoscope className="w-4 h-4" />
                Doctor
              </Link>
            </Button>
            <Button 
              asChild 
              variant="ghost" 
              size="sm" 
              className="rounded-full px-4 hover:bg-muted gap-2"
            >
              <Link to="/videos">
                <Video className="w-4 h-4" />
                Videos
              </Link>
            </Button>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="rounded-full"
                >
                  <LogOut className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <Button asChild variant="default" size="sm" className="rounded-full">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden ml-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};
import { useState } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Video, 
  Play, 
  Clock, 
  Eye, 
  ThumbsUp,
  BookOpen,
  Sprout,
  Bug,
  Droplets,
  Sun,
  Search,
  Loader2
} from "lucide-react";

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();

  const categories = [
    { name: "All", icon: BookOpen },
    { name: "Crop Management", icon: Sprout },
    { name: "Pest Control", icon: Bug },
    { name: "Irrigation", icon: Droplets },
    { name: "Seasonal Tips", icon: Sun }
  ];

  const handleSearch = async (query?: string) => {
    const searchTerm = query || searchQuery || "modern farming techniques";
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('search-farming-videos', {
        body: { 
          query: selectedCategory !== "All" ? `${searchTerm} ${selectedCategory}` : searchTerm,
          maxResults: 12 
        }
      });

      if (error) throw error;
      
      if (data.error) {
        toast({
          title: "Notice",
          description: data.error,
          variant: "default",
        });
        setVideos([]);
        return;
      }

      setVideos(data.videos || []);
      
      if (data.videos && data.videos.length > 0) {
        toast({
          title: "Videos Loaded",
          description: `Found ${data.videos.length} videos`,
        });
      }
    } catch (error) {
      console.error('Video search error:', error);
      toast({
        title: "Error",
        description: "Failed to search videos. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    if (searchQuery || categoryName !== "All") {
      handleSearch(categoryName !== "All" ? categoryName : searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const openVideo = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Educational Videos</h1>
            <p className="text-muted-foreground">
              Watch real farming tutorials and educational content from YouTube
            </p>
          </div>

          {/* Search Bar */}
          <Card className="p-6 mb-8">
            <div className="flex gap-2 max-w-2xl mx-auto">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for farming videos..."
                className="flex-1"
                disabled={loading}
              />
              <Button onClick={() => handleSearch()} className="gap-2" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Search
              </Button>
            </div>
          </Card>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={index}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => handleCategoryClick(category.name)}
                  disabled={loading}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>

          {/* Videos Grid */}
          {videos.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card 
                    key={video.id} 
                    className="overflow-hidden hover:shadow-lg transition-all duration-200 group cursor-pointer"
                    onClick={() => openVideo(video.url)}
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-gray-800 ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                          {video.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {video.channel}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {video.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {formatViews(video.views)}
                          </div>
                          {video.likes > 0 && (
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {formatViews(video.likes)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => handleSearch()}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Load More Videos
                </Button>
              </div>
            </>
          ) : !loading && (
            <Card className="p-12 text-center">
              <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Search for Farming Videos</h3>
              <p className="text-muted-foreground mb-4">
                Enter a search term above or click a category to find educational farming content from YouTube
              </p>
              <Button onClick={() => handleSearch("modern farming techniques")}>
                Show Popular Farming Videos
              </Button>
            </Card>
          )}

          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videos;

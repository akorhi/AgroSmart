import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Droplets, 
  Wind, 
  Eye,
  Sunrise,
  Sunset,
  MapPin,
  Search,
  Loader2
} from "lucide-react";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoDetecting, setAutoDetecting] = useState(true);
  const [weatherData, setWeatherData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Please enter your location manually",
        variant: "destructive",
      });
      setAutoDetecting(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const detectedLocation = data.address?.city || data.address?.town || data.address?.village || data.display_name;
          
          setLocation(detectedLocation);
          setAutoDetecting(false);
          
          // Auto-fetch weather for detected location
          await fetchWeatherForLocation(detectedLocation);
        } catch (error) {
          console.error('Reverse geocoding error:', error);
          toast({
            title: "Location detection failed",
            description: "Please enter your location manually",
            variant: "destructive",
          });
          setAutoDetecting(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast({
          title: "Location access denied",
          description: "Please enter your location manually",
          variant: "destructive",
        });
        setAutoDetecting(false);
      }
    );
  };

  const fetchWeatherForLocation = async (loc: string) => {
    if (!loc.trim()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('weather-insights', {
        body: { location: loc }
      });

      if (error) throw error;
      
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      setWeatherData(data);
      setLocation(data.location);
      
      toast({
        title: "Weather Updated",
        description: `Showing weather for ${data.location}`,
      });
    } catch (error) {
      console.error('Weather fetch error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (code: number) => {
    if (code === 0) return Sun;
    if (code <= 3) return Cloud;
    if (code >= 50 && code <= 99) return CloudRain;
    return Cloud;
  };

  const getWeatherDescription = (code: number) => {
    const descriptions: any = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Foggy",
      51: "Light drizzle",
      61: "Light rain",
      80: "Rain showers",
      95: "Thunderstorm"
    };
    return descriptions[code] || "Partly cloudy";
  };

  const handleSearch = async () => {
    const searchTerm = searchLocation.trim() || location;
    if (!searchTerm) {
      toast({
        title: "Location required",
        description: "Please enter a location",
        variant: "destructive",
      });
      return;
    }
    
    setSearchLocation("");
    await fetchWeatherForLocation(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  const forecast = weatherData?.daily ? 
    weatherData.daily.temperature_2m_max.slice(0, 7).map((temp: number, idx: number) => {
      const days = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      return {
        day: days[idx] || `Day ${idx + 1}`,
        high: Math.round(temp),
        low: Math.round(weatherData.daily.temperature_2m_min[idx]),
        condition: getWeatherDescription(weatherData.daily.weather_code[idx]),
        icon: getWeatherIcon(weatherData.daily.weather_code[idx])
      };
    }) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Weather Insights</h1>
            <p className="text-muted-foreground">
              Real-time weather data and AI-powered agricultural forecasts
            </p>
          </div>

          {/* Location Search */}
          <Card className="p-6 mb-8">
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter city or location..."
                className="flex-1"
                disabled={loading}
              />
              <Button onClick={handleSearch} className="gap-2" disabled={loading || autoDetecting}>
                {loading || autoDetecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                {autoDetecting ? "Detecting..." : "Search"}
              </Button>
            </div>
          </Card>

          {weatherData && (
            <>
              {/* Current Weather */}
              <Card className="p-6 mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">{location}</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Main Weather */}
                  <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                      {(() => {
                        const IconComponent = getWeatherIcon(weatherData.current.weather_code);
                        return <IconComponent className="w-16 h-16 text-cyan-500" />;
                      })()}
                      <div>
                        <div className="text-4xl font-bold text-foreground">
                          {Math.round(weatherData.current.temperature_2m)}°C
                        </div>
                        <div className="text-muted-foreground">
                          {getWeatherDescription(weatherData.current.weather_code)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Weather Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Droplets className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Humidity</div>
                        <div className="font-semibold">{weatherData.current.relative_humidity_2m}%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-5 h-5 text-gray-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Wind Speed</div>
                        <div className="font-semibold">{Math.round(weatherData.current.wind_speed_10m)} km/h</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">UV Index</div>
                        <div className="font-semibold">{weatherData.daily.uv_index_max[0]}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cloud className="w-5 h-5 text-purple-500" />
                      <div>
                        <div className="text-sm text-muted-foreground">Feels Like</div>
                        <div className="font-semibold">{Math.round(weatherData.current.apparent_temperature)}°C</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sun Times */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Sunrise className="w-5 h-5 text-orange-500" />
                    <div>
                      <div className="text-sm text-muted-foreground">Sunrise</div>
                      <div className="font-semibold">
                        {new Date(weatherData.daily.sunrise[0]).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sunset className="w-5 h-5 text-red-500" />
                    <div>
                      <div className="text-sm text-muted-foreground">Sunset</div>
                      <div className="font-semibold">
                        {new Date(weatherData.daily.sunset[0]).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 7-Day Forecast */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">7-Day Forecast</h2>
                  <div className="space-y-4">
                    {forecast.map((day: any, index: number) => {
                      const IconComponent = day.icon;
                      return (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-6 h-6 text-primary" />
                            <div>
                              <div className="font-medium">{day.day}</div>
                              <div className="text-sm text-muted-foreground">{day.condition}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{day.high}°</div>
                            <div className="text-sm text-muted-foreground">{day.low}°</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* AI Farming Tips */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    AI Farming Insights
                  </h2>
                  <div className="space-y-4">
                    {weatherData.farmingTips && weatherData.farmingTips.map((tip: any, index: number) => (
                      <div key={index} className="p-4 rounded-lg border border-border">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-foreground">{tip.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            tip.priority === 'High' ? 'bg-red-100 text-red-800' :
                            tip.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {tip.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-foreground">
                      <strong>🤖 AI-Powered:</strong> Farming recommendations generated by Gemini AI based on real-time weather data.
                    </p>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;

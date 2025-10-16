import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Get weather data from Open-Meteo (free weather API)
    const geocodeResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
    );
    const geoData = await geocodeResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('Location not found');
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // Get current weather and forecast
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=7`
    );
    const weatherData = await weatherResponse.json();

    // Use Gemini to generate farming advice based on weather
    const aiPrompt = `Based on the following weather conditions for ${name}, ${country}:
- Temperature: ${weatherData.current.temperature_2m}°C
- Humidity: ${weatherData.current.relative_humidity_2m}%
- Wind Speed: ${weatherData.current.wind_speed_10m} km/h
- 7-day forecast temperatures: ${weatherData.daily.temperature_2m_max.join(', ')}°C

Provide 3 specific, actionable farming tips in JSON format. Each tip should have:
- title: brief title
- description: detailed actionable advice (1-2 sentences)
- priority: "High", "Medium", or "Low"

Respond with ONLY a valid JSON array, no additional text.`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { 
            role: 'system', 
            content: 'You are an agricultural expert AI. Provide farming advice based on weather conditions. Always respond with valid JSON only.'
          },
          { role: 'user', content: aiPrompt }
        ],
      }),
    });

    const aiData = await aiResponse.json();
    let farmingTips = [];
    
    try {
      const content = aiData.choices[0].message.content;
      // Extract JSON from the response (in case there's markdown formatting)
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      farmingTips = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      farmingTips = [
        {
          title: "Weather Monitoring",
          description: "Keep track of daily weather changes for better crop management.",
          priority: "Medium"
        }
      ];
    }

    return new Response(JSON.stringify({ 
      location: `${name}, ${country}`,
      current: weatherData.current,
      daily: weatherData.daily,
      farmingTips 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in weather-insights function:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

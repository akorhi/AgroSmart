import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Pest {
  id: string;
  name: string;
  crops: string[];
  severity: 'High' | 'Medium' | 'Low';
  season: string;
  description: string;
}

const pests: Pest[] = [
  {
    id: "bollworm",
    name: "Bollworm",
    crops: ["Cotton", "Tomato", "Chilli"],
    severity: "High",
    season: "Kharif",
    description: "Attacks fruiting parts of crops, causing significant yield loss"
  },
  {
    id: "aphids",
    name: "Aphids",
    crops: ["Wheat", "Mustard", "Pea"],
    severity: "Medium",
    season: "Rabi",
    description: "Small insects that suck plant juices and transmit viruses"
  },
  {
    id: "stem-borer",
    name: "Stem Borer",
    crops: ["Rice", "Sugarcane"],
    severity: "High",
    season: "Kharif",
    description: "Larvae bore into stems causing deadhearts and whiteheads"
  },
  {
    id: "leaf-miner",
    name: "Leaf Miner",
    crops: ["Tomato", "Bean", "Cucumber"],
    severity: "Medium",
    season: "All seasons",
    description: "Creates tunnels in leaves affecting photosynthesis"
  },
  {
    id: "whitefly",
    name: "Whitefly",
    crops: ["Cotton", "Tomato", "Okra"],
    severity: "High",
    season: "All seasons",
    description: "Causes yellowing of leaves and transmits viral diseases"
  },
  {
    id: "thrips",
    name: "Thrips",
    crops: ["Onion", "Chilli", "Cotton"],
    severity: "Medium",
    season: "Summer",
    description: "Tiny insects causing silvering of leaves and stunted growth"
  }
];

export const CommonPests = () => {
  const { toast } = useToast();

  const handlePestClick = (pest: Pest) => {
    toast({
      title: `${pest.name} selected`,
      description: `Auto-filling symptoms for ${pest.name} diagnosis...`,
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "severity-high";
      case "Medium":
        return "severity-medium";
      case "Low":
        return "severity-low";
      default:
        return "severity-medium";
    }
  };

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Common Pests</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            💡 <strong>Tip:</strong> Click on any pest above to auto-fill symptoms and get instant diagnosis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pests.map((pest) => (
            <Card 
              key={pest.id}
              className="pest-card p-6 hover:shadow-lg transition-all duration-200"
              onClick={() => handlePestClick(pest)}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{pest.name}</h3>
                  <Badge className={getSeverityColor(pest.severity)}>
                    {pest.severity}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Affected Crops:</p>
                    <p className="text-sm font-medium">{pest.crops.join(", ")}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Season:</p>
                    <p className="text-sm font-medium">{pest.season}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {pest.description}
                </p>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-primary font-medium">
                    Click for instant diagnosis →
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
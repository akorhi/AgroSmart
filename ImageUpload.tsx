import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image, FileText, Loader2, Languages } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ImageUpload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("english");
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      if (imageFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(imageFile);
      toast({
        title: "Image uploaded successfully",
        description: "AI analysis will begin shortly...",
      });
    }
  }, [toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setDiagnosis(null);
      toast({
        title: "Image uploaded successfully",
        description: "Click 'Analyze Image' to get AI diagnosis",
      });
    }
  }, [toast]);

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const analyzeImage = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setDiagnosis(null);

    try {
      const base64Image = await convertImageToBase64(uploadedFile);

      const { data, error } = await supabase.functions.invoke('diagnose-plant-disease', {
        body: { image: base64Image, language }
      });

      if (error) {
        throw error;
      }

      setDiagnosis(data.diagnosis);
      toast({
        title: "Analysis Complete",
        description: "AI has diagnosed your crop. Check results below.",
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeDescription = async () => {
    if (!description.trim()) {
      toast({
        title: "No Description",
        description: "Please describe the symptoms you observe.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setDiagnosis(null);

    try {
      const { data, error } = await supabase.functions.invoke('diagnose-plant-disease', {
        body: { description, language }
      });

      if (error) {
        throw error;
      }

      setDiagnosis(data.diagnosis);
      toast({
        title: "Analysis Complete",
        description: "AI has analyzed your symptoms. Check results below.",
      });
    } catch (error) {
      console.error("Error analyzing description:", error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze symptoms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिंदी (Hindi)" },
    { value: "marathi", label: "मराठी (Marathi)" },
    { value: "gujarati", label: "ગુજરાતી (Gujarati)" },
    { value: "punjabi", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { value: "bengali", label: "বাংলা (Bengali)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Language Selector */}
        <div className="max-w-2xl mx-auto mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Languages className="w-5 h-5 text-primary" />
              <label className="text-sm font-medium flex-shrink-0">Select Language:</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="image" className="max-w-2xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="image" className="gap-2">
              <Image className="w-4 h-4" />
              AI Image Analysis
            </TabsTrigger>
            <TabsTrigger value="describe" className="gap-2">
              <FileText className="w-4 h-4" />
              Describe Symptoms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Upload crop image for AI diagnosis</h2>
              <p className="text-muted-foreground">
                AI will automatically identify the crop and analyze health
              </p>
            </div>

            <Card 
              className={`upload-area p-8 text-center cursor-pointer transition-colors ${
                isDragOver ? 'border-primary bg-primary-lighter/30' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              
              {uploadedFile ? (
                <div className="space-y-4">
                  {previewUrl && (
                    <img 
                      src={previewUrl} 
                      alt="Uploaded crop" 
                      className="max-w-full max-h-64 mx-auto rounded-lg object-contain"
                    />
                  )}
                  <div>
                    <p className="font-medium text-success">File uploaded successfully!</p>
                    <p className="text-sm text-muted-foreground">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="flex items-center gap-2"
                    >
                      {isAnalyzing && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setUploadedFile(null);
                        setPreviewUrl(null);
                        setDiagnosis(null);
                      }}
                    >
                      Upload Different Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Drop your crop image here</p>
                    <p className="text-muted-foreground">or click to browse</p>
                  </div>
                  <Button asChild className="mt-4">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: JPG, PNG, WebP (Max 5MB)
                  </p>
                </div>
              )}
            </Card>

            {diagnosis && (
              <Card className="p-6 mt-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">AI Diagnosis & Treatment</h3>
                <div className="prose prose-sm max-w-none text-foreground">
                  <ReactMarkdown>{diagnosis}</ReactMarkdown>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="describe" className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold">Describe your crop symptoms</h2>
              <p className="text-muted-foreground">
                Tell us what you observe and get expert diagnosis
              </p>
            </div>

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Describe the symptoms you observe:</label>
                  <textarea 
                    className="w-full mt-2 p-3 border rounded-lg min-h-[120px] bg-input"
                    placeholder="Example: Yellow spots on leaves, wilting plants, holes in leaves..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={analyzeDescription}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isAnalyzing ? "Analyzing..." : "Get AI Diagnosis"}
                </Button>
              </div>
            </Card>

            {diagnosis && (
              <Card className="p-6 mt-6">
                <h3 className="text-xl font-semibold mb-4 text-primary">AI Diagnosis & Treatment</h3>
                <div className="prose prose-sm max-w-none text-foreground">
                  <ReactMarkdown>{diagnosis}</ReactMarkdown>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
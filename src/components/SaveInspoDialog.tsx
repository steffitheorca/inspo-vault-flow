
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SaveInspoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SaveInspoDialog = ({ open, onOpenChange }: SaveInspoDialogProps) => {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [calendar, setCalendar] = useState("");
  const [platform, setPlatform] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const { toast } = useToast();

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!url || !calendar || !platform) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save to your backend
    console.log("Saving inspiration:", { url, notes, calendar, platform, tags });
    
    toast({
      title: "Inspiration Saved!",
      description: "Your content has been added to your vault.",
    });

    // Reset form
    setUrl("");
    setNotes("");
    setCalendar("");
    setPlatform("");
    setTags([]);
    setCurrentTag("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg sm:text-xl">Save New Inspiration</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 sm:gap-6 py-2">
          <div className="grid gap-2">
            <Label htmlFor="url" className="text-sm font-medium">Content URL *</Label>
            <Input
              id="url"
              placeholder="https://tiktok.com/@user/video/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-11 text-base"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="platform" className="text-sm font-medium">Platform *</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="calendar" className="text-sm font-medium">Calendar *</Label>
            <Select value={calendar} onValueChange={setCalendar}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select calendar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="march-campaign">March Campaign</SelectItem>
                <SelectItem value="general-content">General Content</SelectItem>
                <SelectItem value="product-launch">Product Launch</SelectItem>
                <SelectItem value="trending">Trending Ideas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags" className="text-sm font-medium">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add tag..."
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="h-11 text-base flex-1"
              />
              <Button type="button" onClick={addTag} className="h-11 px-4">Add</Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1 py-1 px-2 text-sm">
                    {tag}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-red-500" 
                      onClick={() => removeTag(tag)} 
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
            <Textarea
              id="notes"
              placeholder="e.g., funny trend for March campaign"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px] text-base resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:justify-end pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="h-11 sm:h-10 order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="h-11 sm:h-10 order-1 sm:order-2"
          >
            Save Inspiration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveInspoDialog;

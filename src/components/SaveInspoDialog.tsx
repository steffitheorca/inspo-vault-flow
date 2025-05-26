
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save New Inspiration</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="url">Content URL *</Label>
            <Input
              id="url"
              placeholder="https://tiktok.com/@user/video/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="platform">Platform *</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger>
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
            <Label htmlFor="calendar">Calendar *</Label>
            <Select value={calendar} onValueChange={setCalendar}>
              <SelectTrigger>
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
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add tag..."
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
              />
              <Button type="button" onClick={addTag}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="e.g., funny trend for March campaign"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Inspiration</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveInspoDialog;

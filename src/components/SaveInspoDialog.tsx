
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SaveInspoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SaveInspoDialog = ({ open, onOpenChange }: SaveInspoDialogProps) => {
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const { toast } = useToast();

  const calendarOptions = [
    { id: "march-campaign", label: "March Campaign" },
    { id: "general-content", label: "General Content" },
    { id: "product-launch", label: "Product Launch" },
    { id: "trending", label: "Trending Ideas" }
  ];

  const collectionOptions = [
    { id: "trending-audio", label: "Trending Audio" },
    { id: "heyorca-summit", label: "HeyOrca Summit Ideas" },
    { id: "hackathon-ideas", label: "Hackathon Ideas" }
  ];

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleCalendar = (calendarId: string) => {
    setSelectedCalendars(prev => 
      prev.includes(calendarId) 
        ? prev.filter(id => id !== calendarId)
        : [...prev, calendarId]
    );
  };

  const toggleCollection = (collectionId: string) => {
    setSelectedCollections(prev => 
      prev.includes(collectionId) 
        ? prev.filter(id => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  const handleSave = () => {
    if (!url || selectedCalendars.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please provide a URL and select at least one calendar.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save to your backend
    console.log("Saving inspiration:", { url, notes, selectedCalendars, selectedCollections, tags });
    
    toast({
      title: "Inspiration Saved!",
      description: "Your content has been added to your vault.",
    });

    // Reset form
    setUrl("");
    setNotes("");
    setSelectedCalendars([]);
    setSelectedCollections([]);
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
            <Label className="text-sm font-medium">Calendar *</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-11 justify-between">
                  {selectedCalendars.length > 0 
                    ? `${selectedCalendars.length} calendar(s) selected`
                    : "Select calendars"
                  }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {calendarOptions.map((calendar) => (
                  <DropdownMenuCheckboxItem
                    key={calendar.id}
                    checked={selectedCalendars.includes(calendar.id)}
                    onCheckedChange={() => toggleCalendar(calendar.id)}
                  >
                    {calendar.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {selectedCalendars.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCalendars.map((calendarId) => {
                  const calendar = calendarOptions.find(c => c.id === calendarId);
                  return (
                    <Badge key={calendarId} variant="secondary" className="flex items-center gap-1">
                      {calendar?.label}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-red-500" 
                        onClick={() => toggleCalendar(calendarId)} 
                      />
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label className="text-sm font-medium">Collections</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-11 justify-between">
                  {selectedCollections.length > 0 
                    ? `${selectedCollections.length} collection(s) selected`
                    : "Select collections"
                  }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                {collectionOptions.map((collection) => (
                  <DropdownMenuCheckboxItem
                    key={collection.id}
                    checked={selectedCollections.includes(collection.id)}
                    onCheckedChange={() => toggleCollection(collection.id)}
                  >
                    {collection.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {selectedCollections.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCollections.map((collectionId) => {
                  const collection = collectionOptions.find(c => c.id === collectionId);
                  return (
                    <Badge key={collectionId} variant="secondary" className="flex items-center gap-1">
                      {collection?.label}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-red-500" 
                        onClick={() => toggleCollection(collectionId)} 
                      />
                    </Badge>
                  );
                })}
              </div>
            )}
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

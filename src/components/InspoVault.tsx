
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share, Check, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InspoItem {
  id: string;
  url: string;
  platform: string;
  calendar: string;
  tags: string[];
  notes: string;
  thumbnail: string;
  used: boolean;
  likes: number;
  comments: number;
  dateAdded: string;
}

const InspoVault = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const { toast } = useToast();

  // Mock data - in a real app this would come from your backend
  const [inspoItems, setInspoItems] = useState<InspoItem[]>([
    {
      id: "1",
      url: "https://tiktok.com/@user/video/123",
      platform: "tiktok",
      calendar: "march-campaign",
      tags: ["funny", "trend"],
      notes: "Funny dance trend for March campaign",
      thumbnail: "https://placehold.co/300x400/5271FF/FFFFFF.png?text=TikTok+Trend",
      used: false,
      likes: 3,
      comments: 2,
      dateAdded: "2023-05-24",
    },
    {
      id: "2",
      url: "https://instagram.com/p/456",
      platform: "instagram",
      calendar: "product-launch",
      tags: ["unboxing", "review"],
      notes: "Great product reveal format",
      thumbnail: "https://placehold.co/300x400/E1306C/FFFFFF.png?text=Instagram+Post",
      used: true,
      likes: 5,
      comments: 1,
      dateAdded: "2023-05-20",
    },
    {
      id: "3",
      url: "https://youtube.com/watch?v=789",
      platform: "youtube",
      calendar: "trending",
      tags: ["tutorial", "howto"],
      notes: "Step-by-step tutorial format",
      thumbnail: "https://placehold.co/300x400/FF0000/FFFFFF.png?text=YouTube+Video",
      used: false,
      likes: 2,
      comments: 4,
      dateAdded: "2023-05-18",
    },
    {
      id: "4",
      url: "https://twitter.com/user/status/012",
      platform: "twitter",
      calendar: "general-content",
      tags: ["thread", "tips"],
      notes: "Great format for a tips thread",
      thumbnail: "https://placehold.co/300x400/1DA1F2/FFFFFF.png?text=Twitter+Thread",
      used: false,
      likes: 7,
      comments: 3,
      dateAdded: "2023-05-15",
    },
  ]);

  const toggleUsed = (id: string) => {
    setInspoItems(
      inspoItems.map((item) =>
        item.id === id ? { ...item, used: !item.used } : item
      )
    );
    const item = inspoItems.find((item) => item.id === id);
    toast({
      title: item?.used ? "Inspiration Unmarked" : "Inspiration Marked as Used",
      description: item?.used 
        ? "This item is now back in your active inspiration pool."
        : "This item has been marked as used in your content.",
    });
  };

  const shareItem = (id: string) => {
    toast({
      title: "Share Link Created",
      description: "Share link copied to clipboard. Your team can now view this inspiration.",
    });
  };

  // Filter inspo items based on current filters
  const filteredItems = inspoItems.filter((item) => {
    const matchesSearch = searchTerm === "" || 
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.calendar.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filter === "all" || 
      (filter === "used" && item.used) || 
      (filter === "unused" && !item.used);
    
    const matchesPlatform = platformFilter === "all" || platformFilter === item.platform;
    
    return matchesSearch && matchesStatus && matchesPlatform;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search by tag, note, or calendar..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="used">Used</SelectItem>
              <SelectItem value="unused">Not Used</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No inspiration found</h3>
          <p className="text-gray-600">Try adjusting your filters or add new inspiration.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className={`overflow-hidden ${item.used ? 'opacity-70' : ''}`}>
              <div className="relative">
                <div className="aspect-w-3 aspect-h-4">
                  <img 
                    src={item.thumbnail} 
                    alt={`Content from ${item.platform}`} 
                    className="object-cover w-full h-40"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className={item.used ? "bg-green-600" : "bg-blue-600"}>
                    {item.used ? "Used" : "New"}
                  </Badge>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant="outline" className="bg-white">
                    {item.platform}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-2 flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <p className="text-sm text-gray-700 mb-4 min-h-[40px]">{item.notes}</p>
                
                <div className="text-xs text-gray-500 mb-3">
                  Added to: {item.calendar.replace(/-/g, ' ')}
                  <br />
                  Saved on: {new Date(item.dateAdded).toLocaleDateString()}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3 text-gray-600">
                    <Button variant="ghost" size="icon" className="flex items-center" onClick={() => shareItem(item.id)}>
                      <Share className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      <span className="text-xs">{item.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      <span className="text-xs">{item.comments}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant={item.used ? "outline" : "default"} 
                    size="sm"
                    className="h-8"
                    onClick={() => toggleUsed(item.id)}
                  >
                    {item.used ? "Unmark" : "Mark Used"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InspoVault;

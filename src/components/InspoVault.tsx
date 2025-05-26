
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share, Check, Search, Filter, Bookmark } from "lucide-react";
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
  title: string;
  account: string;
}

const InspoVault = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const { toast } = useToast();

  // Mock data - updated to match the reference design
  const [inspoItems, setInspoItems] = useState<InspoItem[]>([
    {
      id: "1",
      url: "https://tiktok.com/@loaves_fish/video/123",
      platform: "instagram",
      calendar: "march-campaign",
      tags: ["funny", "trend"],
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=400&fit=crop",
      used: false,
      likes: 1234,
      comments: 2,
      dateAdded: "2023-05-24",
      title: "Urban Architecture",
      account: "Loaves & Fish"
    },
    {
      id: "2",
      url: "https://tiktok.com/@revive_live/video/456",
      platform: "tiktok",
      calendar: "product-launch",
      tags: ["music", "trending"],
      notes: "Fie dolci beeuyifng ius ftip frestooking streameing",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop",
      used: false,
      likes: 5247,
      comments: 1,
      dateAdded: "2023-05-20",
      title: "Trending Song Example",
      account: "TikTok Account"
    },
    {
      id: "3",
      url: "https://instagram.com/loaves_fish/post/789",
      platform: "instagram",
      calendar: "trending",
      tags: ["architecture", "city"],
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=400&fit=crop",
      used: false,
      likes: 1234,
      comments: 4,
      dateAdded: "2023-05-18",
      title: "Urban Architecture",
      account: "Loaves & Fish"
    },
    {
      id: "4",
      url: "https://instagram.com/loaves_fish/post/012",
      platform: "instagram",
      calendar: "general-content",
      tags: ["architecture", "city"],
      notes: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=400&fit=crop",
      used: true,
      likes: 1234,
      comments: 3,
      dateAdded: "2023-05-15",
      title: "Urban Architecture",
      account: "Loaves & Fish"
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

  const getPlatformIcon = (platform: string) => {
    const iconStyle = "w-4 h-4 text-white";
    switch (platform) {
      case 'instagram':
        return <div className="w-6 h-6 bg-pink-500 rounded flex items-center justify-center text-xs font-bold text-white">IG</div>;
      case 'tiktok':
        return <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-xs font-bold text-white">TT</div>;
      default:
        return <div className="w-6 h-6 bg-gray-500 rounded flex items-center justify-center text-xs font-bold text-white">?</div>;
    }
  };

  return (
    <div>
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No inspiration found</h3>
          <p className="text-gray-600">Try adjusting your filters or add new inspiration.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow bg-white">
              <div className="relative">
                <div className="aspect-[3/4]">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="object-cover w-full h-full"
                  />
                </div>
                
                {/* Platform indicator */}
                <div className="absolute top-2 left-2">
                  {getPlatformIcon(item.platform)}
                </div>
                
                {/* Video indicator */}
                <div className="absolute top-2 right-2">
                  <div className="bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                    1/4
                  </div>
                </div>
                
                {/* Bottom overlay with account info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                    <span className="text-sm font-medium">{item.account}</span>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <button className="flex items-center gap-1 hover:text-red-500">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-500">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                    <button className="flex items-center gap-1 hover:text-gray-700">
                      <Share className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-1 text-xs">
                      <span>⭐⭐⭐⭐⭐</span>
                    </div>
                  </div>
                  <button className="hover:text-blue-500">
                    <Bookmark className="h-4 w-4" />
                  </button>
                </div>
                
                <p className="text-xs text-gray-600 mb-2">
                  {item.likes.toLocaleString()} likes
                </p>
                
                <p className="text-xs text-gray-700 leading-relaxed">
                  {item.notes}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InspoVault;

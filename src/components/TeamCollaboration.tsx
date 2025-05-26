
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { MessageCircle, ExternalLink, Mail, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SharedItem {
  id: string;
  type: "inspo" | "collection";
  name: string;
  thumbnail: string;
  dateShared: string;
  sharedBy: {
    name: string;
    email: string;
    avatar: string;
  };
  comments: number;
  link: string;
  permissions: "view" | "comment" | "edit";
}

const TeamCollaboration = () => {
  const [sharedItems, setSharedItems] = useState<SharedItem[]>([
    {
      id: "1",
      type: "collection",
      name: "March Campaign Ideas",
      thumbnail: "https://placehold.co/100x100/5271FF/FFFFFF.png",
      dateShared: "2023-05-20",
      sharedBy: {
        name: "Alex Johnson",
        email: "alex@example.com",
        avatar: "https://i.pravatar.cc/150?img=1"
      },
      comments: 8,
      link: "https://heyorca.app/c/march-ideas",
      permissions: "edit"
    },
    {
      id: "2",
      type: "inspo",
      name: "Unboxing video format",
      thumbnail: "https://placehold.co/100x100/E1306C/FFFFFF.png",
      dateShared: "2023-05-22",
      sharedBy: {
        name: "Morgan Smith",
        email: "morgan@example.com",
        avatar: "https://i.pravatar.cc/150?img=2"
      },
      comments: 3,
      link: "https://heyorca.app/i/unboxing-video",
      permissions: "comment"
    },
    {
      id: "3",
      type: "collection",
      name: "Testimonial Formats",
      thumbnail: "https://placehold.co/100x100/1DA1F2/FFFFFF.png",
      dateShared: "2023-05-23",
      sharedBy: {
        name: "Jordan Lee",
        email: "jordan@example.com",
        avatar: "https://i.pravatar.cc/150?img=3"
      },
      comments: 5,
      link: "https://heyorca.app/c/testimonials",
      permissions: "view"
    }
  ]);

  const [filter, setFilter] = useState<"all" | "collections" | "inspo">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredItems = sharedItems.filter(item => {
    const matchesType = filter === "all" || item.type === filter;
    const matchesSearch = searchTerm === "" || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Share link copied to your clipboard.",
    });
  };

  const updatePermissions = (id: string, permissions: "view" | "comment" | "edit") => {
    setSharedItems(
      sharedItems.map(item =>
        item.id === id ? { ...item, permissions } : item
      )
    );
    
    toast({
      title: "Permissions Updated",
      description: `Permissions set to "${permissions}" for this shared item.`,
    });
  };

  const openComments = (id: string) => {
    toast({
      title: "Comments Feature",
      description: "Comment functionality coming soon!",
    });
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search shared items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select value={filter} onValueChange={(value: "all" | "collections" | "inspo") => setFilter(value)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Items</SelectItem>
            <SelectItem value="collections">Collections</SelectItem>
            <SelectItem value="inspo">Inspiration</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No shared items found</h3>
          <p className="text-gray-600">No items match your current filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-20 h-20 bg-gray-100">
                  <img 
                    src={item.thumbnail} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardContent className="flex-1 flex flex-col justify-between p-4">
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <Badge variant="outline">
                          {item.type === "collection" ? "Collection" : "Inspiration"}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-1">
                        Shared on {new Date(item.dateShared).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center mt-2 sm:mt-0">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={item.sharedBy.avatar} alt={item.sharedBy.name} />
                        <AvatarFallback>{item.sharedBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="text-sm">
                        <span className="text-gray-900">{item.sharedBy.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <div className="truncate max-w-[180px] sm:max-w-[300px]">{item.link}</div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 ml-1"
                        onClick={() => copyLink(item.link)}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-row sm:flex-col items-center justify-end gap-2 p-4 border-t sm:border-t-0 sm:border-l">
                  <Select 
                    value={item.permissions} 
                    onValueChange={(value: "view" | "comment" | "edit") => updatePermissions(item.id, value)}
                  >
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Permissions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">View Only</SelectItem>
                      <SelectItem value="comment">Comment</SelectItem>
                      <SelectItem value="edit">Can Edit</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => openComments(item.id)}
                    >
                      <div className="relative">
                        <MessageCircle className="h-4 w-4" />
                        {item.comments > 0 && (
                          <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-3 w-3 flex items-center justify-center">
                            {item.comments}
                          </span>
                        )}
                      </div>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      asChild
                    >
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamCollaboration;

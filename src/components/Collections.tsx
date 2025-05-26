
import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Folder, Share2, Edit, Users2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Collection {
  id: string;
  name: string;
  description: string;
  thumbnails: string[];
  itemCount: number;
  shared: boolean;
  members: number;
}

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: "1",
      name: "March Campaign Ideas",
      description: "Funny trends we can adapt for our March campaign",
      thumbnails: [
        "https://placehold.co/100x100/5271FF/FFFFFF.png",
        "https://placehold.co/100x100/E1306C/FFFFFF.png",
        "https://placehold.co/100x100/FF0000/FFFFFF.png"
      ],
      itemCount: 12,
      shared: true,
      members: 3
    },
    {
      id: "2",
      name: "Product Demos",
      description: "Different ways to showcase our products",
      thumbnails: [
        "https://placehold.co/100x100/FF0000/FFFFFF.png",
        "https://placehold.co/100x100/1DA1F2/FFFFFF.png"
      ],
      itemCount: 8,
      shared: false,
      members: 0
    },
    {
      id: "3",
      name: "Testimonial Formats",
      description: "Creative ways to present customer reviews",
      thumbnails: [
        "https://placehold.co/100x100/E1306C/FFFFFF.png"
      ],
      itemCount: 5,
      shared: true,
      members: 2
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const { toast } = useToast();

  const handleCreateCollection = () => {
    if (!newCollectionName) {
      toast({
        title: "Missing Information",
        description: "Please provide a name for your collection.",
        variant: "destructive",
      });
      return;
    }

    const newCollection: Collection = {
      id: `${collections.length + 1}`,
      name: newCollectionName,
      description: newCollectionDescription,
      thumbnails: [],
      itemCount: 0,
      shared: false,
      members: 0
    };

    setCollections([...collections, newCollection]);
    setNewCollectionName("");
    setNewCollectionDescription("");
    setIsCreateDialogOpen(false);

    toast({
      title: "Collection Created",
      description: "Your new collection has been created successfully.",
    });
  };

  const shareCollection = (id: string) => {
    setCollections(
      collections.map((collection) =>
        collection.id === id 
          ? { ...collection, shared: true, members: collection.members + 1 } 
          : collection
      )
    );

    toast({
      title: "Collection Shared",
      description: "Share link copied to clipboard. Your team can now view this collection.",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Collections</h2>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          New Collection
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Card key={collection.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{collection.name}</h3>
                  <p className="text-sm text-gray-500">{collection.itemCount} items</p>
                </div>
                {collection.shared && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users2 className="h-3 w-3" />
                    {collection.members}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="text-sm text-gray-700 mb-4">{collection.description}</p>
              
              <div className="flex items-center gap-2">
                {collection.thumbnails.length > 0 ? (
                  <>
                    {collection.thumbnails.slice(0, 3).map((thumb, index) => (
                      <div key={index} className="w-10 h-10 rounded overflow-hidden">
                        <img 
                          src={thumb} 
                          alt={`Collection thumbnail ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                    {collection.thumbnails.length > 3 && (
                      <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-sm">
                        +{collection.thumbnails.length - 3}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center text-gray-500 text-sm">
                    <Folder className="h-4 w-4 mr-1" /> Empty collection
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <div className="flex justify-between w-full">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Edit className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => shareCollection(collection.id)}
                >
                  <Share2 className="h-3.5 w-3.5" /> 
                  {collection.shared ? "Shared" : "Share"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Collection</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">Collection Name</label>
              <Input
                id="name"
                placeholder="e.g., Summer Campaign Ideas"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">Description (Optional)</label>
              <Textarea
                id="description"
                placeholder="What is this collection for?"
                value={newCollectionDescription}
                onChange={(e) => setNewCollectionDescription(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateCollection}>
              Create Collection
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Collections;

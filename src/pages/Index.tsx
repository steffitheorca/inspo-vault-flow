
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Share } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import AppSidebar from "@/components/AppSidebar";
import InspoVault from "@/components/InspoVault";
import SaveInspoDialog from "@/components/SaveInspoDialog";
import Collections from "@/components/Collections";

const Index = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("vault");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const availableTags = ["funny", "trend", "music", "trending", "architecture", "city"];
  const availablePlatforms = ["instagram", "tiktok"];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setSelectedPlatforms([]);
    setSearchTerm("");
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">JA</span>
                  </div>
                  <span className="text-gray-700 font-medium">John's Agency</span>
                </div>
                
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Media</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">Content</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">Inspiration</span>
                </div>
              </div>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Share className="h-4 w-4" />
                Share
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Inspiration Dashboard</h1>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <TabsList className="bg-transparent p-0 h-auto">
                    <TabsTrigger 
                      value="vault" 
                      className="text-blue-600 border-b-2 border-blue-600 bg-transparent rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      All Saved Items
                    </TabsTrigger>
                    <TabsTrigger 
                      value="collections" 
                      className="text-gray-500 border-b-2 border-transparent bg-transparent rounded-none px-4 py-2 data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:text-gray-700"
                    >
                      Collections
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          Filter
                          {(selectedTags.length > 0 || selectedPlatforms.length > 0) && (
                            <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                              {selectedTags.length + selectedPlatforms.length}
                            </span>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-white">
                        <DropdownMenuLabel>Filter by Platform</DropdownMenuLabel>
                        {availablePlatforms.map((platform) => (
                          <DropdownMenuCheckboxItem
                            key={platform}
                            checked={selectedPlatforms.includes(platform)}
                            onCheckedChange={() => togglePlatform(platform)}
                          >
                            {platform.charAt(0).toUpperCase() + platform.slice(1)}
                          </DropdownMenuCheckboxItem>
                        ))}
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
                        {availableTags.map((tag) => (
                          <DropdownMenuCheckboxItem
                            key={tag}
                            checked={selectedTags.includes(tag)}
                            onCheckedChange={() => toggleTag(tag)}
                          >
                            {tag}
                          </DropdownMenuCheckboxItem>
                        ))}
                        
                        {(selectedTags.length > 0 || selectedPlatforms.length > 0) && (
                          <>
                            <DropdownMenuSeparator />
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={clearAllFilters}
                              className="w-full justify-start h-8"
                            >
                              Clear all filters
                            </Button>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="Search" 
                        className="pl-8 w-64" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button 
                      onClick={() => setIsAddDialogOpen(true)} 
                      className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Save Inspo
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="vault" className="mt-0">
                  <InspoVault 
                    searchTerm={searchTerm}
                    selectedTags={selectedTags}
                    selectedPlatforms={selectedPlatforms}
                  />
                </TabsContent>
                
                <TabsContent value="collections" className="mt-0">
                  <Collections />
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>

        <SaveInspoDialog 
          open={isAddDialogOpen} 
          onOpenChange={setIsAddDialogOpen}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;

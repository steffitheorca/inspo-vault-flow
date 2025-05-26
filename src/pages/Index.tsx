
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Share } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import InspoVault from "@/components/InspoVault";
import SaveInspoDialog from "@/components/SaveInspoDialog";
import Collections from "@/components/Collections";

const Index = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("vault");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
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
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input placeholder="Search" className="pl-8 w-64" />
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
                  <InspoVault />
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

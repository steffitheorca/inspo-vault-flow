
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import InspoVault from "@/components/InspoVault";
import SaveInspoDialog from "@/components/SaveInspoDialog";
import Collections from "@/components/Collections";
import TeamCollaboration from "@/components/TeamCollaboration";

const Index = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("vault");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">HeyOrca</h1>
              <span className="ml-2 text-xs sm:text-sm text-gray-500 hidden sm:block">Social Media Inspiration Manager</span>
            </div>
            <Button 
              onClick={() => setIsAddDialogOpen(true)} 
              className="flex items-center gap-2 h-9 sm:h-10 text-sm sm:text-base px-3 sm:px-4"
              size="sm"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden xs:inline">Save Inspo</span>
              <span className="xs:hidden">Save</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-white shadow-sm">
            <TabsTrigger 
              value="vault" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 px-2 sm:px-4 data-[state=active]:bg-gray-100"
            >
              <span className="hidden sm:inline">Inspo Vault</span>
              <span className="sm:hidden">Vault</span>
            </TabsTrigger>
            <TabsTrigger 
              value="collections" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 px-2 sm:px-4 data-[state=active]:bg-gray-100"
            >
              Collections
            </TabsTrigger>
            <TabsTrigger 
              value="collaborate" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 px-2 sm:px-4 data-[state=active]:bg-gray-100"
            >
              <span className="hidden sm:inline">Collaborate</span>
              <span className="sm:hidden">Team</span>
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="text-xs sm:text-sm py-2 sm:py-2.5 px-2 sm:px-4 data-[state=active]:bg-gray-100"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="vault" className="mt-4 sm:mt-6">
            <InspoVault />
          </TabsContent>
          
          <TabsContent value="collections" className="mt-4 sm:mt-6">
            <Collections />
          </TabsContent>
          
          <TabsContent value="collaborate" className="mt-4 sm:mt-6">
            <TeamCollaboration />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-4 sm:mt-6">
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">Track your inspiration usage and team engagement.</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <SaveInspoDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
      />
    </div>
  );
};

export default Index;

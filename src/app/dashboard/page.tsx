"use client";

import DashboardNavbar from "@/components/dashboard-navbar";
import { InfoIcon, UserCircle, Database, Table2 } from "lucide-react";
import CSVUpload from "@/components/csv-upload";
import DataTable from "@/components/data-table";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/supabase/client";

export default function Dashboard() {
  const [petStoreData, setPetStoreData] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        if (!data.user) {
          window.location.href = "/sign-in";
          return;
        }
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        window.location.href = "/sign-in";
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleCSVUpload = (data: any[]) => {
    setPetStoreData(data);
  };

  return (
    <>
      <DashboardNavbar />
      <main className="w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold">Montreal Pet Store Dashboard</h1>
            <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>
                Import and visualize Montreal pet store data for sales outreach
              </span>
            </div>
          </header>

          <Tabs defaultValue="data">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="data" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Data Management
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                User Profile
              </TabsTrigger>
            </TabsList>

            <TabsContent value="data" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <CSVUpload onUpload={handleCSVUpload} />
                </div>
                <div className="md:col-span-2">
                  <div className="bg-white rounded-xl border shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Table2 className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold">Data Overview</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {petStoreData.length > 0
                        ? `Showing ${petStoreData.length} pet stores in Montreal. Use the table below to filter and sort the data.`
                        : "Upload a CSV file to view pet store data. The data will be displayed in the table below."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Table Section */}
              <DataTable data={petStoreData} />
            </TabsContent>

            <TabsContent value="profile">
              {/* User Profile Section */}
              <section className="bg-card rounded-xl p-6 border shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <UserCircle size={48} className="text-primary" />
                  <div>
                    <h2 className="font-semibold text-xl">User Profile</h2>
                    <p className="text-sm text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 overflow-hidden">
                  <pre className="text-xs font-mono max-h-48 overflow-auto">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}

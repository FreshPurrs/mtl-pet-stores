import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  MapPin,
  Table2,
  Mail,
  BarChart4,
  Database,
  FileJson,
  FileSpreadsheet,
  MousePointerClick,
  RefreshCw,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform transforms your Montreal pet store data into
              actionable insights with these powerful tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="w-6 h-6" />,
                title: "Interactive Map",
                description:
                  "Visual representation of all pet stores with pins showing ratings and chain status at a glance",
              },
              {
                icon: <Table2 className="w-6 h-6" />,
                title: "Filterable Data Table",
                description:
                  "Sort and filter stores by ratings, location, chain status, and other metrics",
              },
              {
                icon: <MousePointerClick className="w-6 h-6" />,
                title: "One-Click Contact",
                description:
                  "Easily access store details and initiate contact via email or social media directly from the interface",
              },
              {
                icon: <BarChart4 className="w-6 h-6" />,
                title: "Outreach Tracker",
                description:
                  "Log communication history and track progress with each store",
              },
              {
                icon: <Database className="w-6 h-6" />,
                title: "Odoo Integration",
                description:
                  "Simple sync button to push selected store data to your Odoo CRM",
              },
              {
                icon: <RefreshCw className="w-6 h-6" />,
                title: "Real-time Updates",
                description:
                  "Stay current with automatic data refreshes and synchronization",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Import Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Easy Data Import</h2>
              <p className="text-gray-600 mb-6">
                Getting started is simple. Import your pet store data from
                multiple formats and instantly transform it into actionable
                insights.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: <FileJson className="w-5 h-5" />,
                    text: "Import from JSON files",
                  },
                  {
                    icon: <FileSpreadsheet className="w-5 h-5" />,
                    text: "Import from CSV spreadsheets",
                  },
                  {
                    icon: <Database className="w-5 h-5" />,
                    text: "Connect directly to your database",
                  },
                  {
                    icon: <RefreshCw className="w-5 h-5" />,
                    text: "Automatic data validation and cleaning",
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="text-blue-600">{item.icon}</div>
                    <span className="text-gray-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 text-center p-4">
                  Data import visualization
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Montreal Pet Stores</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Data Points Per Store</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Odoo CRM Compatible</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Streamline Your Outreach?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Start visualizing your Montreal pet store data and improve your
            sales outreach today.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Access Dashboard
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

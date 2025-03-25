import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  MapPin,
  Table,
  Mail,
  BarChart4,
  Database,
} from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Montreal{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                Pet Store
              </span>{" "}
              Data Visualization
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform your Montreal pet store data into an interactive
              dashboard for sales outreach and seamless CRM integration with
              Odoo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Access Dashboard
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#features"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
              >
                Explore Features
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-500" />
                <span>Interactive Map Visualization</span>
              </div>
              <div className="flex items-center gap-2">
                <Table className="w-5 h-5 text-green-500" />
                <span>Filterable Data Tables</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-500" />
                <span>One-Click Contact</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart4 className="w-5 h-5 text-green-500" />
                <span>Outreach Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-green-500" />
                <span>Odoo CRM Integration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

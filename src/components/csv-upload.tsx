"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Upload, FileUp, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CSVUploadProps {
  onUpload: (data: any[]) => void;
}

export default function CSVUpload({ onUpload = () => {} }: CSVUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const parseCSV = (text: string) => {
    const lines = text.split("\n");
    const headers = lines[0].split(",").map((header) => header.trim());

    const result = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;

      const values = lines[i].split(",").map((value) => value.trim());
      const entry = {};

      for (let j = 0; j < headers.length; j++) {
        entry[headers[j]] = values[j];
      }

      result.push(entry);
    }

    return result;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus("idle");
    setStatusMessage("");

    try {
      const text = await file.text();
      const data = parseCSV(text);

      // Call the onUpload callback with the parsed data
      onUpload(data);

      setUploadStatus("success");
      setStatusMessage(`Successfully imported ${data.length} records`);
    } catch (error) {
      console.error("Error parsing CSV:", error);
      setUploadStatus("error");
      setStatusMessage("Failed to parse CSV file. Please check the format.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Import Pet Store Data</h3>

      <div className="flex flex-col gap-4">
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
          <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-4">
            Drag and drop your CSV file here, or click to browse
          </p>

          <label htmlFor="csv-upload">
            <Button
              variant="outline"
              className="relative cursor-pointer"
              disabled={isUploading}
            >
              <FileUp className="mr-2 h-4 w-4" />
              Browse Files
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                className="sr-only"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
            </Button>
          </label>
        </div>

        {uploadStatus !== "idle" && (
          <div
            className={cn(
              "p-3 rounded-md text-sm flex items-center gap-2",
              uploadStatus === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700",
            )}
          >
            {uploadStatus === "success" ? (
              <Check className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}

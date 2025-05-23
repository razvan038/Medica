"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { upload } from "../../../../services/upload.service"; // import corect al serviciului upload

export default function UploadExcel() {
  const [products, setProducts] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(worksheet).map((product: any) => ({
        id: uuidv4(),
        name: product["Nume Produs"] || "",
        description: product["Descriere"] || "",
        category: product["Categorie"] || "",
        price: Number(product["Pret"]) || 0,
        discount: Number(product["Discount"]) || 0,
        stock: Number(product["Stock"]) || 0,
      }));
      setProducts(parsedData);
      setUploadResults([]); // reset results la încărcare fișier nou
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUpload = async () => {
  setUploading(true);
  setUploadResults([]);
  try {
    const response = await upload(products);
    setUploadResults([response.message || "Produsele au fost încărcate cu succes."]);
  } catch (error: any) {
    setUploadResults([`Eroare la încărcare: ${error.message || error}`]);
  }
  setUploading(false);
};


  return (
    <div className="p-4 border rounded-lg shadow-md max-w-4xl mx-auto">
      <div>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
        />
        <Button onClick={() => fileInputRef.current?.click()}>
          Selectează fișier
        </Button>
      </div>

      {products.length > 0 && (
        <Button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-4 mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {uploading ? "Se încarcă..." : "Upload Produse"}
        </Button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md bg-white">
            <p className="text-xs text-gray-500">ID: {product.id}</p>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="text-sm text-blue-600 font-semibold">Categorie: {product.category}</p>
            <p className="text-md font-bold mt-2">{product.price} RON</p>
            <p className="text-md font-bold mt-2">Discount: {product.discount}</p>
            <p className="text-sm text-gray-700">Stock: {product.stock}</p>
          </div>
        ))}
      </div>

      {uploadResults.length > 0 && (
        <div className="mt-6 p-4 border rounded bg-gray-50 max-w-4xl mx-auto">
          <h4 className="font-semibold mb-2">Rezultate încărcare:</h4>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {uploadResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

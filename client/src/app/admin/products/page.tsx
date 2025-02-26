"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button"; 

export default function UploadExcel() {
  const [products, setProducts] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null); // Declare fileInputRef variable

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
        ...product,
      }));
      setProducts(parsedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleUpload = () => {
    console.log("Uploading products:", products);
    // Aici ai putea adăuga logica pentru a trimite datele către backend
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
            className="mt-4 mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Upload Produse
          </Button>
        )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md bg-white">
            <p className="text-xs text-gray-500">ID: {product.id}</p>
            <h3 className="text-lg font-semibold">{product["Nume Produs"]}</h3>
            <p className="text-sm text-gray-600">{product["Descriere"]}</p>
            <p className="text-sm text-blue-600 font-semibold">Categorie: {product["Categorie"]}</p>
            <p className="text-md font-bold mt-2">{product["Pret"]} RON</p>
            {product["Discount"] && (
              <p className="text-sm text-red-500">Reducere: {product["Valoare Discount"]} RON</p>
            )}
            <p className="text-sm text-gray-700">Stock: {product["Stock"]}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
}

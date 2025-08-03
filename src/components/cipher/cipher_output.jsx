// components/cipher/CipherOutput.jsx
import React from 'react';
import QRCode from "react-qr-code";

export default function CipherOutput({ 
  output, 
  outputFont, 
  method, 
  chunkParts, 
  qrImages, 
  onDownloadPDF 
}) {
  const copyQR = async (idx) => {
    try {
      const blob = await (await fetch(qrImages[idx])).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ]);
      alert(`QR-code van blok ${idx + 1} gekopieerd ✅`);
    } catch (err) {
      console.error("Kopiëren mislukt:", err);
      alert("Kon QR-code niet kopiëren");
    }
  };

  return (
    <div>
      <label className="block font-medium mb-1">Resultaat:</label>
      <textarea
        className="w-full border p-2 rounded bg-gray-100"
        style={{ fontFamily: outputFont ? `'${outputFont}', sans-serif` : "inherit" }}
        rows="4"
        readOnly
        value={output}
      />

      {method === "splitChunks" && chunkParts.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">QR-codes per blok:</h2>
          <div className="flex flex-wrap gap-6">
            {chunkParts.map((part, idx) => (
              <div
                key={idx}
                className="w-[160px] flex flex-col items-center border p-4 bg-white rounded shadow-sm"
              >
                {qrImages[idx] && <img src={qrImages[idx]} alt={`QR Blok ${idx + 1}`} />}
                <p className="text-sm text-gray-600 mt-2">Blok {idx + 1}</p>
                <button
                  onClick={() => copyQR(idx)}
                  className="mt-2 px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Kopieer QR
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {output && (
        <div className="flex gap-4 items-center mt-4">
          <div className="border p-4 bg-white">
            <QRCode value={output} size={128} />
          </div>
          <button
            onClick={onDownloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download als PDF
          </button>
        </div>
      )}
    </div>
  );
}
import { Download } from 'lucide-react';
import QRCode from "react-qr-code";

export const CipherResults = ({
    output,
    method,
    chunkParts,
    qrImages,
    onDownloadPDF
}) => {
    if (!output) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">QR-code en Export</h3>

            {/* Split Chunks QR Codes */}
            {method === "splitChunks" && chunkParts && chunkParts.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4">QR-codes per blok:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {chunkParts.map((part, idx) => (
                            <div key={idx} className="p-4 border rounded-lg bg-gray-50 text-center">
                                <div className="flex justify-center mb-2">
                                    <QRCode value={part} size={120} />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Blok {idx + 1}</p>
                                <p className="text-xs text-gray-500 mt-1 font-mono truncate">{part}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={onDownloadPDF}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                        <Download size={18} />
                        Download PDF met alle QR-codes
                    </button>
                </div>
            )}

            {/* Main QR Code en PDF Download voor andere methodes */}
            {method !== "splitChunks" && (
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex-shrink-0">
                        <QRCode value={output} size={128} />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <button
                            onClick={onDownloadPDF}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Download size={18} />
                            Download als PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
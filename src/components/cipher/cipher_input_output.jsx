import { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { copyToClipboard } from '../../utils/clipboard.js';
import { decodeFontMap, fontMap } from '../../config/font_methods.js';

export const CipherInputOutput = ({
  input,
  onInputChange,
  output,
  outputFont,
  method
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    const result = await copyToClipboard(output);
    if (result.success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Get font for input (decode methods)
  const getInputFont = () => {
    const fontFamily = decodeFontMap[method];
    return fontFamily ? `'${fontFamily}', sans-serif` : 'inherit';
  };

  // Get font for output
  const getOutputFont = () => {
    // For encode methods: use the special font
    const encodeFontFamily = fontMap[method];
    if (encodeFontFamily) {
      return `'${encodeFontFamily}', sans-serif`;
    }
    
    // For decode methods: use normal font since output should be readable text
    if (decodeFontMap[method]) {
      return 'inherit';
    }
    
    // For other methods: check if outputFont was explicitly provided
    if (outputFont) {
      return `'${outputFont}', sans-serif`;
    }
    
    return 'inherit';
  };

  return (
    <>
      {/* Input */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoer</h3>
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Voer uw tekst hier in..."
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          style={{ fontFamily: getInputFont() }}
        />
      </div>

      {/* Output */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resultaat</h3>
        <div className="relative">
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            readOnly
            value={output}
            style={{ fontFamily: getOutputFont() }}
          />
          <button
            onClick={handleCopy}
            className={`absolute bottom-2 right-2 px-3 py-1 text-sm rounded transition-colors flex items-center gap-1 ${
              copySuccess 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {copySuccess ? <CheckCircle size={14} /> : <Copy size={14} />}
            {copySuccess ? 'Gekopieerd!' : 'Kopieer'}
          </button>
        </div>
      </div>
    </>
  );
};
// components/cipher/CipherInput.jsx
import React from 'react';
import { decodeFontMap } from '../../config/font_methods.js';

export default function CipherInput({ input, setInput, method }) {
  const getFontFamily = () => {
    // Alleen font tonen als we in "decodeer"-modus zitten
    const fontFamily = decodeFontMap[method];
    return fontFamily ? `'${fontFamily}', sans-serif` : 'inherit';
  };

  return (
    <textarea
      className="w-full border p-2 rounded"
      rows="4"
      placeholder="Voer tekst in"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      style={{ fontFamily: getFontFamily() }}
    />
  );
}
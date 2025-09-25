// components/cipher/cipher_selector.jsx
import React from 'react';
import { cipherOptions } from '../../config/cipher_options.js';

export default function CipherSelector({ 
  method, 
  setMethod, 
  shift, 
  setShift,
  year, 
  setYear,
  codeword, 
  setCodeword,
  skip, 
  setSkip,
  chunkCount, 
  setChunkCount,
  kijkwoord, 
  setKijkwoord,
  kleurwoord, 
  setKleurwoord 
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <select
        className="w-full border p-2"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        {cipherOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {method === "caesarCipher" && (
        <input
          type="number"
          min="-25"
          max="25"
          className="border p-2 w-20"
          value={shift}
          onChange={(e) => setShift(parseInt(e.target.value))}
        />
      )}

      {(method === "letterskip" || method === "letterskipDecode") && (
        <input
          type="number"
          className="border p-2 w-24"
          placeholder="Sleutelgetal"
          value={skip}
          onChange={(e) => setSkip(parseInt(e.target.value))}
        />
      )}

      {(method === "tralieEncode" || method === "tralieDecode") && (
        <input
          type="number"
          className="border p-2 w-24"
          placeholder="Aantal rijen"
          value={skip}
          onChange={(e) => setSkip(parseInt(e.target.value))}
        />
      )}

      {(method === "yearmethodEncode" || method === "yearmethodDecode") && (
        <input
          className="border p-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Jaartal (bv. 2159)"
        />
      )}

      {method === "codewordEncodeDecode" && (
        <input
          type="text"
          className="border p-2"
          value={codeword}
          onChange={(e) => setCodeword(e.target.value)}
          placeholder="Codewoord (bv. PARKBOCHT)"
        />
      )}

      {method === "splitChunks" && (
        <input
          type="number"
          min={1}
          className="border p-2 w-24"
          placeholder="Aantal blokken"
          value={chunkCount}
          onChange={(e) => setChunkCount(parseInt(e.target.value))}
        />
      )}

      {(method === "kijkKleurEncode" || method === "kijkKleurDecode") && (
        <>
          <input
            type="text"
            className="border p-2 w-32"
            placeholder="Kijkwoord (bv. KIJK-)"
            value={kijkwoord}
            onChange={(e) => setKijkwoord(e.target.value.toUpperCase())}
          />
          <input
            type="text"
            className="border p-2 w-32"
            placeholder="Kleurwoord (bv. KLEUR)"
            value={kleurwoord}
            onChange={(e) => setKleurwoord(e.target.value.toUpperCase())}
          />
        </>
      )}
    </div>
  );
}
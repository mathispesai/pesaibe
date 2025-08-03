// hooks/useCipher_conversion.js
import { useCallback } from 'react';
import {
  reverseWords, caesarCipher, letterToNumber, numberToLetter, morseEncode, morseDecode,
  yearMethodEncode, yearMethodDecode, codewordEncodeDecode, windrose, windroseDecode,
  letterKeyEncode, letterKeyDecode, squareEncode, squareDecode, polybiusEncode, polybiusDecode,
  traliePattern, tralieDecode, asciiEncode, asciiDecode, hexEncode, hexDecode, upsideDown,
  splitChunks, kijkKleurEncode, kijkKleurDecode, atbashCipher
} from '../utils/cipherUtils/index.js';
import { fontMap } from '../config/font_methods.js';

export const useCipherConversion = () => {
  const convertText = useCallback((
    input, 
    method, 
    { shift, year, codeword, skip, chunkCount, kijkwoord, kleurwoord, wordList }
  ) => {
    console.log("Input:", input);
    console.log("Gekozen methode:", method);

    // Font methods - return input with font info
    if (method.includes("FontEncode")) {
      const fontName = fontMap[method];
      return { result: input, font: fontName };
    }
    
    if (method.includes("FontDecode")) {
      return { result: input, font: "" };
    }

    // Regular cipher methods
    let result = "";
    
    if (method === "letterskip") {
      if (wordList.length === 0) {
        return { result: "Woordenlijst nog niet geladen...", font: "" };
      }
      result = letterKeyEncode(input, skip, wordList);
    } else {
      switch (method) {
        case "reverseWords":
          result = reverseWords(input);
          break;
        case "caesarCipher":
          result = caesarCipher(input, shift);
          break;
        case "letterToNumber":
          result = letterToNumber(input);
          break;
        case "numberToLetter":
          result = numberToLetter(input);
          break;
        case "morseEncode":
          result = morseEncode(input);
          break;
        case "morseDecode":
          result = morseDecode(input);
          break;
        case "yearmethodEncode":
          result = yearMethodEncode(input, year);
          break;
        case "yearmethodDecode":
          result = yearMethodDecode(input, year);
          break;
        case "codewordEncodeDecode":
          result = codewordEncodeDecode(input, codeword);
          break;
        case "windrose":
          result = windrose(input);
          break;
        case "windroseDecode":
          result = windroseDecode(input);
          break;
        case "letterskipDecode":
          result = letterKeyDecode(input, skip);
          break;
        case "squareEncode":
          result = squareEncode(input);
          break;
        case "squareDecode":
          result = squareDecode(input);
          break;
        case "polybiusEncode":
          result = polybiusEncode(input);
          break;
        case "polybiusDecode":
          result = polybiusDecode(input);
          break;
        case "tralieEncode":
          result = traliePattern(input, skip);
          break;
        case "tralieDecode":
          result = tralieDecode(input, skip);
          break;
        case "asciiEncode":
          result = asciiEncode(input);
          break;
        case "asciiDecode":
          result = asciiDecode(input);
          break;
        case "hexEncode":
          result = hexEncode(input);
          break;
        case "hexDecode":
          result = hexDecode(input);
          break;
        case "upsideDown":
          result = upsideDown(input);
          break;
        case "splitChunks":
          const parts = splitChunks(input, chunkCount);
          return { result: parts.join("\n\n"), font: "", chunkParts: parts };
        case "kijkKleurEncode":
          result = kijkKleurEncode(input, kijkwoord, kleurwoord);
          break;
        case "kijkKleurDecode":
          result = kijkKleurDecode(input, kijkwoord, kleurwoord);
          break;
        case "atbashCipher":
          result = atbashCipher(input);
          break;
        default:
          result = "Methode niet geïmplementeerd.";
      }
    }

    console.log("Output:", result);
    return { result, font: "" };
  }, []);

  return { convertText };
};
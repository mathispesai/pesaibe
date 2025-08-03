// config/cipher_options.js

export const cipherOptions = [
  // Eenvoudige tekstmanipulatie
  { label: "Woorden omkeren", value: "reverseWords" },
  { label: "Tekst ondersteboven", value: "upsideDown" },

  // Letter ↔ Nummer
  { label: "Letters omzetten naar Cijfers (A=1, B=2)", value: "letterToNumber" },
  { label: "Cijfers omzetten tot Letters", value: "numberToLetter" },
  { label: "ASCII-code (versleutelen)", value: "asciiEncode" },
  { label: "ASCII-code (ontsleutelen)", value: "asciiDecode" },
  { label: "Hexadecimaal (versleutelen)", value: "hexEncode" },
  { label: "Hexadecimaal (ontsleutelen)", value: "hexDecode" },

  // Substitutietechnieken
  { label: "Caesarverschuiving", value: "caesarCipher" },
  { label: "Vervangingscode (A↔Z)", value: "atbashCipher" },
  { label: "Codewoordsubstitutie", value: "codewordEncodeDecode" },
  { label: "Lettersleutel (elke nth letter)", value: "letterskip" },
  { label: "Lettersleutel (ontsleutelen)", value: "letterskipDecode" },
  { label: "Windroosmethode", value: "windrose" },
  { label: "Windroosmethode (ontsleutelen)", value: "windroseDecode" },
  { label: "Kijk-Kleur methode (encode)", value: "kijkKleurEncode" },
  { label: "Kijk-Kleur methode (decode)", value: "kijkKleurDecode" },

  // Matrix/raster
  { label: "Matrixschrift (Polybius)", value: "polybiusEncode" },
  { label: "Matrixschrift (ontsleutelen)", value: "polybiusDecode" },
  { label: "Vierkantcodering (versleutelen)", value: "squareEncode" },
  { label: "Vierkantcodering (ontsleutelen)", value: "squareDecode" },
  { label: "Tralieschrift (versleutelen)", value: "tralieEncode" },
  { label: "Tralieschrift (ontsleutelen)", value: "tralieDecode" },

  // Tijd-gebaseerd
  { label: "Jaartalmethode (versleutelen)", value: "yearmethodEncode" },
  { label: "Jaartalmethode (ontsleutelen)", value: "yearmethodDecode" },

  // Morse
  { label: "Morsecode (versleutelen)", value: "morseEncode" },
  { label: "Morsecode (ontsleutelen)", value: "morseDecode" },

  // Fonts en symbolen
  { label: "Braille (versleutelen)", value: "brailleFontEncode" },
  { label: "Braille (ontsleutelen)", value: "brailleFontDecode" },
  { label: "Raam (versleutelen)", value: "raamFontEncode" },
  { label: "Raam (ontsleutelen)", value: "raamFontDecode" },
  { label: "Chinois (versleutelen)", value: "chinoisFontEncode" },
  { label: "Chinois (ontsleutelen)", value: "chinoisFontDecode" },
  { label: "Dancingmen (versleutelen)", value: "dancingmenFontEncode" },
  { label: "Dancingmen (ontsleutelen)", value: "dancingmenFontDecode" },
  { label: "Hieroglyphs (versleutelen)", value: "hieroglyphsFontEncode" },
  { label: "Hieroglyphs (ontsleutelen)", value: "hieroglyphsFontDecode" },
  { label: "Semaphoreflags (versleutelen)", value: "semaphoreflagsFontEncode" },
  { label: "Semaphoreflags (ontsleutelen)", value: "semaphoreflagsFontDecode" },

  // Modern / utility
  { label: "Tekst opdelen in blokken met QR", value: "splitChunks" },
];
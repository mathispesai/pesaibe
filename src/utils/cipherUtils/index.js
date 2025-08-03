// utils/cipherUtils/index.js
// Barrel export file - centraal punt voor alle cipher functies

// Text manipulation
export { 
  reverseWords, 
  upsideDown, 
  upsideDownMap 
} from './text_manipulation.js';

// Substitution ciphers
export { 
  caesarCipher, 
  atbashCipher, 
  buildCodewordMatrix, 
  codewordEncodeDecode 
} from './substitution.js';

// Letter ↔ Number conversions
export { 
  letterToNumber, 
  numberToLetter, 
  asciiEncode, 
  asciiDecode, 
  hexEncode, 
  hexDecode 
} from './letter_number.js';

// Morse code
export { 
  morseEncode, 
  morseDecode 
} from './morse.js';

// Matrix-based ciphers
export { 
  polybiusEncode, 
  polybiusDecode, 
  squareEncode, 
  squareDecode, 
  tralieEncode, 
  tralieDecode, 
  traliePattern 
} from './matrix.js';

// Time-based ciphers
export { 
  yearMethodEncode, 
  yearMethodDecode 
} from './time_based.js';

// Windrose cipher
export { 
  windrose, 
  windroseDecode 
} from './windrose.js';

// Letter key cipher
export { 
  letterKeyEncode, 
  letterKeyDecode 
} from './letter_key.js';

// Kijk-Kleur method
export { 
  kijkKleurEncode, 
  kijkKleurDecode 
} from './kijk_kleur.js';

// Utility functions
export { 
  splitChunks 
} from './utility.js';
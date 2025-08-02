export const reverseWords = (text) => {
  return text.split(" ").map(word => word.split("").reverse().join(""))
    .join(" ");
};

export const caesarCipher = (text, shift = 1) => {
  return text.replace(/[a-z]/gi, (char) => {
    const start = char === char.toUpperCase() ? 65 : 97;
    return String.fromCharCode((char.charCodeAt(0) - start + shift + 26) % 26 + start);
  });
};

export const letterToNumber = (text) => {
  return text
    .toUpperCase()
    .split(" ")
    .map(word =>
      word
        .replace(/[^A-Z]/g, "")
        .split("")
        .map(c => c.charCodeAt(0) - 64) // A = 65 → 1
        .join(" ")
    )
    .join(" / ");
};

export const numberToLetter = (text) => {
  return text
    .split("/")
    .map(word =>
      word
        .trim()
        .split(/\s+/)
        .map(n => {
          const num = parseInt(n, 10);
          return num >= 1 && num <= 26 ? String.fromCharCode(num + 64) : "?";
        })
        .join("")
    )
    .join(" ");
};

export const morseEncode = (text) => {
  const map = {
    a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".",
    f: "..-.", g: "--.", h: "....", i: "..", j: ".---",
    k: "-.-", l: ".-..", m: "--", n: "-.", o: "---",
    p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-",
    u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--",
    z: "--..", 0: "-----", 1: ".----", 2: "..---",
    3: "...--", 4: "....-", 5: ".....", 6: "-....",
    7: "--...", 8: "---..", 9: "----."
  };

  return text
    .toLowerCase()
    .split(" ")
    .map(word =>
      word
        .split("")
        .map(c => map[c] || "")
        .join(" ")
    )
    .join(" / ");
};

export const morseDecode = (code) => {
  const map = {
    a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".",
    f: "..-.", g: "--.", h: "....", i: "..", j: ".---",
    k: "-.-", l: ".-..", m: "--", n: "-.", o: "---",
    p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-",
    u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--",
    z: "--..", 0: "-----", 1: ".----", 2: "..---",
    3: "...--", 4: "....-", 5: ".....", 6: "-....",
    7: "--...", 8: "---..", 9: "----."
  };

  const reverseMap = Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));

  return code
    .split(" / ")
    .map(word =>
      word
        .trim()
        .split(/\s+/)
        .map(signal => reverseMap[signal] || "?")
        .join("")
    )
    .join(" ");
};

export const yearMethodEncode = (text, year = "1979") => {
  const clean = text.replace(/[^a-zA-Z]/g, "").toUpperCase();
  const yearDigits = year.split("").map(Number);
  let rows = [];
  let i = 0;

  while (i < clean.length) {
    for (const digit of yearDigits) {
      const slice = clean.slice(i, i + digit).padEnd(digit, "X");
      rows.push(slice);
      i += digit;
      if (i >= clean.length) break;
    }
  }

  const maxLen = Math.max(...rows.map(r => r.length));
  let result = "";

  for (let col = 0; col < maxLen; col++) {
    for (let row = 0; row < rows.length; row++) {
      if (rows[row][col]) {
        result += rows[row][col];
      }
    }
  }

  return result;
};

export const yearMethodDecode = (cipher, year = "1979") => {
  const yearDigits = year.split("").map(Number);
  const totalLength = cipher.length;

  // Bepaal aantal blokken en kolombreedte
  let blockSizes = [];
  let i = 0;
  while (i < totalLength) {
    for (const digit of yearDigits) {
      if (i >= totalLength) break;
      blockSizes.push(digit);
      i += digit;
    }
  }

  const maxLen = Math.max(...blockSizes);
  const rows = blockSizes.length;

  // Maak lege matrix
  let matrix = Array.from({ length: rows }, () => Array(maxLen).fill(""));

  // Vul kolomsgewijs
  let c = 0;
  for (let col = 0; col < maxLen; col++) {
    for (let row = 0; row < rows; row++) {
      if (matrix[row].length > col && blockSizes[row] > col && c < totalLength) {
        matrix[row][col] = cipher[c++];
      }
    }
  }

  // Construeer originele tekst
  return matrix.map((row, i) => row.slice(0, blockSizes[i]).join("")).join("");
};

export const buildCodewordMatrix = (keyword) => {
  const cleanKeyword = [...new Set(keyword.toUpperCase().replace(/[^A-Z]/g, ""))];
  const fullAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const remainingLetters = fullAlphabet.filter(l => !cleanKeyword.includes(l));
  const topRow = cleanKeyword.concat(remainingLetters).slice(0, 13);
  const bottomRow = fullAlphabet.filter(l => !topRow.includes(l));
  return { topRow, bottomRow };
};

export const codewordEncodeDecode = (text, keyword) => {
  const { topRow, bottomRow } = buildCodewordMatrix(keyword);

  // Maak een map die letters uit topRow en bottomRow wisselt
  const map = {};
  for (let i = 0; i < 13; i++) {
    map[topRow[i]] = bottomRow[i];
    map[bottomRow[i]] = topRow[i];
  }

  return text.toUpperCase().split("").map(char => map[char] || char).join("");
};

const windroseMap = {
  A: "NNNO", B: "NONNO", C: "NOONO", D: "OONO", E: "OOZO",
  F: "ZOOZO", G: "ZOZZO", H: "ZZZO", I: "ZZZW", J: "ZWZZW",
  K: "ZWWZW", L: "WWZW", M: "WWNW", N: "NWWNW", O: "NWNNW",
  P: "NNNW", Q: "NNNO*", R: "NONNO*", S: "NOONO*", T: "OONO*",
  U: "OOZO*", V: "ZOOZO*", W: "ZOZZO*", X: "ZZZO*", Y: "ZZZW*",
  Z: "ZWZZW*"
};

export const windrose = (text) => {
  return text.toUpperCase()
    .split(" ")
    .map(word => word
      .split("")
      .map(letter => windroseMap[letter] || letter)
      .join("."))
    .join(" / ");
};

const fullReverseMap = Object.fromEntries(
  Object.entries(windroseMap).map(([letter, code]) => [code, letter])
);

export const windroseDecode = (cipherText) => {
  return cipherText
    .split(" / ") // Woordsegmenten
    .map(word =>
      word
        .split(".") // Lettersegmenten
        .map(code => fullReverseMap[code] || "?")
        .join("")
    )
    .join(" ");
};

export const letterKeyEncode = (text, position = 3, wordList = []) => {
  const clean = text.toUpperCase().replace(/[^A-Z]/g, "");
  const results = [];

  for (const char of clean) {
    // Zoek alle woorden waarvan de n-de letter overeenkomt met deze letter
    const matches = wordList.filter(
      word => word.length >= position && word[position - 1].toUpperCase() === char
    );

    // Kies willekeurig uit de matches
    if (matches.length > 0) {
      const chosen = matches[Math.floor(Math.random() * matches.length)];
      results.push(chosen);
    } else {
      results.push(`[${char}]`); // geen match
    }
  }

  return results.join(" ");
};

export const letterKeyDecode = (cipherText, position = 3) => {
  return cipherText
    .split(/\s+/)
    .map(word => {
      if (word.length >= position) {
        return word.charAt(position - 1).toUpperCase();
      } else {
        return "?"; // te kort woord
      }
    })
    .join("");
};

export const squareEncode = (text) => {
  const clean = text.toUpperCase().replace(/[^A-Z]/g, "");

  // Bepaal de kleinste vierkantswortel groter dan of gelijk aan lengte
  const len = clean.length;
  const size = Math.ceil(Math.sqrt(len));
  const padded = clean.padEnd(size * size, "X");

  // Maak matrix
  const grid = [];
  for (let i = 0; i < size; i++) {
    grid.push(padded.slice(i * size, (i + 1) * size));
  }

  // Lees kolomsgewijs
  let result = "";
  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      result += grid[row][col];
    }
  }

  return result;
};

export const squareDecode = (cipherText) => {
  const clean = cipherText.toUpperCase().replace(/[^A-Z]/g, "");
  const len = clean.length;
  const size = Math.sqrt(len);

  if (!Number.isInteger(size)) {
    return "Geen geldig vierkant (aantal letters moet een kwadraat zijn)";
  }

  // Maak lege matrix
  const grid = Array.from({ length: size }, () => []);

  // Vul kolomsgewijs
  let index = 0;
  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      grid[row][col] = clean[index++];
    }
  }

  // Lees rij per rij
  return grid.map(row => row.join("")).join("");
};

const polybiusMatrix = [
  ["A", "B", "C", "D", "E"],
  ["F", "G", "H", "I", "J"],
  ["K", "L", "M", "N", "O"],
  ["P", "R", "S", "T", "U"],
  ["V", "W", "X", "Y", "Z"]
];

// Helpers voor encode/decode
const polybiusMap = {};
const reversePolybiusMap = {};

for (let row = 0; row < 5; row++) {
  for (let col = 0; col < 5; col++) {
    const letter = polybiusMatrix[row][col];
    const code = `${row + 1}${col + 1}`;
    polybiusMap[letter] = code;
    reversePolybiusMap[code] = letter;
  }
}

export const polybiusEncode = (text) => {
  const clean = text.toUpperCase().replace(/[^A-Z]/g, "").replace(/Q/g, ""); // Q weglaten
  return clean
    .split("")
    .map(char => polybiusMap[char] || "?")
    .join(" ");
};

export const polybiusDecode = (code) => {
  return code
    .replace(/[^1-5]/g, "") // verwijder spaties en niet-cijfertekens
    .match(/.{1,2}/g)        // per 2 cijfers groeperen
    .map(pair => reversePolybiusMap[pair] || "?")
    .join("");
};

export const tralieEncode = (text, rows = 2) => {
  const clean = text.toUpperCase().replace(/[^A-Z]/g, "");
  if (rows < 2) return clean;

  const matrix = Array.from({ length: rows }, () => []);

  let row = 0;
  let direction = 1;

  for (let i = 0; i < clean.length; i++) {
    for (let r = 0; r < rows; r++) {
      matrix[r][i] = " "; // lege plek opvullen voor netjes patroon
    }
    matrix[row][i] = clean[i];

    // Bepaal volgende rij
    row += direction;
    if (row === rows - 1 || row === 0) direction *= -1;
  }

  // Lees per rij
  return matrix.map(r => r.join("").replace(/ /g, "")).join("");
};

export const tralieDecode = (cipherText, rows = 2) => {
  const clean = cipherText.toUpperCase().replace(/[^A-Z]/g, "");
  if (rows < 2) return clean;

  const len = clean.length;

  // 1. Genereer lege zigzag-structuur met markers
  const matrix = Array.from({ length: rows }, () => Array(len).fill(null));

  let row = 0;
  let direction = 1;
  for (let col = 0; col < len; col++) {
    matrix[row][col] = "*";
    row += direction;
    if (row === rows - 1 || row === 0) direction *= -1;
  }

  // 2. Vul matrix met tekst op de juiste plaatsen
  let index = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < len; c++) {
      if (matrix[r][c] === "*" && index < len) {
        matrix[r][c] = clean[index++];
      }
    }
  }

  // 3. Lees de matrix zigzaggend uit
  let result = "";
  row = 0;
  direction = 1;
  for (let col = 0; col < len; col++) {
    result += matrix[row][col];
    row += direction;
    if (row === rows - 1 || row === 0) direction *= -1;
  }

  return result;
};

export const traliePattern = (text, rows = 2) => {
  const clean = text.toUpperCase().replace(/[^A-Z]/g, "");
  if (rows < 2) return clean;

  const len = clean.length;
  const matrix = Array.from({ length: rows }, () => Array(len).fill(" "));

  let row = 0;
  let direction = 1;

  for (let col = 0; col < len; col++) {
    matrix[row][col] = clean[col];
    row += direction;
    if (row === rows - 1 || row === 0) direction *= -1;
  }

  // Combineer elke rij als string, gescheiden door nieuwe regels
  return matrix.map(r => r.join("")).join("\n");
};

export const asciiEncode = (text) => {
  return text.split("").map(c => c.charCodeAt(0)).join(" ");
};

export const asciiDecode = (text) => {
  return text.split(/\s+/).map(code => String.fromCharCode(parseInt(code))).join("");
};

export const hexEncode = (text) => {
  return text.split("").map(c => c.charCodeAt(0).toString(16)).join(" ");
};

export const hexDecode = (text) => {
  return text.split(/\s+/).map(h => String.fromCharCode(parseInt(h, 16))).join("");
};

export const upsideDownMap = {
  a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ",
  h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "ʃ", m: "ɯ", n: "u",
  o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n",
  v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z",
  A: "∀", B: "𐐒", C: "Ɔ", D: "◖", E: "Ǝ", F: "Ⅎ", G: "פ",
  H: "H", I: "I", J: "ſ", K: "ʞ", L: "˥", M: "W", N: "N",
  O: "O", P: "Ԁ", Q: "Ό", R: "ᴚ", S: "S", T: "⊥", U: "∩",
  V: "Λ", W: "M", X: "X", Y: "⅄", Z: "Z",
  1: "Ɩ", 2: "ᄅ", 3: "Ɛ", 4: "ㄣ", 5: "ϛ", 6: "9",
  7: "ㄥ", 8: "8", 9: "6", 0: "0", ".": "˙", ",": "'",
  "'": ",", '"': ",,", "(": ")", ")": "(", "[": "]", "]": "["
};

export const upsideDown = (text) => {
  return text
    .split("")
    .reverse()
    .map(c => upsideDownMap[c] || upsideDownMap[c.toLowerCase()] || c)
    .join("");
};

export const splitChunks = (text, chunks = 3) => {
  const clean = text.trim();
  const partSize = Math.ceil(clean.length / chunks);
  const parts = [];

  for (let i = 0; i < clean.length; i += partSize) {
    parts.push(clean.slice(i, i + partSize));
  }

  return parts;
};

export const kijkKleurEncode = (text, kijk = "KIJK-", kleur = "KLEUR") => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".replace("Y", "");
  const kleurLabels = kleur.toUpperCase().split(""); // rij
  const kijkLabels = kijk.toUpperCase().split("");   // kolom

  // Bouw matrix
  const matrix = [];
  let index = 0;
  for (let r = 0; r < 5; r++) {
    const row = [];
    for (let c = 0; c < 5; c++) {
      row.push(alphabet[index++]);
    }
    matrix.push(row);
  }

  // Input voorbereiden
  const clean = text.toUpperCase().replace(/[^A-Z]/g, "").replace(/IJ/g, "Y");

  const result = [];

  for (let char of clean) {
    let found = false;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (matrix[r][c] === char) {
          // ✅ juiste volgorde: kolomletter eerst, dan rijletter (zoals decode)
          result.push(`${kijkLabels[c]}${kleurLabels[r]}`);
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found) {
      result.push("??");
    }
  }

  return result.join("/");
};

export const kijkKleurDecode = (codeSequence, kijk = "KIJK-", kleur = "KLEUR") => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".replace("Y", "");
  const kleurLabels = kleur.toUpperCase().split("");
  const kijkLabels = kijk.toUpperCase().split("");

  // Matrix 5x5 bouwen
  const matrix = [];
  let index = 0;
  for (let r = 0; r < 5; r++) {
    const row = [];
    for (let c = 0; c < 5; c++) {
      row.push(alphabet[index++]);
    }
    matrix.push(row);
  }

  const parts = codeSequence.split("/").filter(Boolean);
  let result = "";

  for (let part of parts) {
    if (part.length !== 2) {
      result += "?";
      continue;
    }

    const colLabel = part[0];
    const rowLabel = part[1];

    const colIndices = [];
    kijkLabels.forEach((l, i) => {
      if (l === colLabel) colIndices.push(i);
    });

    const rowIndices = [];
    kleurLabels.forEach((l, i) => {
      if (l === rowLabel) rowIndices.push(i);
    });

    const matches = [];

    for (let r of rowIndices) {
      for (let c of colIndices) {
        if (r < 5 && c < 5) {
          matches.push(matrix[r][c]);
        }
      }
    }

    if (matches.length === 0) {
      result += "?";
    } else if (matches.length === 1) {
      result += matches[0];
    } else {
      result += `(${matches.join("/")})`;
    }
  }

  return result;
};

export const atbashCipher = (text) => {
  return text
    .split("")
    .map((char) => {
      const isUpper = /[A-Z]/.test(char);
      const isLower = /[a-z]/.test(char);
      const code = char.charCodeAt(0);

      if (isUpper) return String.fromCharCode(90 - (code - 65)); // A=65 ↔ Z=90
      if (isLower) return String.fromCharCode(122 - (code - 97)); // a=97 ↔ z=122
      return char;
    })
    .join("");
};





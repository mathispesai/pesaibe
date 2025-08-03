// utils/cipherUtils/substitution.js

export const caesarCipher = (text, shift = 1) => {
  return text.replace(/[a-z]/gi, (char) => {
    const start = char === char.toUpperCase() ? 65 : 97;
    return String.fromCharCode((char.charCodeAt(0) - start + shift + 26) % 26 + start);
  });
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
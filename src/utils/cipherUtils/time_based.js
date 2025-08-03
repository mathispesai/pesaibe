// utils/cipherUtils/timeBasedCiphers.js

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
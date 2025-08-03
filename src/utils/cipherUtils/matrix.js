// utils/cipherUtils/matrix.js

// Polybius Square
const polybiusMatrix = [
  ["A", "B", "C", "D", "E"],
  ["F", "G", "H", "I", "J"],
  ["K", "L", "M", "N", "O"],
  ["P", "R", "S", "T", "U"],
  ["V", "W", "X", "Y", "Z"]
];

const polybiusMap = {};
const reversePolybiusMap = {};

// Build maps for quick lookup
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
    ?.map(pair => reversePolybiusMap[pair] || "?")
    .join("") || "";
};

// Square Encoding
export const squareEncode = (text) => {
  const clean = text.toUpperCase().replace(/[^A-Z]/g, "");
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

// Tralie (Rail Fence) Cipher
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
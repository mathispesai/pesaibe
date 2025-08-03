// utils/cipherUtils/kijkKleur.js

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
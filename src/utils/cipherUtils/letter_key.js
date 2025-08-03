// utils/cipherUtils/letterKey.js

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
// utils/cipherUtils/letterNumber.js

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
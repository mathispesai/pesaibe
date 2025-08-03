// utils/cipherUtils/windrose.js

const windroseMap = {
  A: "NNNO", B: "NONNO", C: "NOONO", D: "OONO", E: "OOZO",
  F: "ZOOZO", G: "ZOZZO", H: "ZZZO", I: "ZZZW", J: "ZWZZW",
  K: "ZWWZW", L: "WWZW", M: "WWNW", N: "NWWNW", O: "NWNNW",
  P: "NNNW", Q: "NNNO*", R: "NONNO*", S: "NOONO*", T: "OONO*",
  U: "OOZO*", V: "ZOOZO*", W: "ZOZZO*", X: "ZZZO*", Y: "ZZZW*",
  Z: "ZWZZW*"
};

const windroseReverseMap = Object.fromEntries(
  Object.entries(windroseMap).map(([letter, code]) => [code, letter])
);

export const windrose = (text) => {
  return text.toUpperCase()
    .split(" ")
    .map(word => word
      .split("")
      .map(letter => windroseMap[letter] || letter)
      .join("."))
    .join(" / ");
};

export const windroseDecode = (cipherText) => {
  return cipherText
    .split(" / ") // Woordsegmenten
    .map(word =>
      word
        .split(".") // Lettersegmenten
        .map(code => windroseReverseMap[code] || "?")
        .join("")
    )
    .join(" ");
};
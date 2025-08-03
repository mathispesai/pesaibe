// utils/cipherUtils/morse.js

const morseMap = {
  a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".",
  f: "..-.", g: "--.", h: "....", i: "..", j: ".---",
  k: "-.-", l: ".-..", m: "--", n: "-.", o: "---",
  p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-",
  u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--",
  z: "--..", 0: "-----", 1: ".----", 2: "..---",
  3: "...--", 4: "....-", 5: ".....", 6: "-....",
  7: "--...", 8: "---..", 9: "----."
};

const morseReverseMap = Object.fromEntries(
  Object.entries(morseMap).map(([k, v]) => [v, k])
);

export const morseEncode = (text) => {
  return text
    .toLowerCase()
    .split(" ")
    .map(word =>
      word
        .split("")
        .map(c => morseMap[c] || "")
        .join(" ")
    )
    .join(" / ");
};

export const morseDecode = (code) => {
  return code
    .split(" / ")
    .map(word =>
      word
        .trim()
        .split(/\s+/)
        .map(signal => morseReverseMap[signal] || "?")
        .join("")
    )
    .join(" ");
};
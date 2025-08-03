// utils/cipherUtils/text_manipulation.js

export const reverseWords = (text) => {
  return text.split(" ").map(word => word.split("").reverse().join(""))
    .join(" ");
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
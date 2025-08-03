// utils/cipherUtils/utility.js

export const splitChunks = (text, chunks = 3) => {
  const clean = text.trim();
  const partSize = Math.ceil(clean.length / chunks);
  const parts = [];

  for (let i = 0; i < clean.length; i += partSize) {
    parts.push(clean.slice(i, i + partSize));
  }

  return parts;
};
// utils/cipherUtils/time_based.js

export const yearMethodEncode = (text, year = "1979") => {
  try {
    // Input validation
    if (!text || typeof text !== 'string') {
      console.warn('yearMethodEncode: Invalid text input');
      return '';
    }

    if (!year || typeof year !== 'string') {
      console.warn('yearMethodEncode: Invalid year input, using default 1979');
      year = "1979";
    }

    // Clean and validate year
    const cleanYear = year.replace(/[^0-9]/g, '');
    if (!cleanYear || cleanYear.length === 0) {
      console.warn('yearMethodEncode: No valid digits in year, using default 1979');
      year = "1979";
    } else {
      year = cleanYear;
    }

    // Prevent infinite loops with zero digits
    const yearDigits = year.split("").map(Number).filter(digit => digit > 0);
    if (yearDigits.length === 0) {
      console.warn('yearMethodEncode: All year digits are zero, using default 1979');
      year = "1979";
      yearDigits.push(1, 9, 7, 9);
    }

    const clean = text.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (!clean) {
      console.warn('yearMethodEncode: No valid characters in text');
      return '';
    }

    let rows = [];
    let i = 0;
    let safetyCounter = 0;
    const maxIterations = Math.ceil(clean.length * 2); // Safety limit

    while (i < clean.length && safetyCounter < maxIterations) {
      for (const digit of yearDigits) {
        if (i >= clean.length) break;

        const slice = clean.slice(i, i + digit).padEnd(digit, "X");
        rows.push(slice);
        i += digit;

        safetyCounter++;
        if (safetyCounter >= maxIterations) {
          console.warn('yearMethodEncode: Safety counter reached, breaking loop');
          break;
        }
      }
    }

    if (rows.length === 0) {
      return clean; // Fallback to original text
    }

    const maxLen = Math.max(...rows.map(r => r.length));
    let result = "";

    for (let col = 0; col < maxLen; col++) {
      for (let row = 0; row < rows.length; row++) {
        if (rows[row] && rows[row][col]) {
          result += rows[row][col];
        }
      }
    }

    return result;

  } catch (error) {
    console.error('yearMethodEncode error:', error);
    return text || ''; // Fallback to original input
  }
};

export const yearMethodDecode = (cipher, year = "1979") => {
  try {
    // Input validation
    if (!cipher || typeof cipher !== 'string') {
      console.warn('yearMethodDecode: Invalid cipher input');
      return '';
    }

    if (!year || typeof year !== 'string') {
      console.warn('yearMethodDecode: Invalid year input, using default 1979');
      year = "1979";
    }

    // Clean and validate year
    const cleanYear = year.replace(/[^0-9]/g, '');
    if (!cleanYear || cleanYear.length === 0) {
      console.warn('yearMethodDecode: No valid digits in year, using default 1979');
      year = "1979";
    } else {
      year = cleanYear;
    }

    // Prevent infinite loops with zero digits
    const yearDigits = year.split("").map(Number).filter(digit => digit > 0);
    if (yearDigits.length === 0) {
      console.warn('yearMethodDecode: All year digits are zero, using default 1979');
      yearDigits.push(1, 9, 7, 9);
    }

    const totalLength = cipher.length;
    if (totalLength === 0) {
      return '';
    }

    // Bepaal aantal blokken en kolombreedte
    let blockSizes = [];
    let i = 0;
    let safetyCounter = 0;
    const maxIterations = Math.ceil(totalLength * 2); // Safety limit

    while (i < totalLength && safetyCounter < maxIterations) {
      for (const digit of yearDigits) {
        if (i >= totalLength) break;
        blockSizes.push(digit);
        i += digit;

        safetyCounter++;
        if (safetyCounter >= maxIterations) {
          console.warn('yearMethodDecode: Safety counter reached, breaking loop');
          break;
        }
      }
    }

    if (blockSizes.length === 0) {
      return cipher; // Fallback to original cipher
    }

    const maxLen = Math.max(...blockSizes);
    const rows = blockSizes.length;

    // Maak lege matrix
    let matrix = Array.from({ length: rows }, () => Array(maxLen).fill(""));

    // Vul kolomsgewijs
    let c = 0;
    for (let col = 0; col < maxLen; col++) {
      for (let row = 0; row < rows; row++) {
        if (matrix[row] &&
          matrix[row].length > col &&
          blockSizes[row] > col &&
          c < totalLength) {
          matrix[row][col] = cipher[c++];
        }
      }
    }

    // Construeer originele tekst en verwijder padding
    const result = matrix
      .map((row, i) => row.slice(0, blockSizes[i]).join(""))
      .join("")
      .replace(/X+$/, ''); // Remove trailing X padding

    return result;

  } catch (error) {
    console.error('yearMethodDecode error:', error);
    return cipher || ''; // Fallback to original input
  }
};
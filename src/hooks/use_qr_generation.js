// hooks/use_qr_generation.js
import { useState, useEffect } from 'react';
import QRCodeLib from 'qrcode';

export const useQRGeneration = (chunkParts) => {
  const [qrImages, setQrImages] = useState([]);

  // Centrale functie om QR als PNG-dataURL te maken
  const generateQRDataUrl = async (text, size = 128) => {
    const canvas = document.createElement("canvas");
    await QRCodeLib.toCanvas(canvas, text, { width: size, margin: 1 });
    return canvas.toDataURL("image/png");
  };

  useEffect(() => {
    const makeQRCodes = async () => {
      const urls = await Promise.all(
        chunkParts.map((part) => generateQRDataUrl(part, 128))
      );
      setQrImages(urls);
    };

    if (chunkParts.length > 0) {
      makeQRCodes();
    } else {
      setQrImages([]);
    }
  }, [chunkParts]);

  return { qrImages, generateQRDataUrl };
};
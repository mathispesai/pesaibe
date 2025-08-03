// hooks/use_pdf_generation.js
import { useCallback } from 'react';
import jsPDF from "jspdf";
import QRCodeLib from 'qrcode';
import { cipherOptions } from '../config/cipher_options.js';
import { brailleBase64 } from "../utils/pdfFonts/braille.js";
import { chinoisBase64 } from "../utils/pdfFonts/chinois.js";
import { raamBase64 } from "../utils/pdfFonts/raam.js";
import { dancingmenBase64 } from "../utils/pdfFonts/dancingmen.js";
import { semaphoreflagsBase64 } from "../utils/pdfFonts/semaphoreflags.js";
import { hieroglyphsBase64 } from "../utils/pdfFonts/hieroglyphs.js";

export const usePDFGeneration = () => {
  // Centrale functie om QR als PNG-dataURL te maken
  const generateQRDataUrl = async (text, size = 128) => {
    const canvas = document.createElement("canvas");
    await QRCodeLib.toCanvas(canvas, text, { width: size, margin: 1 });
    return canvas.toDataURL("image/png");
  };

  const downloadPDF = useCallback(async ({
    input,
    output,
    method,
    shift,
    year,
    codeword,
    skip,
    kijkwoord,
    kleurwoord,
    chunkParts,
    qrImages
  }) => {
    const pdf = new jsPDF();

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(16);
    pdf.text("Geheimschrift Resultaat", 10, 10);

    pdf.setFontSize(12);
    pdf.text(`Originele tekst: ${input || "-"}`, 10, 20);

    // Zoek label bij de gekozen methode
    const selectedOption = cipherOptions.find(opt => opt.value === method);
    let methodeTekst = selectedOption ? selectedOption.label : method;

    // Extra info toevoegen per methode
    switch (method) {
      case "codewordEncodeDecode":
        methodeTekst += ` (Codewoord: ${codeword || "-"})`;
        break;
      case "caesarCipher":
        methodeTekst += ` (Shift: ${shift})`;
        break;
      case "letterskip":
      case "letterskipDecode":
        methodeTekst += ` (Sleutelgetal: ${skip})`;
        break;
      case "tralieEncode":
      case "tralieDecode":
        methodeTekst += ` (Aantal rijen: ${skip})`;
        break;
      case "yearmethodEncode":
      case "yearmethodDecode":
        methodeTekst += ` (Jaartal: ${year || "-"})`;
        break;
      case "kijkKleurEncode":
      case "kijkKleurDecode":
        methodeTekst += ` (Kijkwoord, Kleurwoord: ${kijkwoord} , ${kleurwoord})`;
        break;
      default:
        break;
    }

    pdf.text(`Methode: ${methodeTekst}`, 10, 30);
    pdf.text("Versleutelde tekst:", 10, 40);

    // Font handling
    let outputFontUsed = false;
    if (method.includes("brailleFont")) {
      pdf.addFileToVFS("braille.ttf", brailleBase64);
      pdf.addFont("braille.ttf", "braille", "normal");
      pdf.setFont("braille", "normal");
      outputFontUsed = true;
    } else if (method.includes("raamFont")) {
      pdf.addFileToVFS("raam.ttf", raamBase64);
      pdf.addFont("raam.ttf", "raam", "normal");
      pdf.setFont("raam", "normal");
      outputFontUsed = true;
    } else if (method.includes("chinoisFont")) {
      pdf.addFileToVFS("chinois.ttf", chinoisBase64);
      pdf.addFont("chinois.ttf", "chinois", "normal");
      pdf.setFont("chinois", "normal");
      outputFontUsed = true;
    } else if (method.includes("dancingmenFont")) {
      pdf.addFileToVFS("dancingmen.ttf", dancingmenBase64);
      pdf.addFont("dancingmen.ttf", "dancingmen", "normal");
      pdf.setFont("dancingmen", "normal");
      outputFontUsed = true;
    } else if (method.includes("hieroglyphsFont")) {
      pdf.addFileToVFS("hieroglyphs.ttf", hieroglyphsBase64);
      pdf.addFont("hieroglyphs.ttf", "hieroglyphs", "normal");
      pdf.setFont("hieroglyphs", "normal");
      outputFontUsed = true;
    } else if (method.includes("semaphoreflagsFont")) {
      pdf.addFileToVFS("semaphoreflags.ttf", semaphoreflagsBase64);
      pdf.addFont("semaphoreflags.ttf", "semaphoreflags", "normal");
      pdf.setFont("semaphoreflags", "normal");
      outputFontUsed = true;
    } else {
      pdf.setFont("helvetica", "normal");
    }

    // Content generation
    let y = 50;

    if (method === "splitChunks" && chunkParts.length > 0) {
      pdf.text("Opgedeeld in blokken:", 10, y);
      y += 10;

      for (let i = 0; i < chunkParts.length; i++) {
        const part = chunkParts[i];
        pdf.text(`Blok ${i + 1}:`, 10, y);
        y += 6;

        const imgData = await generateQRDataUrl(part, 100);
        pdf.addImage(imgData, "PNG", 10, y, 40, 40); // QR links
        pdf.setFontSize(10);
        pdf.text(pdf.splitTextToSize(part, 140), 55, y + 5); // tekst rechts
        y += 45;
      }
    } else {
      if (method.includes("raamFont")) {
        const cellWidth = 12;   // afstand tussen symbolen
        const cellHeight = 14;  // afstand tussen regels
        const maxCols = 15;     // max aantal symbolen per regel

        let col = 0;
        let row = 0;

        for (const char of (output || "-")) {
          if (char === "\n") {
            row++;
            col = 0;
            continue;
          }
          pdf.text(char, 10 + col * cellWidth, y + row * cellHeight);
          col++;
          if (col >= maxCols) {
            col = 0;
            row++;
          }
        }
      } else {
        const splitOutput = pdf.splitTextToSize(output || "-", 180);
        pdf.text(splitOutput, 10, y);
      }
    }

    // Reset font
    if (outputFontUsed) {
      pdf.setFont("helvetica", "normal");
    }

    pdf.save("geheimschrift.pdf");
  }, []);

  return { downloadPDF };
};
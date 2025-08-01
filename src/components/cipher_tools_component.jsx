import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import '../styles/global.css';
import QRCodeS from "qrcode";
import CipherExplanation from "./cipherExplanation.jsx";
import {
  caesarCipher, codewordEncodeDecode, letterKeyDecode, letterKeyEncode, letterToNumber,
  morseDecode,
  morseEncode,
  numberToLetter, polybiusDecode, polybiusEncode, reverseWords, squareDecode, squareEncode, tralieDecode,
  traliePattern, windrose,
  windroseDecode, yearMethodDecode,
  yearMethodEncode, asciiDecode, asciiEncode, hexDecode, hexEncode, upsideDown, splitChunks, kijkKleurEncode, kijkKleurDecode, atbashCipher
} from "../utils/cipherUtils/cipher_utils_module.js";
import { brailleBase64 } from "../utils/pdfFonts/braille.js";
import { chinoisBase64 } from "../utils/pdfFonts/chinois.js";
import { raamBase64 } from "../utils/pdfFonts/raam.js";
import { dancingmenBase64 } from "../utils/pdfFonts/dancingmen.js";
import { semaphoreflagsBase64 } from "../utils/pdfFonts/semaphoreflags.js";
import { hieroglyphsBase64 } from "../utils/pdfFonts/hieroglyphs.js";

const cipherOptions = [
  { label: "Woorden omkeren", value: "reverseWords" },
  { label: "Caesarverschuiving", value: "caesarCipher" },
  { label: "letters omzetten naar Cijfers (A=1, B=2)", value: "letterToNumber" },
  { label: "Cijfers omzetten tot Letters", value: "numberToLetter" },
  { label: "Morsecode (versleutel)", value: "morseEncode" },
  { label: "Morsecode (ontsleutel)", value: "morseDecode" },
  { label: "Lettersleutel (elke nth letter)", value: "letterskip" },
  { label: "Jaartalmethode (versleutel)", value: "yearmethodEncode" },
  { label: "Jaartalmethode (ontsleutel)", value: "yearmethodDecode" },
  { label: "Vervangingscode (A↔Z)", value: "atbashCipher" },
  { label: "Windroosmethode", value: "windrose" },
  { label: "Codewoordsubstitutie (versleutelen/ontsleuteleen)", value: "codewordEncodeDecode" },
  { label: "Windroosmethode (ontsleutelen)", value: "windroseDecode" },
  { label: "Lettersleutel (ontsleutelen)", value: "letterskipDecode" },
  { label: "Vierkantcodering (versleutelen)", value: "squareEncode" },
  { label: "Vierkantcodering (ontsleutelen)", value: "squareDecode" },
  { label: "Matrixschrift (Polybius)", value: "polybiusEncode" },
  { label: "Matrixschrift (ontsleutelen)", value: "polybiusDecode" },
  { label: "Tralieschrift (versleutelen)", value: "tralieEncode" },
  { label: "Tralieschrift (ontsleutelen)", value: "tralieDecode" },
  { label: "Braille (versleutelen)", value: "brailleFontEncode" },
  { label: "Braille (ontsleutelen)", value: "brailleFontDecode" },
  { label: "Raam (versleutelen)", value: "raamFontEncode" },
  { label: "Raam (ontsleutelen)", value: "raamFontDecode" },
  { label: "Chinois (versleutelen)", value: "chinoisFontEncode" },
  { label: "Chinois (ontsleutelen)", value: "chinoisFontDecode" },
  { label: "Dancingmen (versleutelen)", value: "dancingmenFontEncode" },
  { label: "Dancingmen (ontsleutelen)", value: "dancingmenFontDecode" },
  { label: "Hieroglyphs (versleutelen)", value: "hieroglyphsFontEncode" },
  { label: "Hieroglyphs (ontsleutelen)", value: "hieroglyphsFontDecode" },
  { label: "Semaphoreflags (versleutelen)", value: "semaphoreflagsFontEncode" },
  { label: "Semaphoreflags (ontsleutelen)", value: "semaphoreflagsFontDecode" },
  { label: "ASCII-code (versleutelen)", value: "asciiEncode" },
  { label: "ASCII-code (ontsleutelen)", value: "asciiDecode" },
  { label: "Hexadecimaal (versleutelen)", value: "hexEncode" },
  { label: "Hexadecimaal (ontsleutelen)", value: "hexDecode" },
  { label: "Tekst ondersteboven", value: "upsideDown" },
  { label: "Tekst opdelen in blokken met QR", value: "splitChunks" },
  { label: "Kijk-Kleur methode (encode)", value: "kijkKleurEncode" },
  { label: "Kijk-Kleur methode (decode)", value: "kijkKleurDecode" },


];


export default function CipherTools() {
  const [input, setInput] = useState("");
  const [method, setMethod] = useState("reverseWords");
  const [output, setOutput] = useState("");
  const [shift, setShift] = useState(3);
  const resultRef = useRef();
  const [year, setYear] = useState("1979");
  const [codeword, setCodeword] = useState("");
  const [skip, setSkip] = useState(1);
  const [wordList, setWordList] = useState([]);
  const [outputFont, setOutputFont] = useState("");
  const [chunkCount, setChunkCount] = useState(3);
  const [chunkParts, setChunkParts] = useState([]);
  const [kijkwoord, setKijkwoord] = useState("KIJK-");
  const [kleurwoord, setKleurwoord] = useState("KLEUR");




  useEffect(() => {
    fetch("/wordlist.txt")
      .then(res => res.text())
      .then(text => {
        const words = text.split("\n").map(w => w.trim()).filter(Boolean);
        console.log("Eerste woorden uit lijst:", words.slice(0, 5));
        setWordList(words);
      });
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleConvert();
    }, 300); // wacht 300ms na laatste wijziging

    return () => clearTimeout(timeout); // voorkom te vroege uitvoer bij snelle wijzigingen
  }, [input, method, shift, year, codeword, skip, chunkCount, kijkwoord, kleurwoord, wordList]);


  const handleConvert = () => {
    console.log("Input:", input);
    console.log("Gekozen methode:", method);

    let result = "";
    if (method === "brailleFontEncode") {
      setOutputFont("BrailleFont");
      result = input;
    } else if (method === "brailleFontDecode") {
      setOutputFont("");
      result = input; // hier kun je later echte decode-logica zetten
    } else if (method === "raamFontEncode") {
      setOutputFont("RaamFont");
      result = input;
    } else if (method === "raamFontDecode") {
      setOutputFont("");
      result = input;
    } else if (method === "chinoisFontEncode") {
      setOutputFont("ChinoisFont");
      result = input;
    } else if (method === "chinoisFontDecode") {
      setOutputFont("");
      result = input;
    } else if (method === "dancingmenFontEncode") {
      setOutputFont("DancingMenFont");
      result = input;
    } else if (method === "dancingmenFontDecode") {
      setOutputFont("");
      result = input;
    } else if (method === "hieroglyphsFontEncode") {
      setOutputFont("HieroglyphsFont");
      result = input;
    } else if (method === "hieroglyphsFontDecode") {
      setOutputFont("");
      result = input;
    } else if (method === "semaphoreflagsFontEncode") {
      setOutputFont("SemaphoreFlagsFont");
      result = input;
    } else if (method === "semaphoreflagsFontDecode") {
      setOutputFont("");
      result = input;
    } else {
      setOutputFont(""); // reset font
      // ... bestaande cipher logic ...

      if (method === "letterskip") {
        if (wordList.length === 0) {
          setOutput("Woordenlijst nog niet geladen...");
          return;
        }
        result = letterKeyEncode(input, skip, wordList);
      } else {
        switch (method) {
          case "reverseWords":
            result = reverseWords(input);
            break;
          case "caesarCipher":
            result = caesarCipher(input, shift);
            break;
          case "letterToNumber":
            result = letterToNumber(input);
            break;
          case "numberToLetter":
            result = numberToLetter(input);
            break;
          case "morseEncode":
            result = morseEncode(input);
            break;
          case "morseDecode":
            result = morseDecode(input);
            break;
          case "yearmethodEncode":
            result = yearMethodEncode(input, year);
            break;
          case "yearmethodDecode":
            result = yearMethodDecode(input, year);
            break;
          case "codewordEncodeDecode":
            result = codewordEncodeDecode(input, codeword);
            break;
          case "windrose":
            result = windrose(input);
            break;
          case "windroseDecode":
            result = windroseDecode(input);
            break;
          case "letterskipDecode":
            result = letterKeyDecode(input, skip);
            break;
          case "squareEncode":
            result = squareEncode(input);
            break;
          case "squareDecode":
            result = squareDecode(input);
            break;
          case "polybiusEncode":
            result = polybiusEncode(input);
            break;
          case "polybiusDecode":
            result = polybiusDecode(input);
            break;
          case "tralieEncode":
            result = traliePattern(input, skip);
            break;
          case "tralieDecode":
            result = tralieDecode(input, skip);
            break;
          case "asciiEncode":
            result = asciiEncode(input);
            break;
          case "asciiDecode":
            result = asciiDecode(input);
            break;
          case "hexEncode":
            result = hexEncode(input);
            break;
          case "hexDecode":
            result = hexDecode(input);
            break;
          case "upsideDown":
            result = upsideDown(input);
            break;
          case "splitChunks":
            const parts = splitChunks(input, chunkCount);
            setChunkParts(parts);
            result = parts.join("\n\n");
            break;
          case "kijkKleurEncode":
            result = kijkKleurEncode(input, kijkwoord, kleurwoord);
            break;
          case "kijkKleurDecode":
            result = kijkKleurDecode(input, kijkwoord, kleurwoord);
            break;
          case "atbashCipher":
            result = atbashCipher(input);
            break;

          default:
            result = "Methode niet geïmplementeerd.";
        }
      }
    }
    console.log("Output:", result);
    setOutput(result);
  };


  const downloadPDF = () => {
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
        methodeTekst += ` (Sleutelgetal: ${skip})`;
        break;
      case "letterskipDecode":
        methodeTekst += ` (Sleutelgetal: ${skip})`;
        break;

      case "tralieEncode":
        methodeTekst += ` (Aantal rijen: ${skip})`;
        break;
      case "tralieDecode":
        methodeTekst += ` (Aantal rijen: ${skip})`;
        break;

      case "yearmethodEncode":
        methodeTekst += ` (Jaartal: ${year || "-"})`;
        break;
      case "yearmethodDecode":
        methodeTekst += ` (Jaartal: ${year || "-"})`;
        break;

      case "KijkKleurEncode":
        methodeTekst += ` (Kijkwoord, Kleurwoord: ${kijkwoord} , ${kleurwoord})`;
        break;
      case "kijkKleurDecode":
        methodeTekst += ` (Kijkwoord, Kleurwoord: ${kijkwoord} , ${kleurwoord})`;
        break;

      default:
        // Geen extra info nodig
        break;
    }

    pdf.text(`Methode: ${methodeTekst}`, 10, 30);
    pdf.text("Versleutelde tekst:", 10, 40);

    // Alleen het output-gedeelte in speciaal font (indien van toepassing)
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

    // Uitvoer toevoegen
    let y = 50;

    if (method === "splitChunks" && chunkParts.length > 0) {
      pdf.text("Opgedeeld in blokken:", 10, y);
      y += 10;

      chunkParts.forEach((part, index) => {
        pdf.text(`Blok ${index + 1}:`, 10, y);
        y += 6;

        // QR-code genereren
        const canvas = document.createElement("canvas");
        const qr = new QRCodeS(canvas, {
          text: part,
          width: 100,
          height: 100,
        });
        const imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, "PNG", 10, y, 40, 40); // QR op de linkerkant
        pdf.setFontSize(10);
        pdf.text(pdf.splitTextToSize(part, 140), 55, y + 5); // tekst rechts van QR
        y += 45;
      });
    } else {
      // Standaard output
      const splitOutput = pdf.splitTextToSize(output || "-", 180);
      pdf.text(splitOutput, 10, y);
    }


    // Font terugzetten als er speciaal font was
    if (outputFontUsed) {
      pdf.setFont("helvetica", "normal");
    }

    pdf.save("geheimschrift.pdf");
  };


  return (
    <div className="space-y-4">
      <textarea
        className="w-full border p-2 rounded"
        rows="4"
        placeholder="Voer tekst in"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          fontFamily:
            // Alleen font tonen als we in "decodeer"-modus zitten
            method === "brailleFontDecode"
              ? "'BrailleFont', sans-serif"
              : method === "raamFontDecode"
                ? "'RaamFont', sans-serif"
                : method === "chinoisFontDecode"
                  ? "'ChinoisFont', sans-serif"
                  : method === "dancingmenFontDecode"
                    ? "'DancingMenFont', sans-serif"
                    : method === "hieroglyphsFontDecode"
                      ? "'HieroglyphsFont', sans-serif"
                      : method === "semaphoreflagsFontDecode"
                        ? "'SemaphoreFlagsFont', sans-serif"
                        : "inherit"
        }}
      ></textarea>


      <div className="flex flex-wrap items-center gap-4">
        <select
          className="w-full border p-2"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          {cipherOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {method === "caesarCipher" && (
          <input
            type="number"
            min="-25"
            max="25"
            className="border p-2 w-20"
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value))}
          />
        )}

        {(method === "letterskip" || method === "letterskipDecode") && (
          <input
            type="number"
            className="border p-2 w-24"
            placeholder="Sleutelgetal"
            value={skip}
            onChange={(e) => setSkip(parseInt(e.target.value))}
          />
        )}
        {(method === "tralieEncode" || method === "tralieDecode") && (
          <input
            type="number"
            className="border p-2 w-24"
            placeholder="Aantal rijen"
            value={skip}
            onChange={(e) => setSkip(parseInt(e.target.value))}
          />
        )}

        {method === "yearmethodEncode" || method === "yearmethodDecode" ? (
          <input
            className="border p-2"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Jaartal (bv. 2159)"
          />
        ) : null}

        {(method === "codewordEncodeDecode") && (
          <input
            type="text"
            className="border p-2"
            placeholder="Codewoord (bv. PARKBOCHT)"
            value={codeword}
            onChange={(e) => setCodeword(e.target.value)}
          />
        )}

        {method === "splitChunks" && (
          <input
            type="number"
            min={1}
            className="border p-2 w-24"
            placeholder="Aantal blokken"
            value={chunkCount}
            onChange={(e) => setChunkCount(parseInt(e.target.value))}
          />
        )}

        {(method === "kijkKleurEncode" || method === "kijkKleurDecode") && (
          <>
            <input
              type="text"
              className="border p-2 w-32"
              placeholder="Kijkwoord (bv. KIJK-)"
              value={kijkwoord}
              onChange={(e) => setKijkwoord(e.target.value.toUpperCase())}
            />
            <input
              type="text"
              className="border p-2 w-32"
              placeholder="Kleurwoord (bv. KLEUR)"
              value={kleurwoord}
              onChange={(e) => setKleurwoord(e.target.value.toUpperCase())}
            />
          </>
        )}
      </div>

      <div ref={resultRef}>
        <label className="block font-medium mb-1">Resultaat:</label>
        <textarea
          className="w-full border p-2 rounded bg-gray-100"
          style={{ fontFamily: outputFont ? `'${outputFont}', sans-serif` : "inherit" }}
          rows="4"
          readOnly
          value={output}
        />
        {method === "splitChunks" && chunkParts.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">QR-codes per blok:</h2>
            <div className="flex flex-wrap gap-6">
              {chunkParts.map((part, idx) => (
                <div
                  key={idx}
                  className="w-[140px] flex flex-col items-center border p-4 bg-white rounded shadow-sm"
                >
                  <QRCode value={part} size={128} />
                  <p className="text-sm text-gray-600 mt-2">Blok {idx + 1}</p>
                </div>
              ))}
            </div>
          </div>

        )}

      </div>

      {output && (
        <div className="flex gap-4 items-center">
          <div className="border p-4 bg-white">
            <QRCode value={output} size={128} />
          </div>
          <button
            onClick={downloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download als PDF
          </button>
        </div>
      )}
      <CipherExplanation
        method={method}
        input={input}
        year={year}
        skip={skip}
        shift={shift}
        wordList={wordList}
      />

    </div>
  );
}

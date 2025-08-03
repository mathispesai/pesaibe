// components/CipherTools.jsx (Refactored)
import { useEffect, useState } from "react";
import '../styles/global.css';

// Components
import CipherInput from "./cipher/Cipher_Input.jsx";
import CipherSelector from "./cipher/Cipher_Selector.jsx";
import CipherOutput from "./cipher/Cipher_Output.jsx";
import CipherExplanation from "./cipherExplanation.jsx";

// Hooks
import { useCipherConversion } from "../hooks/use_cipher_conversion.js";
import { useQRGeneration } from "../hooks/use_qr_generation.js";
import { usePDFGeneration } from "../hooks/use_pdf_generation.js";

export default function CipherTools() {
  // State
  const [input, setInput] = useState("");
  const [method, setMethod] = useState("reverseWords");
  const [output, setOutput] = useState("");
  const [outputFont, setOutputFont] = useState("");
  const [chunkParts, setChunkParts] = useState([]);
  const [wordList, setWordList] = useState([]);

  // Parameters for different cipher methods
  const [shift, setShift] = useState(3);
  const [year, setYear] = useState("1979");
  const [codeword, setCodeword] = useState("");
  const [skip, setSkip] = useState(1);
  const [chunkCount, setChunkCount] = useState(3);
  const [kijkwoord, setKijkwoord] = useState("KIJK-");
  const [kleurwoord, setKleurwoord] = useState("KLEUR");

  // Custom hooks
  const { convertText } = useCipherConversion();
  const { qrImages } = useQRGeneration(chunkParts);
  const { downloadPDF } = usePDFGeneration();

  // Load word list
  useEffect(() => {
    fetch("/wordlist.txt")
      .then(res => res.text())
      .then(text => {
        const words = text.split("\n").map(w => w.trim()).filter(Boolean);
        console.log("Eerste woorden uit lijst:", words.slice(0, 5));
        setWordList(words);
      });
  }, []);

  // Auto-convert when parameters change
  useEffect(() => {
    const timeout = setTimeout(() => {
      handleConvert();
    }, 300); // wacht 300ms na laatste wijziging

    return () => clearTimeout(timeout);
  }, [input, method, shift, year, codeword, skip, chunkCount, kijkwoord, kleurwoord, wordList]);

  const handleConvert = () => {
    const conversionParams = {
      shift, year, codeword, skip, chunkCount, kijkwoord, kleurwoord, wordList
    };

    const { result, font, chunkParts: newChunkParts } = convertText(
      input, 
      method, 
      conversionParams
    );

    setOutput(result);
    setOutputFont(font || "");
    
    if (newChunkParts) {
      setChunkParts(newChunkParts);
    } else {
      setChunkParts([]);
    }
  };

  const handleDownloadPDF = () => {
    downloadPDF({
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
    });
  };

  return (
    <div className="space-y-4">
      <CipherInput 
        input={input} 
        setInput={setInput} 
        method={method} 
      />

      <CipherSelector
        method={method}
        setMethod={setMethod}
        shift={shift}
        setShift={setShift}
        year={year}
        setYear={setYear}
        codeword={codeword}
        setCodeword={setCodeword}
        skip={skip}
        setSkip={setSkip}
        chunkCount={chunkCount}
        setChunkCount={setChunkCount}
        kijkwoord={kijkwoord}
        setKijkwoord={setKijkwoord}
        kleurwoord={kleurwoord}
        setKleurwoord={setKleurwoord}
      />

      <CipherOutput 
        output={output}
        outputFont={outputFont}
        method={method}
        chunkParts={chunkParts}
        qrImages={qrImages}
        onDownloadPDF={handleDownloadPDF}
      />

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
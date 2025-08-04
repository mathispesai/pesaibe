import { useState, useEffect, useRef } from 'react';
import { useCipherConversion } from './use_cipher_conversion.js';

const INITIAL_PARAMETERS = {
    shift: 3, year: "1979", codeword: "", skip: 1, chunkCount: 3,
    kijkwoord: "KIJK-", kleurwoord: "KLEUR"
};

export const useCipherState = () => {
    // Core state
    const [selectedMethod, setSelectedMethod] = useState("reverseWords");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [outputFont, setOutputFont] = useState("");
    const [chunkParts, setChunkParts] = useState([]);
    const [parameters, setParameters] = useState(INITIAL_PARAMETERS);
    const [wordList, setWordList] = useState([]);

    const { convertText } = useCipherConversion();
    const conversionTimeoutRef = useRef(null);

    // Load word list - only in browser
    useEffect(() => {
        if (typeof window === 'undefined') return;

        fetch("/wordlist.txt")
            .then(res => res.text())
            .then(text => setWordList(text.split("\n").map(w => w.trim()).filter(Boolean)))
            .catch(() => console.log("Wordlist not found"));
    }, []);

    // Conversion effect with parameter validation
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Clear existing timeout
        if (conversionTimeoutRef.current) {
            clearTimeout(conversionTimeoutRef.current);
        }

        conversionTimeoutRef.current = setTimeout(() => {
            if (!input || input.trim() === '') {
                setOutput("");
                setOutputFont("");
                setChunkParts([]);
                return;
            }

            try {
                // Parameter validation to prevent crashes
                const safeParameters = { ...parameters, wordList };

                // Fix for yearmethodEncode/Decode - provide default year if empty
                if ((selectedMethod === 'yearmethodEncode' || selectedMethod === 'yearmethodDecode') && !safeParameters.year) {
                    safeParameters.year = '1979';
                }

                // Fix for codewordEncodeDecode - provide default if empty
                if (selectedMethod === 'codewordEncodeDecode' && !safeParameters.codeword) {
                    safeParameters.codeword = 'PARKBOCHT';
                }

                const result = convertText(input.trim(), selectedMethod, safeParameters);

                if (!result) {
                    setOutput("");
                    setOutputFont("");
                    setChunkParts([]);
                    return;
                }

                const { result: finalResult, font, chunkParts: newChunkParts } = result;

                setOutput(finalResult || "");
                setOutputFont(font || "");
                setChunkParts(newChunkParts || []);

            } catch (error) {
                console.error('Conversion error:', error);
                setOutput("Error tijdens conversie: " + error.message);
                setOutputFont("");
                setChunkParts([]);
            }
        }, 500);

        return () => {
            if (conversionTimeoutRef.current) {
                clearTimeout(conversionTimeoutRef.current);
            }
        };
    }, [input, selectedMethod, parameters, wordList, convertText]);

    // Simple parameter update
    const updateParameter = (key, value) => {
        setParameters(prev => ({ ...prev, [key]: value }));
    };

    const setAllParameters = (newParameters) => {
        setParameters(newParameters);
    };

    return {
        // State
        selectedMethod, setSelectedMethod,
        input, setInput,
        output, setOutput,
        outputFont, setOutputFont,
        chunkParts, setChunkParts,
        parameters, updateParameter, setAllParameters,
        wordList,

        // Computed
        hasContent: input && selectedMethod
    };
};
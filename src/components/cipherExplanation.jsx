// components/CipherExplanation.jsx
import React from "react";
import { letterKeyEncode } from "../utils/cipherUtils/cipher_utils_module.js";

export default function CipherExplanation({ method, input, year, skip, shift = skip, wordList = [] }) {
    if (!input || !method) return null;

    const cleanText = input.replace(/[^a-zA-Z]/g, "").toUpperCase();

    // --- JAARTALMETHODE ---
    if (method === "yearmethodEncode") {
        const yearDigits = (year || "1979").split("").map(Number);
        const blocks = [];
        const digitLabels = [];
        let i = 0;
        while (i < cleanText.length) {
            for (const digit of yearDigits) {
                const block = cleanText.slice(i, i + digit).padEnd(digit, "X");
                blocks.push(block);
                digitLabels.push(digit);
                i += digit;
                if (i >= cleanText.length) break;
            }
        }

        const maxLen = Math.max(...blocks.map(b => b.length));

        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Jaartalmethode</h2>
                <p className="mb-2">
                    De tekst wordt opgesplitst in blokken volgens de cijfers van het jaartal ({yearDigits.join(", ")}).
                    Daarna wordt de tekst kolomsgewijs gelezen.
                </p>

                <div className="overflow-auto">
                    <table className="table-fixed border-collapse mb-2">
                        <tbody>
                            {blocks.map((block, rowIdx) => (
                                <tr key={rowIdx}>
                                    <td className="text-right pr-2 text-sm text-gray-600">{digitLabels[rowIdx]}</td>
                                    {block.split("").map((char, colIdx) => (
                                        <td
                                            key={colIdx}
                                            className="border w-8 h-8 text-center font-mono bg-white"
                                        >
                                            {char}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="mt-2 italic text-sm text-gray-700">
                    → Resultaat ontstaat door kolommen van boven naar beneden te lezen.
                </p>
            </div>
        );
    }

    // --- TRALIESCHRIFT ---
    if (method === "tralieEncode") {
        const rows = parseInt(skip || 2);
        if (rows < 2) return <p>Minimaal 2 rijen nodig.</p>;

        const matrix = Array.from({ length: rows }, () => Array(cleanText.length).fill(" "));

        let row = 0;
        let direction = 1;
        for (let col = 0; col < cleanText.length; col++) {
            matrix[row][col] = cleanText[col];
            row += direction;
            if (row === rows - 1 || row === 0) direction *= -1;
        }

        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Tralieschrift</h2>
                <p className="mb-2">
                    De tekst beweegt zigzaggend over <strong>{rows}</strong> rijen.
                    Daarna lees je per rij uit voor het resultaat.
                </p>
                <div className="overflow-auto">
                    <table className="table-fixed border-collapse">
                        <tbody>
                            {matrix.map((rowArr, rowIdx) => (
                                <tr key={rowIdx}>
                                    {rowArr.map((char, colIdx) => (
                                        <td
                                            key={colIdx}
                                            className={`border w-8 h-8 text-center font-mono ${char !== " " ? "bg-white" : "bg-gray-200"}`}
                                        >
                                            {char}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-2 italic text-sm text-gray-700">
                    → Lees per rij voor het versleutelde resultaat.
                </p>
            </div>
        );
    }



    if (method === "polybiusEncode") {
        const polybiusMatrix = [
            ["A", "B", "C", "D", "E"],
            ["F", "G", "H", "I", "J"],
            ["K", "L", "M", "N", "O"],
            ["P", "R", "S", "T", "U"],
            ["V", "W", "X", "Y", "Z"]
        ];

        const clean = cleanText.replace(/Q/g, ""); // Q wordt vaak weggelaten
        const letterToCoord = {};
        polybiusMatrix.forEach((row, rowIndex) => {
            row.forEach((letter, colIndex) => {
                letterToCoord[letter] = `${rowIndex + 1}${colIndex + 1}`;
            });
        });

        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Polybius Matrix</h2>
                <p className="mb-2">
                    Elke letter wordt omgezet in een paar cijfers: (rij, kolom) in een 5×5-matrix.
                    De letter <strong>Q</strong> wordt overgeslagen.
                </p>

                <div className="overflow-auto mb-4">
                    <table className="table-fixed border-collapse">
                        <thead>
                            <tr>
                                <th></th>
                                {[1, 2, 3, 4, 5].map(col => (
                                    <th key={col} className="w-8 text-center text-xs">{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {polybiusMatrix.map((row, rowIdx) => (
                                <tr key={rowIdx}>
                                    <td className="text-xs text-right pr-2">{rowIdx + 1}</td>
                                    {row.map((char, colIdx) => (
                                        <td key={colIdx} className="border w-8 h-8 text-center font-mono bg-white">
                                            {char}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="font-mono text-sm mb-1">Tekst: {clean}</p>
                <p className="font-mono text-sm">
                    Codes: {clean.split("").map(c => letterToCoord[c] || "?").join(" ")}
                </p>

                <p className="mt-2 italic text-sm text-gray-700">
                    → Elke letter wordt gecodeerd als twee cijfers.
                </p>
            </div>
        );
    }

    if (method === "caesarCipher") {
        const shift = skip % 26; // skip wordt al gebruikt voor tralie etc., hergebruiken als shift
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const shifted = alphabet.map((_, i) => alphabet[(i + shift + 26) % 26]);

        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Caesarverschuiving</h2>
                <p className="mb-2">
                    Elke letter wordt verschoven met <strong>{shift}</strong> plaatsen in het alfabet.
                </p>

                <div className="overflow-auto mb-4">
                    <table className="table-fixed border-collapse text-center font-mono text-sm">
                        <thead>
                            <tr>
                                {alphabet.map((char, idx) => (
                                    <th key={idx} className="border w-6 h-6 bg-gray-200">{char}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {shifted.map((char, idx) => (
                                    <td key={idx} className="border w-6 h-6 bg-white">{char}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="font-mono text-sm mb-1">Tekst: {cleanText}</p>
                <p className="font-mono text-sm">
                    Versleuteld:{" "}
                    {cleanText.split("").map(c => {
                        const idx = alphabet.indexOf(c);
                        return idx !== -1 ? shifted[idx] : c;
                    }).join("")}
                </p>

                <p className="mt-2 italic text-sm text-gray-700">
                    → De onderste rij is het verschoven alfabet.
                </p>
            </div>
        );
    }

    if (method === "squareEncode") {
        const clean = cleanText;
        const len = clean.length;
        const size = Math.ceil(Math.sqrt(len));
        const padded = clean.padEnd(size * size, "X");

        const grid = [];
        for (let i = 0; i < size; i++) {
            grid.push(padded.slice(i * size, (i + 1) * size).split(""));
        }

        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Vierkantscodering</h2>
                <p className="mb-2">
                    De tekst wordt in een vierkant geplaatst van <strong>{size}×{size}</strong> (aantal letters: {len}).
                    Daarna wordt kolomsgewijs gelezen.
                </p>

                <div className="overflow-auto mb-2">
                    <table className="table-fixed border-collapse text-center font-mono">
                        <tbody>
                            {grid.map((row, rowIdx) => (
                                <tr key={rowIdx}>
                                    {row.map((char, colIdx) => (
                                        <td key={colIdx} className="border w-8 h-8 bg-white">{char}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="italic text-sm text-gray-700">
                    → De gecodeerde tekst ontstaat door de kolommen van boven naar beneden te lezen.
                </p>
            </div>
        );
    }



    if (method === "letterskip") {
        const position = skip || 1;
        const clean = input.toUpperCase().replace(/[^A-Z]/g, "");
        const encoded = wordList.length > 0
            ? letterKeyEncode(clean, position, wordList).split(" ")
            : [];

        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Lettersleutel</h2>
                <p className="mb-4">
                    Voor elke letter wordt een woord gezocht waarbij de{" "}
                    <strong>{position}<sup>e</sup></strong> letter overeenkomt met de doelletter.
                </p>

                <div className="overflow-auto">
                    <table className="table-auto border-collapse w-full text-sm font-mono">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="border px-2 py-1">#</th>
                                <th className="border px-2 py-1">Doelletter</th>
                                <th className="border px-2 py-1">Gekozen woord</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clean.split("").map((char, idx) => {
                                const word = encoded[idx] || `[${char}]`;

                                let displayWord;
                                if (word.startsWith("[") && word.endsWith("]")) {
                                    displayWord = <span className="text-red-600 italic">Geen match</span>;
                                } else if (word.length >= position) {
                                    displayWord = (
                                        <>
                                            {word.slice(0, position - 1)}
                                            <strong>{word[position - 1]}</strong>
                                            {word.slice(position)}
                                        </>
                                    );
                                } else {
                                    displayWord = word;
                                }

                                return (
                                    <tr key={idx} className="bg-white">
                                        <td className="border px-2 py-1">{idx + 1}</td>
                                        <td className="border px-2 py-1">{char}</td>
                                        <td className="border px-2 py-1">{displayWord}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <p className="mt-3 italic text-sm text-gray-700">
                    → Elk resultaatwoord bevat deze letter op positie {position}.
                </p>
            </div>
        );
    }

    if (method === "morseEncode" || method === "morseDecode") {
        const morseMap = {
            A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".",
            F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
            K: "-.-", L: ".-..", M: "--", N: "-.", O: "---",
            P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
            U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--",
            Z: "--..", 0: "-----", 1: ".----", 2: "..---",
            3: "...--", 4: "....-", 5: ".....", 6: "-....",
            7: "--...", 8: "---..", 9: "----."
        };

        const cleaned = cleanText.split(" ");
        const morseWords = cleaned.map(word =>
            word.split("").map(char => morseMap[char] || "?").join(" ")
        );

        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Morsecode</h2>
                <p className="mb-2">
                    Elke letter wordt omgezet in streepjes en puntjes volgens de morsecode.
                    Woorden worden gescheiden met <code>/</code>, letters met een spatie.
                </p>

                <div className="mb-2 font-mono text-sm">
                    {cleaned.map((word, idx) => (
                        <div key={idx}>
                            <strong>{word}</strong> → {morseWords[idx]}
                        </div>
                    ))}
                </div>

                <div className="overflow-auto mt-2">
                    <table className="table-fixed border-collapse text-sm font-mono">
                        <thead>
                            <tr>
                                {Object.keys(morseMap).slice(0, 13).map(k => (
                                    <th key={k} className="border px-1">{k}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {Object.keys(morseMap).slice(0, 13).map(k => (
                                    <td key={k} className="border px-1">{morseMap[k]}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="mt-2 italic text-sm text-gray-700">
                    → Decode werkt door signalen terug te vertalen naar letters op basis van de spaties en schuine strepen.
                </p>
            </div>
        );
    }

    if (method === "atbashCipher") {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const reversed = [...alphabet].reverse();
        const mapped = Object.fromEntries(alphabet.map((a, i) => [a, reversed[i]]));

        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Atbash-codering</h2>
                <p className="mb-2">
                    Elke letter wordt gespiegeld in het alfabet: <code>A ↔ Z</code>, <code>B ↔ Y</code>, enzovoort.
                </p>

                <div className="overflow-auto">
                    <table className="table-fixed border-collapse text-center font-mono text-sm mb-2">
                        <thead>
                            <tr>
                                {alphabet.map((char, idx) => (
                                    <th key={idx} className="border w-6 h-6 bg-gray-200">{char}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {alphabet.map((char, idx) => (
                                    <td key={idx} className="border w-6 h-6 bg-white">{mapped[char]}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="font-mono text-sm mb-1">Tekst: {cleanText}</p>
                <p className="font-mono text-sm">
                    Versleuteld:{" "}
                    {cleanText.split("").map(c => mapped[c] || c).join("")}
                </p>

                <p className="mt-2 italic text-sm text-gray-700">
                    → Atbash is symmetrisch: versleutelen en ontsleutelen zijn identiek.
                </p>
            </div>
        );
    }

    if (method === "letterToNumber" || method === "numberToLetter") {
        const words = input.trim().split(" / ").map(w => w.trim());

        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Letter ↔ Nummer</h2>
                <p className="mb-2">
                    Elke letter wordt omgezet naar zijn alfabetpositie: A=1, B=2, ..., Z=26.
                    Woorden worden gescheiden door <code>/</code>.
                </p>

                {method === "letterToNumber" && (
                    <div className="font-mono text-sm space-y-1">
                        {input.toUpperCase().split(" ").map((word, idx) => (
                            <div key={idx}>
                                <strong>{word}</strong> →
                                {" " + word
                                    .split("")
                                    .map(c => (c >= "A" && c <= "Z" ? c.charCodeAt(0) - 64 : "?"))
                                    .join(" ")}
                            </div>
                        ))}
                    </div>
                )}

                {method === "numberToLetter" && (
                    <div className="font-mono text-sm space-y-1">
                        {words.map((group, idx) => (
                            <div key={idx}>
                                <strong>{group}</strong> →
                                {" " + group
                                    .split(" ")
                                    .map(n => {
                                        const num = parseInt(n);
                                        return num >= 1 && num <= 26 ? String.fromCharCode(num + 64) : "?";
                                    })
                                    .join("")}
                            </div>
                        ))}
                    </div>
                )}

                <p className="mt-2 italic text-sm text-gray-700">
                    → Spaties scheiden letters, schuine strepen scheiden woorden.
                </p>
            </div>
        );
    }

    // === SIMPLE METHODS ===
    if (method === "reverseWords") {
        const words = input.split(" ").map(w => w.trim()).filter(Boolean);
        const reversedWords = words.map(w => w.split("").reverse().join(""));

        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Woorden omkeren</h2>
                <p className="mb-4">
                    Elk woord in de zin wordt afzonderlijk omgekeerd, maar de volgorde van de woorden blijft gelijk.
                    Dit verandert de structuur van de woorden zonder de zinsvolgorde aan te passen.
                </p>

                <div className="overflow-auto">
                    <table className="table-auto border-collapse font-mono text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-2 py-1">Origineel woord</th>
                                <th className="border px-2 py-1">Omgekeerd woord</th>
                            </tr>
                        </thead>
                        <tbody>
                            {words.map((w, i) => (
                                <tr key={i} className="bg-white">
                                    <td className="border px-2 py-1">{w}</td>
                                    <td className="border px-2 py-1">{reversedWords[i]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="mt-3 italic text-sm text-gray-700">
                    → De zinsstructuur blijft hetzelfde, maar elk woord wordt gespiegeld.
                </p>
            </div>
        );
    }


    if (method === "windrose" || method === "windroseDecode") {
        const explanation = method === "windrose" ? (
            <>
                <p className="mb-2">
                    Elke letter wordt omgezet naar een volgorde van windrichtingen
                    (N, O, Z, W) volgens een vaste tabel.
                </p>
            </>
        ) : (
            <>
                <p className="mb-2">
                    Elke reeks windrichtingen wordt terugvertaald naar de bijbehorende letter.
                </p>
            </>
        );
        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Windroosmethode</h2>
                {explanation}
                <p className="italic text-sm text-gray-700">
                    → N = Noord, O = Oost, Z = Zuid, W = West.
                </p>
            </div>
        );
    }

    if (method === "codewordEncodeDecode") {
        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Codewoordsubstitutie</h2>
                <p className="mb-2">
                    Op basis van het gekozen codewoord wordt het alfabet herschikt.
                    Letters worden omgewisseld tussen de bovenste en onderste helft van het nieuwe alfabet.
                </p>
            </div>
        );
    }

    if (method === "letterskipDecode") {
        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Lettersleutel (ontsleutelen)</h2>
                <p className="mb-2">
                    Elke positie in een woord komt overeen met de sleutelpositie van de versleutelde letter.
                </p>
            </div>
        );
    }

    if (method === "squareDecode") {
        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Vierkantscodering (ontsleutelen)</h2>
                <p className="mb-2">
                    De tekst wordt kolomsgewijs teruggezet in het vierkant en dan rij-voor-rij gelezen.
                </p>
            </div>
        );
    }

    if (method === "polybiusDecode") {
        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Polybius Matrix (ontsleutelen)</h2>
                <p className="mb-2">
                    Elke twee cijfers geven (rij, kolom) in de matrix aan. Deze worden terugvertaald naar letters.
                </p>
            </div>
        );
    }

    if (method === "tralieDecode") {
        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Tralieschrift (ontsleutelen)</h2>
                <p className="mb-2">
                    De zigzagstructuur wordt hersteld en de letters worden in volgorde teruggezet.
                </p>
            </div>
        );
    }

    // === FONT-BASED CIPHERS ===
    const fontMethods = [
        "brailleFontEncode", "brailleFontDecode",
        "raamFontEncode", "raamFontDecode",
        "chinoisFontEncode", "chinoisFontDecode",
        "dancingmenFontEncode", "dancingmenFontDecode",
        "hieroglyphsFontEncode", "hieroglyphsFontDecode",
        "semaphoreflagsFontEncode", "semaphoreflagsFontDecode"
    ];
    if (fontMethods.includes(method)) {
        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Symboolschrift ({method})</h2>
                <p className="mb-2">
                    De tekst wordt weergegeven in een speciaal lettertype waarbij elke letter een symbool is.
                </p>
                <p className="italic text-sm text-gray-700">
                    → Decode werkt door het symbool terug te zoeken in de lettertabel.
                </p>
            </div>
        );
    }

    if (method === "asciiEncode" || method === "asciiDecode") {
        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: ASCII-code</h2>
                {method === "asciiEncode" ? (
                    <p className="mb-2">
                        Elke letter wordt omgezet naar zijn ASCII-cijferwaarde.
                    </p>
                ) : (
                    <p className="mb-2">
                        Elk ASCII-getal wordt terugvertaald naar zijn letter.
                    </p>
                )}
            </div>
        );
    }

    if (method === "hexEncode" || method === "hexDecode") {
        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Hexadecimale code</h2>
                {method === "hexEncode" ? (
                    <p className="mb-2">
                        Elke letter wordt omgezet naar zijn hexadecimale waarde (basis 16).
                    </p>
                ) : (
                    <p className="mb-2">
                        Elke hexwaarde wordt terugvertaald naar zijn letter.
                    </p>
                )}
            </div>
        );
    }

    if (method === "upsideDown") {
        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Tekst ondersteboven</h2>
                <p className="mb-2">
                    Elke letter wordt vervangen door zijn ondersteboven-variant en de tekst wordt omgekeerd weergegeven.
                </p>
            </div>
        );
    }

    if (method === "splitChunks") {
        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Tekst opdelen in blokken</h2>
                <p className="mb-2">
                    De tekst wordt verdeeld in gelijke delen (blokken). Elk blok kan als QR-code worden weergegeven.
                </p>
            </div>
        );
    }

    if (method === "kijkKleurEncode" || method === "kijkKleurDecode") {
        return (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Kijk-Kleur methode</h2>
                {method === "kijkKleurEncode" ? (
                    <p className="mb-2">
                        Elke letter wordt vertaald naar een combinatie van een 'kijk'-letter (kolom) en een 'kleur'-letter (rij).
                    </p>
                ) : (
                    <p className="mb-2">
                        Elke combinatie van kijk- en kleurletters wordt terugvertaald naar de oorspronkelijke letter.
                    </p>
                )}
            </div>
        );
    }


    return null;
}


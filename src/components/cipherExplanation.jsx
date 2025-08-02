// components/CipherExplanation.jsx
import React from "react";
import { letterKeyEncode, buildCodewordMatrix, upsideDownMap, splitChunks, } from "../utils/cipherUtils/cipher_utils_module.js";
const fontMethods = [
    "brailleFontEncode", "brailleFontDecode",
    "raamFontEncode", "raamFontDecode",
    "chinoisFontEncode", "chinoisFontDecode",
    "dancingmenFontEncode", "dancingmenFontDecode",
    "hieroglyphsFontEncode", "hieroglyphsFontDecode",
    "semaphoreflagsFontEncode", "semaphoreflagsFontDecode"
];

const imageMap = {
    raamFontEncode: "/images/raam-tabel.png",
    raamFontDecode: "/images/raam-tabel.png",
    dancingmenFontEncode: "/images/dancingmen.png",
    dancingmenFontDecode: "/images/dancingmen.png",
    semaphoreflagsFontEncode: "/images/semaphoreflags.png",
    semaphoreflagsFontDecode: "/images/semaphoreflags.png",
    hieroglyphsFontEncode: "/images/hieroglyphs.png",
    hieroglyphsFontDecode: "/images/hieroglyphs.png",
    brailleFontEncode: "/images/braille.png",
    brailleFontDecode: "/images/braille.png",
    chinoisFontEncode: "/images/chinois.png",
    chinoisFontDecode: "/images/chinois.png",
    windrose: "/images/windrose-tabel.png",
    windroseDecode: "/images/windrose-tabel.png",
    asciiDecode: "/images/ascii-hex.png",
    asciiEncode: "/images/ascii-hex.png",
    hexDecode: "/images/ascii-hex.png",
    hexDecode: "/images/ascii-hex.png",
    morseDecode: "/images/morse-tabel.png",
    morseEncode: "/images/morse-tabel.png"
};

let content = null;

export default function CipherExplanation({ method, input, year, skip, shift = skip, wordList = [], kijkwoord = "KIJK-", kleurwoord = "KLEUR" }) {
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

        content = (
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
        if (rows < 2) {
            content = (<p>Minimaal 2 rijen nodig.</p>);
            return;
        }

        const matrix = Array.from({ length: rows }, () => Array(cleanText.length).fill(" "));

        let row = 0;
        let direction = 1;
        for (let col = 0; col < cleanText.length; col++) {
            matrix[row][col] = cleanText[col];
            row += direction;
            if (row === rows - 1 || row === 0) direction *= -1;
        }

        content = (
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

        content = (
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
        // Gebruik de shift-state direct, niet skip
        const normalizedShift = shift % 26;
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // Verschoven alfabet genereren
        const shifted = alphabet
            .split("")
            .map((_, i) => alphabet[(i + normalizedShift + 26) % 26]);

        // Tekst versleutelen
        const encrypted = cleanText.split("").map(c => {
            const isLower = c === c.toLowerCase();
            const idx = alphabet.indexOf(c.toUpperCase());
            if (idx === -1) return c; // Geen letter → onveranderd
            const newChar = shifted[idx];
            return isLower ? newChar.toLowerCase() : newChar;
        }).join("");

        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Caesarverschuiving</h2>
                <p className="mb-2">
                    Elke letter wordt verschoven met <strong>{normalizedShift}</strong> plaatsen in het alfabet.
                </p>

                {/* Tabel met originele en verschoven alfabet */}
                <div className="overflow-auto mb-4">
                    <table className="table-fixed border-collapse text-center font-mono text-sm">
                        <thead>
                            <tr>
                                {alphabet.split("").map((char, idx) => (
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

                {/* Originele en versleutelde tekst */}
                <p className="font-mono text-sm mb-1">Tekst: {cleanText}</p>
                <p className="font-mono text-sm">
                    Versleuteld: {encrypted}
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

        content = (
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

        content = (
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

        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Morsecode</h2>
                <p className="mb-2">
                    Elke letter wordt omgezet in streepjes en puntjes volgens de morsecode.
                    Woorden worden gescheiden met <code>/</code>, letters met een spatie.
                </p>
                <p className="mt-2 italic text-sm text-gray-700">
                    Om te ontcijferen, gebruik je de morsemolen
                    die hieronder staat. Naargelang het eerste
                    teken begin je bovenaan rechts of links. Je
                    daalt schuin rechts of links naar beneden
                    naargelang het tweede teken (punt = links of
                    gearceerd, streep = rechts) en zo verder.
                </p>
            </div>
        );
    }

    if (method === "atbashCipher") {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const reversed = [...alphabet].reverse();
        const mapped = Object.fromEntries(alphabet.map((a, i) => [a, reversed[i]]));

        content = (
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

        content = (
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

        content = (
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
        const mapEntries = Object.entries({
            A: "NNNO", B: "NONNO", C: "NOONO", D: "OONO", E: "OOZO",
            F: "ZOOZO", G: "ZOZZO", H: "ZZZO", I: "ZZZW", J: "ZWZZW",
            K: "ZWWZW", L: "WWZW", M: "WWNW", N: "NWWNW", O: "NWNNW"
        });

        const explanation = method === "windrose" ? (
            <p className="mb-2">
                Een letter geef je weer door de twee
                windrichtingen waartussen hij ligt. Je plaatst
                een sterretje wanneer je de binnenste letter (q,r,s...)
                bedoelt.

                Je noteert eerst de hoofdwindrichting (N,O,Z of W) of de tussenwindrichting (NO,ZO,ZW,NW) en dan pas de (kleine) windrichting.
            </p>

        ) : (
            <p className="mb-2">
                Een letter geef je weer door de twee
                windrichtingen waartussen hij ligt. Je plaatst
                een sterretje wanneer je de binnenste letter (q,r,s...)
                bedoelt.

                Je noteert eerst de hoofdwindrichting (N,O,Z of W) of de tussenwindrichting (NO,ZO,ZW,NW) en dan pas de (kleine) windrichting.
            </p>
        );

        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧭 Uitleg: Windroosmethode</h2>
                {explanation}
                <div className="overflow-auto mt-2">

                </div>
            </div>
        );
    }


    if (method === "codewordEncodeDecode") {
        const { topRow, bottomRow } = buildCodewordMatrix(input || "CODEWOORD");

        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Codewoordsubstitutie</h2>
                <p className="mb-2">
                    Met een codewoord zoals <strong>{input || "CODEWOORD"}</strong> herschikken we het alfabet in twee helften. Letters worden dan onderling uitgewisseld.
                </p>

                <div className="overflow-auto">
                    <table className="table-fixed border-collapse text-center font-mono text-sm mb-2">
                        <thead>
                            <tr>
                                {topRow.map((char, idx) => (
                                    <th key={idx} className="border w-6 h-6 bg-gray-200">{char}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {bottomRow.map((char, idx) => (
                                    <td key={idx} className="border w-6 h-6 bg-white">{char}</td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="italic text-sm text-gray-700 mt-2">
                    → Letters uit de bovenste rij worden vervangen door de overeenkomstige letter eronder, en omgekeerd.
                </p>
            </div>
        );
    }


    if (method === "letterskipDecode") {
        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Lettersleutel (ontsleutelen)</h2>
                <p className="mb-2">
                    Elke positie in een woord komt overeen met de sleutelpositie van de versleutelde letter.
                </p>
            </div>
        );
    }

    if (method === "squareDecode") {
        const clean = input.replace(/[^A-Z]/gi, "").toUpperCase();
        const len = clean.length;
        const size = Math.ceil(Math.sqrt(len));
        const padded = clean.padEnd(size * size, "X");

        // Bouw matrix door kolommen te vullen (reverse van encode)
        const matrix = Array.from({ length: size }, () => Array(size).fill(""));
        let idx = 0;
        for (let col = 0; col < size; col++) {
            for (let row = 0; row < size; row++) {
                matrix[row][col] = padded[idx++];
            }
        }

        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Vierkantscodering (ontsleutelen)</h2>
                <p className="mb-2">
                    De gecodeerde tekst wordt kolom-voor-kolom in een vierkant van <strong>{size}×{size}</strong> geplaatst (aantal letters: {len}).
                    Vervolgens lees je rij-voor-rij om de oorspronkelijke tekst terug te krijgen.
                </p>

                <div className="overflow-auto mb-2">
                    <table className="table-fixed border-collapse font-mono text-center">
                        <tbody>
                            {matrix.map((row, rIdx) => (
                                <tr key={rIdx}>
                                    {row.map((char, cIdx) => (
                                        <td key={cIdx} className="border w-8 h-8 bg-white">{char}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="italic text-sm text-gray-700">
                    → Originele tekst: lees de rijen van links naar rechts.
                </p>
            </div>
        );
    }



    if (method === "polybiusDecode") {
        const polybiusMatrix = [
            ["A", "B", "C", "D", "E"],
            ["F", "G", "H", "I", "J"],
            ["K", "L", "M", "N", "O"],
            ["P", "R", "S", "T", "U"],
            ["V", "W", "X", "Y", "Z"]
        ];

        const codes = input.match(/\d{2}/g) || [];
        const decodedText = codes.map(pair => {
            const [r, c] = [parseInt(pair[0], 10) - 1, parseInt(pair[1], 10) - 1];
            return (polybiusMatrix[r] && polybiusMatrix[r][c]) || "?";
        }).join("");

        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Polybius Matrix (ontsleutelen)</h2>
                <p className="mb-2">
                    Elke twee cijfers duiden een positie aan in de 5×5-matrix: rij gevolgd door kolom.
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

                <p className="font-mono text-sm mb-1">
                    Codes: {codes.join(" ")}
                </p>
                <p className="font-mono text-sm">
                    Tekst: {decodedText}
                </p>

                <p className="mt-2 italic text-sm text-gray-700">
                    → Q ontbreekt in deze codering (vervangen of weggelaten).
                </p>
            </div>
        );
    }

    if (method === "tralieDecode") {
        const rows = parseInt(skip || 2, 10);
        const cleaned = input.replace(/[^a-zA-Z]/g, "");
        const len = cleaned.length;

        if (len === 0) {
            content = (<p>Geen geldige letters om te decoderen.</p>);
            return;
        }

        let matrix;

        if (rows <= 1) {
            // Speciale case: alles op 1 regel
            matrix = [Array.from(cleaned)];
        } else {
            // Normale tralie-decode op meerdere rijen
            matrix = Array.from({ length: rows }, () => Array(len).fill(null));

            let row = 0, direction = 1;
            for (let col = 0; col < len; col++) {
                matrix[row][col] = "*";
                row += direction;
                if (row === rows - 1 || row === 0) direction *= -1;
            }
        }

        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Tralieschrift (ontsleutelen)</h2>
                <p className="mb-2">
                    {rows <= 1
                        ? "Bij één rij staan alle letters naast elkaar."
                        : "De zigzagstructuur wordt hersteld en gevuld met tekst, waarna de originele volgorde wordt gereconstrueerd."
                    }
                </p>
                <div className="overflow-auto">
                    <table className="table-fixed border-collapse text-sm font-mono">
                        <tbody>
                            {matrix.map((rowArr, rowIdx) => (
                                <tr key={rowIdx}>
                                    {rowArr.map((char, colIdx) => (
                                        <td
                                            key={colIdx}
                                            className={`border w-8 h-8 text-center ${char === "*" ? "bg-yellow-100" : "bg-gray-200"
                                                }`}
                                        >
                                            {char || ""}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {rows > 1 && (
                    <p className="italic text-sm text-gray-700 mt-2">
                        → Posities met <code>*</code> worden gevuld met letters en dan zigzaggend uitgelezen.
                    </p>
                )}
            </div>
        );
    }


    // === FONT-BASED CIPHERS ===
    const fontDescriptions = {
        brailleFontEncode: "Brailleschrift",
        raamFontEncode: "Raamcode",
        dancingmenFontEncode: "Dancing Men",
        chinoisFontEncode: "Chinees symboolschrift",
        hieroglyphsFontEncode: "Hiërogliefen",
        semaphoreflagsFontEncode: "Semaforen"
    };

    if (fontMethods.includes(method)) {
        const displayName = fontDescriptions[method] || "Symbolenschrift";
        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: {displayName}</h2>
                <p className="mb-2">
                    Deze codering gebruikt een speciaal lettertype waarbij elke letter een uniek symbool voorstelt.
                    De betekenis zit in het uiterlijk van de tekens.
                </p>
                <p className="italic text-sm text-gray-700 mt-2">
                    → Om te ontcijferen moet je het symbool opzoeken in een sleutel of lettertabel.
                </p>
            </div>
        );
    }

    if (method === "asciiEncode" || method === "asciiDecode") {
        const clean = input.trim();
        const asciiPairs = method === "asciiEncode"
            ? clean.split("").map(c => [c, c.charCodeAt(0)])
            : clean.split(/\s+/).map(code => [code, String.fromCharCode(parseInt(code))]);

        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: ASCII-code</h2>
                <p className="mb-2">
                    {method === "asciiEncode"
                        ? "Elke letter wordt omgezet naar zijn numerieke ASCII-code."
                        : "Elke ASCII-code wordt terugvertaald naar de overeenkomstige letter."}
                </p>
                <div className="overflow-auto">
                    <table className="table-fixed border-collapse text-sm font-mono">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-2 py-1">Teken</th>
                                <th className="border px-2 py-1">ASCII</th>
                            </tr>
                        </thead>
                        <tbody>
                            {asciiPairs.map(([a, b], i) => (
                                <tr key={i}>
                                    <td className="border px-2 py-1">{a}</td>
                                    <td className="border px-2 py-1">{b}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="italic text-sm text-gray-700 mt-2">
                    → Dit is een cijfercode gebaseerd op computertaal.
                </p>
            </div>
        );
    }

    if (method === "hexEncode" || method === "hexDecode") {
        const pairs = method === "hexEncode"
            ? input.split("").map(c => [c, c.charCodeAt(0).toString(16)])
            : input.split(/\s+/).map(hex => [hex, String.fromCharCode(parseInt(hex, 16))]);

        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Hexadecimale code</h2>
                <p className="mb-2">
                    {method === "hexEncode"
                        ? "Elke letter wordt omgezet naar een hexadecimale waarde (basis 16)."
                        : "Elke hexwaarde wordt terugvertaald naar de originele letter."}
                </p>
                <div className="overflow-auto font-mono text-sm">
                    {pairs.map(([a, b], i) => (
                        <div key={i}>
                            {method === "hexEncode" ? `${a} → ${b}` : `${a} → ${b}`}
                        </div>
                    ))}
                </div>
                <p className="italic text-sm text-gray-700 mt-2">
                    → Dit type code wordt vaak gebruikt in computers en webtechnologie.
                </p>
            </div>
        );
    }

    if (method === "upsideDown") {
        const reversed = input.split("").reverse();
        const transformed = reversed.map(c => upsideDownMap[c] || upsideDownMap[c.toLowerCase()] || c);

        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🙃 Uitleg: Tekst ondersteboven</h2>
                <p className="mb-2">
                    Elke letter wordt vervangen door zijn ondersteboven-variant en de tekst wordt achterstevoren weergegeven.
                </p>

                <div className="font-mono text-sm bg-white p-3 rounded border">
                    <div><strong>Origineel:</strong> {input}</div>
                    <div><strong>Omkering:</strong> {reversed.join("")}</div>
                    <div><strong>Ondersteboven:</strong> {transformed.join("")}</div>
                </div>

                <p className="mt-2 italic text-sm text-gray-700">
                    → Leuk voor geheime of speelse berichten! 📜
                </p>
            </div>
        );
    }

    if (method === "splitChunks") {
        const chunks = input?.trim() ? splitChunks(input, skip || 3) : [];

        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Tekst opdelen in blokken</h2>
                <p className="mb-2">
                    De tekst wordt verdeeld in <strong>{skip || 3}</strong> gelijke blokken. Elk blok wordt afzonderlijk weergegeven, ook als QR-code.
                </p>
                <div className="font-mono text-sm bg-white p-2 rounded border">
                    {chunks.map((chunk, i) => (
                        <div key={i}><strong>Blok {i + 1}:</strong> {chunk}</div>
                    ))}
                </div>
                <p className="italic text-sm text-gray-700 mt-2">
                    → Handig voor geheime communicatie in meerdere delen.
                </p>
            </div>
        );
    }

    if (method === "kijkKleurEncode" || method === "kijkKleurDecode") {
        const kijkLabels = (kijkwoord || "KIJK-").toUpperCase().split("");
        const kleurLabels = (kleurwoord || "KLEUR").toUpperCase().split("");

        // Zelfde matrixopbouw als in encode/decode
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".replace("Y", "");
        const matrix = [];
        let index = 0;
        for (let r = 0; r < 5; r++) {
            const row = [];
            for (let c = 0; c < 5; c++) {
                row.push(alphabet[index++] || "");
            }
            matrix.push(row);
        }

        content = (
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">🧠 Uitleg: Kijk-Kleur methode</h2>
                <p className="mb-2">
                    De tekst wordt gecodeerd als coördinaten: kolomletter (kijk) + rijletter (kleur),
                    m.b.v. een <strong>5×5-matrix</strong>. De letter <code>Y</code> wordt vervangen door <code>IJ</code>.
                </p>

                <div className="overflow-auto mb-3">
                    <table className="table-fixed border-collapse font-mono text-sm text-center">
                        <thead>
                            <tr>
                                <th className="w-8 h-8"></th>
                                {kijkLabels.map((k, i) => (
                                    <th key={i} className="w-8 h-8 border bg-gray-200">{k}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {matrix.map((row, rowIdx) => (
                                <tr key={rowIdx}>
                                    <td className="w-8 h-8 border bg-gray-200">{kleurLabels[rowIdx]}</td>
                                    {row.map((char, colIdx) => (
                                        <td key={colIdx} className="w-8 h-8 border bg-white">{char}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="italic text-sm text-gray-700">
                    → Combinatie van kijk- en kleurletter bepaalt de positie van de letter in de matrix.
                </p>
            </div>
        );
    }


    // Als geen content is gevonden, stop
    if (!content) return null;

    // Eén gezamenlijke return met optionele afbeelding
    return (
        <>
            {content}
            {imageMap[method] && (
                <div className="mt-4">
                    <img
                        src={imageMap[method]}
                        alt={`${method} sleutelafbeelding`}
                        className="rounded border shadow max-w-full mx-auto"
                    />
                    <p className="italic text-sm text-gray-700 text-center mt-2">
                        ↳ Sleuteltabel voor deze methode
                    </p>
                </div>
            )}
        </>
    );
}

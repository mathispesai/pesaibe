// components/explanations/PolybiusExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";

export function PolybiusExplanation({ input, isDecoding = false }) {
    const polybiusMatrix = [
        ["A", "B", "C", "D", "E"],
        ["F", "G", "H", "I", "J"],
        ["K", "L", "M", "N", "O"],
        ["P", "R", "S", "T", "U"],
        ["V", "W", "X", "Y", "Z"]
    ];

    let content;

    if (isDecoding) {
        const codes = input.match(/\d{2}/g) || [];
        const decodedText = codes.map(pair => {
            const [r, c] = [parseInt(pair[0], 10) - 1, parseInt(pair[1], 10) - 1];
            return (polybiusMatrix[r] && polybiusMatrix[r][c]) || "?";
        }).join("");

        content = (
            <>
                <p className="mb-2">
                    Elke twee cijfers duiden een positie aan in de 5×5-matrix: rij gevolgd door kolom.
                </p>
                <p className="font-mono text-sm mb-1">Codes: {codes.join(" ")}</p>
                <p className="font-mono text-sm">Tekst: {decodedText}</p>
                <p className="mt-2 italic text-sm text-gray-700">
                    → Q ontbreekt in deze codering (vervangen of weggelaten).
                </p>
            </>
        );
    } else {
        const cleanText = input.replace(/[^a-zA-Z]/g, "").toUpperCase();
        const clean = cleanText.replace(/Q/g, "");
        const letterToCoord = {};

        polybiusMatrix.forEach((row, rowIndex) => {
            row.forEach((letter, colIndex) => {
                letterToCoord[letter] = `${rowIndex + 1}${colIndex + 1}`;
            });
        });

        content = (
            <>
                <p className="mb-2">
                    Elke letter wordt omgezet in een paar cijfers: (rij, kolom) in een 5×5-matrix.
                    De letter <strong>Q</strong> wordt overgeslagen.
                </p>
                <p className="font-mono text-sm mb-1">Tekst: {clean}</p>
                <p className="font-mono text-sm">
                    Codes: {clean.split("").map(c => letterToCoord[c] || "?").join(" ")}
                </p>
                <p className="mt-2 italic text-sm text-gray-700">
                    → Elke letter wordt gecodeerd als twee cijfers.
                </p>
            </>
        );
    }

    return (
        <BaseExplanation title={`🧠 Uitleg: Polybius Matrix ${isDecoding ? "(ontsleutelen)" : ""}`}>
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
            {content}
        </BaseExplanation>
    );
}

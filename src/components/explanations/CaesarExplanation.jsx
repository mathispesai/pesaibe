// components/explanations/CaesarExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";

export function CaesarExplanation({ input, shift }) {
    const cleanText = input.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const normalizedShift = shift % 26;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const shifted = alphabet
        .split("")
        .map((_, i) => alphabet[(i + normalizedShift + 26) % 26]);

    const encrypted = cleanText.split("").map(c => {
        const isLower = c === c.toLowerCase();
        const idx = alphabet.indexOf(c.toUpperCase());
        if (idx === -1) return c;
        const newChar = shifted[idx];
        return isLower ? newChar.toLowerCase() : newChar;
    }).join("");

    return (
        <BaseExplanation title="🧠 Uitleg: Caesarverschuiving">
            <p className="mb-2">
                Elke letter wordt verschoven met <strong>{normalizedShift}</strong> plaatsen in het alfabet.
            </p>

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

            <p className="font-mono text-sm mb-1">Tekst: {cleanText}</p>
            <p className="font-mono text-sm">Versleuteld: {encrypted}</p>

            <p className="mt-2 italic text-sm text-gray-700">
                → De onderste rij is het verschoven alfabet.
            </p>
        </BaseExplanation>
    );
}

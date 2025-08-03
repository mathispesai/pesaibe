
// components/explanations/AtbashExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";

export function AtbashExplanation({ input, imageSrc, imageAlt }) {
    const cleanText = input.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const reversed = [...alphabet].reverse();
    const mapped = Object.fromEntries(alphabet.map((a, i) => [a, reversed[i]]));

    return (
        <BaseExplanation title="🧠 Uitleg: Atbash-codering" imageSrc={imageSrc} imageAlt={imageAlt}>
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
                Versleuteld: {cleanText.split("").map(c => mapped[c] || c).join("")}
            </p>

            <p className="mt-2 italic text-sm text-gray-700">
                → Atbash is symmetrisch: versleutelen en ontsleutelen zijn identiek.
            </p>
        </BaseExplanation>
    );
}

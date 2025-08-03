// components/explanations/SquareExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";

export function SquareExplanation({ input, isDecoding = false }) {
    const cleanText = input.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const len = cleanText.length;
    const size = Math.ceil(Math.sqrt(len));
    const padded = cleanText.padEnd(size * size, "X");

    let matrix;

    if (isDecoding) {
        // Bouw matrix door kolommen te vullen (reverse van encode)
        matrix = Array.from({ length: size }, () => Array(size).fill(""));
        let idx = 0;
        for (let col = 0; col < size; col++) {
            for (let row = 0; row < size; row++) {
                matrix[row][col] = padded[idx++];
            }
        }
    } else {
        // Normale encoding: rij voor rij vullen
        matrix = [];
        for (let i = 0; i < size; i++) {
            matrix.push(padded.slice(i * size, (i + 1) * size).split(""));
        }
    }

    return (
        <BaseExplanation title={`🧠 Uitleg: Vierkantscodering ${isDecoding ? "(ontsleutelen)" : ""}`}>
            <p className="mb-2">
                {isDecoding
                    ? `De gecodeerde tekst wordt kolom-voor-kolom in een vierkant van ${size}×${size} geplaatst (aantal letters: ${len}). Vervolgens lees je rij-voor-rij om de oorspronkelijke tekst terug te krijgen.`
                    : `De tekst wordt in een vierkant geplaatst van ${size}×${size} (aantal letters: ${len}). Daarna wordt kolomsgewijs gelezen.`
                }
            </p>

            <div className="overflow-auto mb-2">
                <table className="table-fixed border-collapse text-center font-mono">
                    <tbody>
                        {matrix.map((row, rowIdx) => (
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
                {isDecoding
                    ? "→ Originele tekst: lees de rijen van links naar rechts."
                    : "→ De gecodeerde tekst ontstaat door de kolommen van boven naar beneden te lezen."
                }
            </p>
        </BaseExplanation>
    );
}

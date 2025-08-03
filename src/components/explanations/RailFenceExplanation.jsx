// components/explanations/RailFenceExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";

export function RailFenceExplanation({ input, skip, isDecoding = false }) {
    const cleanText = input.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const rows = parseInt(skip || 2);

    if (rows < 2) {
        return <p>Minimaal 2 rijen nodig.</p>;
    }

    let matrix;

    if (isDecoding) {
        const len = cleanText.length;
        matrix = Array.from({ length: rows }, () => Array(len).fill(null));

        let row = 0, direction = 1;
        for (let col = 0; col < len; col++) {
            matrix[row][col] = "*";
            row += direction;
            if (row === rows - 1 || row === 0) direction *= -1;
        }
    } else {
        matrix = Array.from({ length: rows }, () => Array(cleanText.length).fill(" "));

        let row = 0;
        let direction = 1;
        for (let col = 0; col < cleanText.length; col++) {
            matrix[row][col] = cleanText[col];
            row += direction;
            if (row === rows - 1 || row === 0) direction *= -1;
        }
    }

    return (
        <BaseExplanation title={`🧠 Uitleg: Tralieschrift ${isDecoding ? "(ontsleutelen)" : ""}`}>
            <p className="mb-2">
                {isDecoding
                    ? "De zigzagstructuur wordt hersteld en gevuld met tekst, waarna de originele volgorde wordt gereconstrueerd."
                    : `De tekst beweegt zigzaggend over ${rows} rijen. Daarna lees je per rij uit voor het resultaat.`
                }
            </p>

            <div className="overflow-auto">
                <table className="table-fixed border-collapse">
                    <tbody>
                        {matrix.map((rowArr, rowIdx) => (
                            <tr key={rowIdx}>
                                {rowArr.map((char, colIdx) => (
                                    <td
                                        key={colIdx}
                                        className={`border w-8 h-8 text-center font-mono ${char === "*" ? "bg-yellow-100" :
                                                char !== " " && char !== null ? "bg-white" : "bg-gray-200"
                                            }`}
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
                {isDecoding
                    ? "→ Posities met * worden gevuld met letters en dan zigzaggend uitgelezen."
                    : "→ Lees per rij voor het versleutelde resultaat."
                }
            </p>
        </BaseExplanation>
    );
}

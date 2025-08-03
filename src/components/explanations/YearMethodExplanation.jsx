// components/explanations/YearMethodExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";

export function YearMethodExplanation({ input, year }) {
    const cleanText = input.replace(/[^a-zA-Z]/g, "").toUpperCase();
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

    return (
        <BaseExplanation title="🧠 Uitleg: Jaartalmethode">
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
        </BaseExplanation>
    );
}


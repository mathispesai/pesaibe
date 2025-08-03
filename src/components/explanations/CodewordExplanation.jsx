// components/explanations/CodewordExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";
import {buildCodewordMatrix } from "../../utils/cipherUtils/substitution.js";

export function CodewordExplanation({ input, imageSrc, imageAlt }) {
    const { topRow, bottomRow } = buildCodewordMatrix(input || "CODEWOORD");

    return (
        <BaseExplanation title="🧠 Uitleg: Codewoordsubstitutie" imageSrc={imageSrc} imageAlt={imageAlt}>
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
        </BaseExplanation>
    );
}

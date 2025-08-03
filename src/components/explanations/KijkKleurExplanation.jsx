// components/explanations/KijkKleurExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";

export function KijkKleurExplanation({ kijkwoord, kleurwoord, imageSrc, imageAlt }) {
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

    return (
        <BaseExplanation title="🧠 Uitleg: Kijk-Kleur methode" imageSrc={imageSrc} imageAlt={imageAlt}>
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
        </BaseExplanation>
    );
}

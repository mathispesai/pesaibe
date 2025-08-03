// components/explanations/LetterNumberExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";

export function LetterNumberExplanation({ input, method, imageSrc, imageAlt }) {
    const words = input.trim().split(" / ").map(w => w.trim());

    return (
        <BaseExplanation title="🧠 Uitleg: Letter ↔ Nummer" imageSrc={imageSrc} imageAlt={imageAlt}>
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
        </BaseExplanation>
    );
}

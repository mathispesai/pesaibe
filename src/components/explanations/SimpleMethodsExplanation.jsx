// components/explanations/SimpleMethodsExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";
import { upsideDownMap, splitChunks } from "../../utils/cipherUtils/cipher_utils_module.js";

export function SimpleMethodsExplanation({ input, method, skip, imageSrc, imageAlt }) {
    if (method === "reverseWords") {
        const words = input.split(" ").map(w => w.trim()).filter(Boolean);
        const reversedWords = words.map(w => w.split("").reverse().join(""));

        return (
            <BaseExplanation title="🧠 Uitleg: Woorden omkeren" imageSrc={imageSrc} imageAlt={imageAlt}>
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
            </BaseExplanation>
        );
    }

    if (method === "upsideDown") {
        const reversed = input.split("").reverse();
        const transformed = reversed.map(c => upsideDownMap[c] || upsideDownMap[c.toLowerCase()] || c);

        return (
            <BaseExplanation title="🙃 Uitleg: Tekst ondersteboven" imageSrc={imageSrc} imageAlt={imageAlt}>
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
            </BaseExplanation>
        );
    }

    if (method === "splitChunks") {
        const chunks = input?.trim() ? splitChunks(input, skip || 3) : [];

        return (
            <BaseExplanation title="🧠 Uitleg: Tekst opdelen in blokken" imageSrc={imageSrc} imageAlt={imageAlt}>
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
            </BaseExplanation>
        );
    }

    return null;
}

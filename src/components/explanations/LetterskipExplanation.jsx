// components/explanations/LetterskipExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";
import { letterKeyEncode } from "../../utils/cipherUtils/letter_key.js";

export function LetterskipExplanation({ input, method, skip, wordList, imageSrc, imageAlt }) {
    if (method === "letterskipDecode") {
        return (
            <BaseExplanation title="🧠 Uitleg: Lettersleutel (ontsleutelen)" imageSrc={imageSrc} imageAlt={imageAlt}>
                <p className="mb-2">
                    Elke positie in een woord komt overeen met de sleutelpositie van de versleutelde letter.
                </p>
            </BaseExplanation>
        );
    }

    const position = skip || 1;
    const clean = input.toUpperCase().replace(/[^A-Z]/g, "");
    const encoded = wordList.length > 0
        ? letterKeyEncode(clean, position, wordList).split(" ")
        : [];

    return (
        <BaseExplanation title="🧠 Uitleg: Lettersleutel" imageSrc={imageSrc} imageAlt={imageAlt}>
            <p className="mb-4">
                Voor elke letter wordt een woord gezocht waarbij de{" "}
                <strong>{position}<sup>e</sup></strong> letter overeenkomt met de doelletter.
            </p>

            <div className="overflow-auto">
                <table className="table-auto border-collapse w-full text-sm font-mono">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="border px-2 py-1">#</th>
                            <th className="border px-2 py-1">Doelletter</th>
                            <th className="border px-2 py-1">Gekozen woord</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clean.split("").map((char, idx) => {
                            const word = encoded[idx] || `[${char}]`;

                            let displayWord;
                            if (word.startsWith("[") && word.endsWith("]")) {
                                displayWord = <span className="text-red-600 italic">Geen match</span>;
                            } else if (word.length >= position) {
                                displayWord = (
                                    <>
                                        {word.slice(0, position - 1)}
                                        <strong>{word[position - 1]}</strong>
                                        {word.slice(position)}
                                    </>
                                );
                            } else {
                                displayWord = word;
                            }

                            return (
                                <tr key={idx} className="bg-white">
                                    <td className="border px-2 py-1">{idx + 1}</td>
                                    <td className="border px-2 py-1">{char}</td>
                                    <td className="border px-2 py-1">{displayWord}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <p className="mt-3 italic text-sm text-gray-700">
                → Elk resultaatwoord bevat deze letter op positie {position}.
            </p>
        </BaseExplanation>
    );
}

// components/explanations/AsciiHexExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";

export function AsciiHexExplanation({ input, method, imageSrc, imageAlt }) {
    let pairs, title, description, tableHeaders;

    if (method === "asciiEncode" || method === "asciiDecode") {
        title = "🧠 Uitleg: ASCII-code";
        description = method === "asciiEncode"
            ? "Elke letter wordt omgezet naar zijn numerieke ASCII-code."
            : "Elke ASCII-code wordt terugvertaald naar de overeenkomstige letter.";
        tableHeaders = ["Teken", "ASCII"];

        pairs = method === "asciiEncode"
            ? input.trim().split("").map(c => [c, c.charCodeAt(0)])
            : input.trim().split(/\s+/).map(code => [code, String.fromCharCode(parseInt(code))]);
    } else {
        title = "🧠 Uitleg: Hexadecimale code";
        description = method === "hexEncode"
            ? "Elke letter wordt omgezet naar een hexadecimale waarde (basis 16)."
            : "Elke hexwaarde wordt terugvertaald naar de originele letter.";
        tableHeaders = ["Teken", "Hex"];

        pairs = method === "hexEncode"
            ? input.split("").map(c => [c, c.charCodeAt(0).toString(16)])
            : input.split(/\s+/).map(hex => [hex, String.fromCharCode(parseInt(hex, 16))]);
    }

    return (
        <BaseExplanation title={title} imageSrc={imageSrc} imageAlt={imageAlt}>
            <p className="mb-2">{description}</p>

            <div className="overflow-auto">
                <table className="table-fixed border-collapse text-sm font-mono">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-2 py-1">{tableHeaders[0]}</th>
                            <th className="border px-2 py-1">{tableHeaders[1]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pairs.map(([a, b], i) => (
                            <tr key={i}>
                                <td className="border px-2 py-1">{a}</td>
                                <td className="border px-2 py-1">{b}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="italic text-sm text-gray-700 mt-2">
                → {method.includes("ascii")
                    ? "Dit is een cijfercode gebaseerd op computertaal."
                    : "Dit type code wordt vaak gebruikt in computers en webtechnologie."
                }
            </p>
        </BaseExplanation>
    );
} 

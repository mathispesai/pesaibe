// components/explanations/FontExplanation.jsx
import React from "react";
import { BaseExplanation } from "./BaseExplanation.jsx";

export function FontExplanation({ method, imageSrc, imageAlt }) {
    const fontDescriptions = {
        brailleFontEncode: "Brailleschrift",
        brailleFontDecode: "Brailleschrift",
        raamFontEncode: "Raamcode",
        raamFontDecode: "Raamcode",
        dancingmenFontEncode: "Dancing Men",
        dancingmenFontDecode: "Dancing Men",
        chinoisFontEncode: "Chinees symboolschrift",
        chinoisFontDecode: "Chinees symboolschrift",
        hieroglyphsFontEncode: "Hiërogliefen",
        hieroglyphsFontDecode: "Hiërogliefen",
        semaphoreflagsFontEncode: "Semaforen",
        semaphoreflagsFontDecode: "Semaforen",
        morseEncode: "Morsecode",
        morseDecode: "Morsecode",
        windrose: "Windroosmethode",
        windroseDecode: "Windroosmethode"
    };

    const displayName = fontDescriptions[method] || "Symbolenschrift";

    if (method === "morseEncode" || method === "morseDecode") {
        return (
            <BaseExplanation title="🧠 Uitleg: Morsecode" imageSrc={imageSrc} imageAlt={imageAlt}>
                <p className="mb-2">
                    Elke letter wordt omgezet in streepjes en puntjes volgens de morsecode.
                    Woorden worden gescheiden met <code>/</code>, letters met een spatie.
                </p>
                <p className="mt-2 italic text-sm text-gray-700">
                    Om te ontcijferen, gebruik je de morsemolen
                    die hieronder staat. Naargelang het eerste
                    teken begin je bovenaan rechts of links. Je
                    daalt schuin rechts of links naar beneden
                    naargelang het tweede teken (punt = links of
                    gearceerd, streep = rechts) en zo verder.
                </p>
            </BaseExplanation>
        );
    }

    if (method === "windrose" || method === "windroseDecode") {
        return (
            <BaseExplanation title="🧭 Uitleg: Windroosmethode" imageSrc={imageSrc} imageAlt={imageAlt}>
                <p className="mb-2">
                    Een letter geef je weer door de twee
                    windrichtingen waartussen hij ligt. Je plaatst
                    een sterretje wanneer je de binnenste letter (q,r,s...)
                    bedoelt.
                </p>
                <p className="mb-2">
                    Je noteert eerst de hoofdwindrichting (N,O,Z of W) of de tussenwindrichting (NO,ZO,ZW,NW) en dan pas de (kleine) windrichting.
                </p>
            </BaseExplanation>
        );
    }

    // Generic font/symbol explanation
    return (
        <BaseExplanation title={`🧠 Uitleg: ${displayName}`} imageSrc={imageSrc} imageAlt={imageAlt}>
            <p className="mb-2">
                Deze codering gebruikt een speciaal lettertype waarbij elke letter een uniek symbool voorstelt.
                De betekenis zit in het uiterlijk van de tekens.
            </p>
            <p className="italic text-sm text-gray-700 mt-2">
                → Om te ontcijferen moet je het symbool opzoeken in een sleutel of lettertabel.
            </p>
        </BaseExplanation>
    );
}

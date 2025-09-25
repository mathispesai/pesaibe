// components/CipherExplanation.jsx
import React from "react";
import { BaseExplanation } from "./explanations/BaseExplanation.jsx";
import { YearMethodExplanation } from "./explanations/YearMethodExplanation.jsx";
import { RailFenceExplanation } from "./explanations/RailFenceExplanation.jsx";
import { PolybiusExplanation } from "./explanations/PolybiusExplanation.jsx";
import { CaesarExplanation } from "./explanations/CaesarExplanation.jsx";
import { SquareExplanation } from "./explanations/SquareExplanation.jsx";
import { AtbashExplanation } from "./explanations/AtbashExplanation.jsx";
import { LetterNumberExplanation } from "./explanations/LetterNumberExplanation.jsx";
import { SimpleMethodsExplanation } from "./explanations/SimpleMethodsExplanation.jsx";
import { FontExplanation } from "./explanations/FontExplanation.jsx";
import { AsciiHexExplanation } from "./explanations/AsciiHexExplanation.jsx";
import { KijkKleurExplanation } from "./explanations/KijkKleurExplanation.jsx";
import { CodewordExplanation } from "./explanations/CodewordExplanation.jsx";
import { LetterskipExplanation } from "./explanations/LetterskipExplanation.jsx";

// Import the imageMap from the config file
import { imageMap } from "../config/image_map.js";

export default function CipherExplanation({
    method,
    input,
    year,
    skip,
    shift = skip,
    wordList = [],
    kijkwoord = "KIJK-",
    kleurwoord = "KLEUR",
    codeword = "PARKBOCHT",
}) {
    if (!input || !method) return null;

    const imageSrc = imageMap[method];
    const imageAlt = `${method} sleutelafbeelding`;

    // Route to appropriate explanation component
    switch (method) {
        case "yearmethodEncode":
            return <YearMethodExplanation input={input} year={year} />;

        case "tralieEncode":
            return <RailFenceExplanation input={input} skip={skip} />;

        case "tralieDecode":
            return <RailFenceExplanation input={input} skip={skip} isDecoding={true} />;

        case "polybiusEncode":
            return <PolybiusExplanation input={input} />;

        case "polybiusDecode":
            return <PolybiusExplanation input={input} isDecoding={true} />;

        case "caesarCipher":
            return <CaesarExplanation input={input} shift={shift} />;

        case "squareEncode":
            return <SquareExplanation input={input} />;

        case "squareDecode":
            return <SquareExplanation input={input} isDecoding={true} />;

        case "atbashCipher":
            return <AtbashExplanation input={input} imageSrc={imageSrc} imageAlt={imageAlt} />;

        case "letterToNumber":
        case "numberToLetter":
            return <LetterNumberExplanation input={input} method={method} imageSrc={imageSrc} imageAlt={imageAlt} />;

        case "reverseWords":
        case "upsideDown":
        case "splitChunks":
            return <SimpleMethodsExplanation input={input} method={method} skip={skip} imageSrc={imageSrc} imageAlt={imageAlt} />;

        case "morseEncode":
        case "morseDecode":
        case "windrose":
        case "windroseDecode":
            return <FontExplanation method={method} imageSrc={imageSrc} imageAlt={imageAlt} />;

        case "brailleFontEncode":
        case "brailleFontDecode":
        case "raamFontEncode":
        case "raamFontDecode":
        case "chinoisFontEncode":
        case "chinoisFontDecode":
        case "dancingmenFontEncode":
        case "dancingmenFontDecode":
        case "hieroglyphsFontEncode":
        case "hieroglyphsFontDecode":
        case "semaphoreflagsFontEncode":
        case "semaphoreflagsFontDecode":
            return <FontExplanation method={method} imageSrc={imageSrc} imageAlt={imageAlt} />;

        case "asciiEncode":
        case "asciiDecode":
        case "hexEncode":
        case "hexDecode":
            return <AsciiHexExplanation input={input} method={method} imageSrc={imageSrc} imageAlt={imageAlt} />;

        case "kijkKleurEncode":
        case "kijkKleurDecode":
            return <KijkKleurExplanation kijkwoord={kijkwoord} kleurwoord={kleurwoord} imageSrc={imageSrc} imageAlt={imageAlt} />;

        case "codewordEncodeDecode":
            return <CodewordExplanation codeword={codeword} imageSrc={imageSrc} imageAlt={imageAlt} />;

        case "letterskip":
        case "letterskipDecode":
            return <LetterskipExplanation input={input} method={method} skip={skip} wordList={wordList} imageSrc={imageSrc} imageAlt={imageAlt} />;

        default:
            return null;
    }
}
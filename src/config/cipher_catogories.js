export const cipherCategories = {
    "Eenvoudig": [
        { id: "reverseWords", name: "Woorden omkeren", description: "Elk woord wordt omgekeerd", icon: "🔄" },
        { id: "upsideDown", name: "Tekst ondersteboven", description: "Tekst wordt omgedraaid", icon: "🙃" },
        { id: "splitChunks", name: "Tekst opdelen", description: "Opdelen in blokken met QR", icon: "📦" }
    ],
    "Substitutie": [
        { id: "caesarCipher", name: "Caesar verschuiving", description: "Letters verschuiven in alfabet", icon: "🏛️" },
        { id: "atbashCipher", name: "Atbash (A↔Z)", description: "Letters spiegelen in alfabet", icon: "🪞" },
        { id: "codewordEncodeDecode", name: "Codewoord substitutie", description: "Met codewoord versleutelen", icon: "🔑" },
        { id: "letterskip", name: "Lettersleutel (encode)", description: "Elke nth letter", icon: "🔤" },
        { id: "letterskipDecode", name: "Lettersleutel (decode)", description: "Ontsleutel nth letter", icon: "🔤" }
    ],
    "Matrix/Raster": [
        { id: "polybiusEncode", name: "Polybius matrix", description: "5×5 raster codering", icon: "⬜" },
        { id: "polybiusDecode", name: "Polybius (decode)", description: "5×5 raster ontsleutelen", icon: "⬜" },
        { id: "squareEncode", name: "Vierkant codering", description: "Tekst in vierkant plaatsen", icon: "🟨" },
        { id: "squareDecode", name: "Vierkant (decode)", description: "Vierkant ontsleutelen", icon: "🟨" },
        { id: "tralieEncode", name: "Tralieschrift", description: "Zigzag patroon", icon: "⚡" },
        { id: "tralieDecode", name: "Tralieschrift (decode)", description: "Zigzag ontsleutelen", icon: "⚡" },
        { id: "kijkKleurEncode", name: "Kijk-Kleur encode", description: "5×5 matrix met labels", icon: "🎯" },
        { id: "kijkKleurDecode", name: "Kijk-Kleur decode", description: "5×5 matrix ontsleutelen", icon: "🎯" }
    ],
    "Tijd-gebaseerd": [
        { id: "yearmethodEncode", name: "Jaartal methode", description: "Versleutelen met jaartal", icon: "📅" },
        { id: "yearmethodDecode", name: "Jaartal (decode)", description: "Ontsleutelen met jaartal", icon: "📅" }
    ],
    "Symbolen/Fonts": [
        { id: "morseEncode", name: "Morsecode", description: "Punten en strepen", icon: "📡" },
        { id: "morseDecode", name: "Morse (decode)", description: "Punten en strepen ontsleutelen", icon: "📡" },
        { id: "brailleFontEncode", name: "Braille", description: "Brailleschrift", icon: "👆" },
        { id: "brailleFontDecode", name: "Braille (decode)", description: "Brailleschrift ontsleutelen", icon: "👆" },
        { id: "raamFontEncode", name: "Raam", description: "Raamcode", icon: "🏠" },
        { id: "raamFontDecode", name: "Raam (decode)", description: "Raamcode ontsleutelen", icon: "🏠" },
        { id: "chinoisFontEncode", name: "Chinois", description: "Chinees symboolschrift", icon: "🀄" },
        { id: "chinoisFontDecode", name: "Chinois (decode)", description: "Chinees symboolschrift ontsleutelen", icon: "🀄" },
        { id: "dancingmenFontEncode", name: "Dancing Men", description: "Dancing Men code", icon: "🕺" },
        { id: "dancingmenFontDecode", name: "Dancing Men (decode)", description: "Dancing Men ontsleutelen", icon: "🕺" },
        { id: "hieroglyphsFontEncode", name: "Hiërogliefen", description: "Egyptische tekens", icon: "𓂀" },
        { id: "hieroglyphsFontDecode", name: "Hiërogliefen (decode)", description: "Egyptische tekens ontsleutelen", icon: "𓂀" },
        { id: "semaphoreflagsFontEncode", name: "Semaforen", description: "Vlaggen code", icon: "🚩" },
        { id: "semaphoreflagsFontDecode", name: "Semaforen (decode)", description: "Vlaggen code ontsleutelen", icon: "🚩" },
        { id: "windrose", name: "Windroos", description: "Windrichtingen", icon: "🧭" },
        { id: "windroseDecode", name: "Windroos (decode)", description: "Windrichtingen ontsleutelen", icon: "🧭" }
    ],
    "Nummer/Code": [
        { id: "letterToNumber", name: "Letter → Nummer", description: "A=1, B=2, enz.", icon: "🔢" },
        { id: "numberToLetter", name: "Nummer → Letter", description: "1=A, 2=B, enz.", icon: "🔢" },
        { id: "asciiEncode", name: "ASCII-code", description: "Computer karakters", icon: "💻" },
        { id: "asciiDecode", name: "ASCII (decode)", description: "Computer karakters ontsleutelen", icon: "💻" },
        { id: "hexEncode", name: "Hexadecimaal", description: "Base-16 codering", icon: "🔣" },
        { id: "hexDecode", name: "Hex (decode)", description: "Base-16 ontsleutelen", icon: "🔣" }
    ]
};
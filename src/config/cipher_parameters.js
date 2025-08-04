export const parameterConfig = {
    caesarCipher: {
        shift: {
            type: 'number',
            label: 'Verschuiving',
            min: -25,
            max: 25,
            default: 3,
            placeholder: "3"
        }
    },
    yearmethodEncode: {
        year: {
            type: 'text',
            label: 'Jaartal',
            placeholder: '1979',
            default: '1979'
        }
    },
    yearmethodDecode: {
        year: {
            type: 'text',
            label: 'Jaartal',
            placeholder: '1979',
            default: '1979'
        }
    },
    codewordEncodeDecode: {
        codeword: {
            type: 'text',
            label: 'Codewoord',
            placeholder: 'PARKBOCHT',
            default: 'PARKBOCHT'
        }
    },
    letterskip: {
        skip: {
            type: 'number',
            label: 'Sleutelgetal',
            min: 1,
            default: 1,
            placeholder: "1"
        }
    },
    letterskipDecode: {
        skip: {
            type: 'number',
            label: 'Sleutelgetal',
            min: 1,
            default: 1,
            placeholder: "1"
        }
    },
    tralieEncode: {
        skip: {
            type: 'number',
            label: 'Aantal rijen',
            min: 2,
            default: 2,
            placeholder: "2"
        }
    },
    tralieDecode: {
        skip: {
            type: 'number',
            label: 'Aantal rijen',
            min: 2,
            default: 2,
            placeholder: "2"
        }
    },
    splitChunks: {
        chunkCount: {
            type: 'number',
            label: 'Aantal blokken',
            min: 1,
            default: 3,
            placeholder: "3"
        }
    },
    kijkKleurEncode: {
        kijkwoord: {
            type: 'text',
            label: 'Kijkwoord',
            placeholder: 'KIJK-',
            default: 'KIJK-'
        },
        kleurwoord: {
            type: 'text',
            label: 'Kleurwoord',
            placeholder: 'KLEUR',
            default: 'KLEUR'
        }
    },
    kijkKleurDecode: {
        kijkwoord: {
            type: 'text',
            label: 'Kijkwoord',
            placeholder: 'KIJK-',
            default: 'KIJK-'
        },
        kleurwoord: {
            type: 'text',
            label: 'Kleurwoord',
            placeholder: 'KLEUR',
            default: 'KLEUR'
        }
    }
};
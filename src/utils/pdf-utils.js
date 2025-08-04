export const createPDFDownloadHandler = (downloadPDF) => {
    return (cipherState, chunkParts, qrImages) => () => {
        const { input, output, selectedMethod, parameters } = cipherState;

        downloadPDF({
            input, output, method: selectedMethod, chunkParts, qrImages,
            shift: parameters.shift,
            year: parameters.year,
            codeword: parameters.codeword,
            skip: parameters.skip,
            kijkwoord: parameters.kijkwoord,
            kleurwoord: parameters.kleurwoord
        });
    };
};
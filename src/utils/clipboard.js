export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return { success: true };
    } catch (err) {
        console.error('Failed to copy: ', err);
        return { success: false, error: err.message };
    }
};
import { useState, useCallback } from 'react';

export const useHistory = () => {
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const addToHistory = useCallback((entry) => {
        setHistory(prev => {
            // Als we niet aan het einde van de history zijn, verwijder alles na huidige index
            const newHistory = historyIndex >= 0 ? prev.slice(0, historyIndex + 1) : [];

            // Voeg nieuwe entry toe
            const updatedHistory = [...newHistory, entry];

            // Behoud maximaal 50 entries
            return updatedHistory.slice(-50);
        });

        setHistoryIndex(prev => {
            const newIndex = historyIndex >= 0 ? historyIndex + 1 : 0;
            return Math.min(newIndex, 49);
        });
    }, [historyIndex]);

    const undo = useCallback(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            return history[newIndex];
        }
        return null;
    }, [history, historyIndex]);

    const redo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            return history[newIndex];
        }
        return null;
    }, [history, historyIndex]);

    const canUndo = historyIndex > 0;
    const canRedo = historyIndex < history.length - 1;

    const getCurrentEntry = useCallback(() => {
        return history[historyIndex] || null;
    }, [history, historyIndex]);

    return {
        addToHistory,
        undo,
        redo,
        canUndo,
        canRedo,
        getCurrentEntry,
        // Debug info
        historyLength: history.length,
        currentIndex: historyIndex
    };
};
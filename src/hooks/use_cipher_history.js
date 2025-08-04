import { useEffect, useCallback, useRef } from 'react';
import { useHistory } from './use_history.js';

export const useCipherHistory = (input, selectedMethod) => {
    const { addToHistory, undo, redo, canUndo, canRedo } = useHistory();
    const isRestoringFromHistory = useRef(false);
    const lastHistoryKey = useRef('');
    const historyTimeoutRef = useRef(null);

    // Add to history only for meaningful inputs
    useEffect(() => {
        // Don't add to history if input is empty, too short, or we're restoring
        if (!input || input.trim().length < 2 || isRestoringFromHistory.current) {
            return;
        }

        // Clear existing timeout
        if (historyTimeoutRef.current) {
            clearTimeout(historyTimeoutRef.current);
        }

        // Debounce history additions
        historyTimeoutRef.current = setTimeout(() => {
            const currentKey = `${input.trim()}|${selectedMethod}`;

            if (currentKey !== lastHistoryKey.current) {
                try {
                    addToHistory({
                        input: input.trim(),
                        method: selectedMethod,
                        timestamp: Date.now()
                    });
                    lastHistoryKey.current = currentKey;
                } catch (error) {
                    console.error('History add error:', error);
                }
            }
        }, 1000); // 1 second debounce

        return () => {
            if (historyTimeoutRef.current) {
                clearTimeout(historyTimeoutRef.current);
            }
        };
    }, [input, selectedMethod, addToHistory]);

    const handleUndo = useCallback(() => {
        try {
            const prevEntry = undo();
            if (prevEntry) {
                isRestoringFromHistory.current = true;
                setTimeout(() => {
                    isRestoringFromHistory.current = false;
                }, 300);
                return prevEntry;
            }
        } catch (error) {
            console.error('Undo error:', error);
        }
        return null;
    }, [undo]);

    const handleRedo = useCallback(() => {
        try {
            const nextEntry = redo();
            if (nextEntry) {
                isRestoringFromHistory.current = true;
                setTimeout(() => {
                    isRestoringFromHistory.current = false;
                }, 300);
                return nextEntry;
            }
        } catch (error) {
            console.error('Redo error:', error);
        }
        return null;
    }, [redo]);

    return { handleUndo, handleRedo, canUndo, canRedo };
};
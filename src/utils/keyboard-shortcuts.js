import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts) => {
    useEffect(() => {
        const handleKeyboard = (e) => {
            const key = e.key.toLowerCase();
            const modifiers = {
                ctrl: e.ctrlKey || e.metaKey,
                shift: e.shiftKey,
                alt: e.altKey
            };

            Object.entries(shortcuts).forEach(([shortcut, handler]) => {
                const parts = shortcut.split('+');
                let match = true;

                // Check modifiers
                if (parts.includes('ctrl') && !modifiers.ctrl) match = false;
                if (parts.includes('shift') && !modifiers.shift) match = false;
                if (parts.includes('alt') && !modifiers.alt) match = false;

                // Check key
                const keyPart = parts[parts.length - 1];
                if (key !== keyPart) match = false;

                if (match) {
                    e.preventDefault();
                    handler();
                }
            });
        };

        window.addEventListener('keydown', handleKeyboard);
        return () => window.removeEventListener('keydown', handleKeyboard);
    }, [shortcuts]);
};
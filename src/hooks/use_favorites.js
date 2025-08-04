import { useState, useCallback, useEffect } from 'react';

const FAVORITES_STORAGE_KEY = 'cipher-favorites';

export const useFavorites = (initialFavorites = []) => {
    // Initialize favorites with initial values to match SSR
    const [favorites, setFavorites] = useState(initialFavorites);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load favorites from localStorage after hydration
    useEffect(() => {
        try {
            const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Only use saved favorites if it's a valid array
                if (Array.isArray(parsed)) {
                    setFavorites(parsed);
                }
            }
        } catch (error) {
            console.warn('Failed to load favorites from localStorage:', error);
        }

        setIsHydrated(true);
    }, []);

    // Save favorites to localStorage whenever they change (but only after hydration)
    useEffect(() => {
        if (!isHydrated) return;

        try {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
        } catch (error) {
            console.warn('Failed to save favorites to localStorage:', error);
        }
    }, [favorites, isHydrated]);

    const toggleFavorite = useCallback((methodId) => {
        setFavorites(prev =>
            prev.includes(methodId)
                ? prev.filter(id => id !== methodId)
                : [...prev, methodId]
        );
    }, []);

    const isFavorite = useCallback((methodId) => {
        return favorites.includes(methodId);
    }, [favorites]);

    const clearFavorites = useCallback(() => {
        setFavorites([]);
    }, []);

    const resetToDefaults = useCallback(() => {
        setFavorites(initialFavorites);
    }, [initialFavorites]);

    return {
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        resetToDefaults,
        isHydrated
    };
};
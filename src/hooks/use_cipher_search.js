import { useMemo } from 'react';

export const useCipherSearch = (methods, searchTerm, showFavoritesOnly, favorites) => {
    const filteredMethods = useMemo(() => {
        return Object.entries(methods).reduce((acc, [category, categoryMethods]) => {
            let filtered = categoryMethods;

            if (searchTerm) {
                filtered = filtered.filter(method =>
                    method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    method.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (showFavoritesOnly) {
                filtered = filtered.filter(method => favorites.includes(method.id));
            }

            if (filtered.length > 0) {
                acc[category] = filtered;
            }

            return acc;
        }, {});
    }, [methods, searchTerm, showFavoritesOnly, favorites]);

    return filteredMethods;
};
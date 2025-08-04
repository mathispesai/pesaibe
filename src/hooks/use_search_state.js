import { useState } from 'react';

export const useSearchState = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    return {
        searchTerm,
        setSearchTerm,
        showFavoritesOnly,
        setShowFavoritesOnly
    };
};
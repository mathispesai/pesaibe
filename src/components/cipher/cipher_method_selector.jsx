import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { CipherMethodCard } from './cipher_method_card.jsx';
import { cipherCategories } from '../../config/cipher_catogories.js';
import { useCipherSearch } from '../../hooks/use_cipher_search.js';

export const CipherMethodSelector = ({
    selectedMethod,
    onMethodSelect,
    favorites,
    onToggleFavorite,
    searchTerm,
    showFavoritesOnly
}) => {
    // Initialize all categories as collapsed except "Eenvoudig"
    const initialCollapsedState = useMemo(() => {
        const collapsed = {};
        Object.keys(cipherCategories).forEach(category => {
            collapsed[category] = category !== "Eenvoudig"; // Only "Eenvoudig" starts open
        });
        return collapsed;
    }, []);

    const [collapsedCategories, setCollapsedCategories] = useState(initialCollapsedState);

    const filteredMethods = useCipherSearch(
        cipherCategories,
        searchTerm,
        showFavoritesOnly,
        favorites
    );

    // Auto-open categories that have favorites when showing favorites only
    useEffect(() => {
        if (showFavoritesOnly && favorites.length > 0) {
            const newCollapsedState = {};
            let hasChanges = false;

            // Check each category for favorites
            Object.entries(cipherCategories).forEach(([category, methods]) => {
                const hasFavorites = methods.some(method => favorites.includes(method.id));
                if (hasFavorites) {
                    newCollapsedState[category] = false; // Open category
                    hasChanges = true;
                } else {
                    newCollapsedState[category] = collapsedCategories[category] ?? true;
                }
            });

            if (hasChanges) {
                setCollapsedCategories(prev => ({ ...prev, ...newCollapsedState }));
            }
        }
    }, [showFavoritesOnly, favorites]); // Removed collapsedCategories from dependencies

    const toggleCategory = (category) => {
        setCollapsedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Kies Cipher Methode</h2>

            {Object.keys(filteredMethods).length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <Search size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Geen methodes gevonden voor "{searchTerm}"</p>
                </div>
            ) : (
                Object.entries(filteredMethods).map(([category, methods]) => (
                    <div key={category} className="mb-6">
                        <button
                            className="flex items-center justify-between w-full p-2 text-left bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors mb-4"
                            onClick={() => toggleCategory(category)}
                        >
                            <h3 className="text-lg font-bold text-gray-800">{category}</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">{methods.length} methodes</span>
                                {collapsedCategories[category] ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                            </div>
                        </button>

                        {!collapsedCategories[category] && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {methods.map((method) => (
                                    <CipherMethodCard
                                        key={method.id}
                                        method={method}
                                        isSelected={selectedMethod === method.id}
                                        isFavorite={favorites.includes(method.id)}
                                        onSelect={() => onMethodSelect(method.id)}
                                        onToggleFavorite={() => onToggleFavorite(method.id)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};
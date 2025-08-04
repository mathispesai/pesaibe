import { Search, Star, Undo, Redo } from 'lucide-react';

export const CipherSearchBar = ({
    searchTerm,
    onSearchChange,
    showFavoritesOnly,
    onToggleFavorites,
    canUndo,
    canRedo,
    onUndo,
    onRedo
}) => {
    const handleFavoritesToggle = () => {
        // Toggle favorieten filter
        onToggleFavorites(!showFavoritesOnly);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">🔐 Geheimschrift Generator</h1>
                    <p className="text-gray-600 mt-1">Kies een methode en start met versleutelen</p>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                    {/* Undo/Redo */}
                    <div className="flex gap-1">
                        <button
                            onClick={onUndo}
                            disabled={!canUndo}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Ongedaan maken (Ctrl+Z)"
                        >
                            <Undo size={18} />
                        </button>
                        <button
                            onClick={onRedo}
                            disabled={!canRedo}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            title="Opnieuw (Ctrl+Y)"
                        >
                            <Redo size={18} />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Zoek methode..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    {/* Favorites filter - Fixed toggle */}
                    <button
                        onClick={handleFavoritesToggle}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${showFavoritesOnly
                                ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                    >
                        <Star size={16} fill={showFavoritesOnly ? "currentColor" : "none"} />
                        {showFavoritesOnly ? 'Alle tonen' : 'Favorieten'}
                    </button>
                </div>
            </div>
        </div>
    );
};
import { Star, StarOff } from 'lucide-react';

export const CipherMethodCard = ({ method, isSelected, isFavorite, onSelect, onToggleFavorite }) => (
    <div
        className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${isSelected
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
        onClick={onSelect}
    >
        <button
            className={`absolute top-2 right-2 p-1 rounded transition-colors ${isFavorite ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-400 hover:text-gray-600'
                }`}
            onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
            }}
        >
            {isFavorite ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
        </button>

        <div className="flex items-start gap-3">
            <span className="text-2xl">{method.icon}</span>
            <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{method.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{method.description}</p>
            </div>
        </div>
    </div>
);
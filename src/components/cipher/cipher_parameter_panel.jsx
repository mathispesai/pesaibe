import { parameterConfig } from '../../config/cipher_parameters.js';

// Completely stable Input component
const Input = ({ type, label, value, onChange, placeholder, min, max }) => {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                value={value || ''} // Always provide a fallback
                onChange={(e) => {
                    const newValue = type === 'number'
                        ? (e.target.value === '' ? '' : parseInt(e.target.value) || 0)
                        : e.target.value;
                    onChange(newValue);
                }}
                placeholder={placeholder}
                min={min}
                max={max}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
};

export const CipherParameterPanel = ({ method, parameters, onParameterChange }) => {
    const config = parameterConfig[method];

    if (!config) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h3>
            <div className="space-y-4">
                {Object.entries(config).map(([key, paramConfig]) => {
                    const currentValue = parameters[key] !== undefined ? parameters[key] : paramConfig.default;

                    return (
                        <Input
                            key={`${method}-${key}`}
                            type={paramConfig.type}
                            label={paramConfig.label}
                            value={currentValue}
                            onChange={(value) => onParameterChange(key, value)}
                            placeholder={paramConfig.placeholder}
                            min={paramConfig.min}
                            max={paramConfig.max}
                        />
                    );
                })}
            </div>
        </div>
    );
};
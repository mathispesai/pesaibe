export const Input = ({ type, label, value, onChange, placeholder, min, max, className = "" }) => {
    const inputProps = {
        className: `w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${className}`,
        value: value || '',
        onChange: (e) => onChange(e.target.value),
        placeholder
    };

    if (type === 'number') {
        return (
            <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <input type="number" min={min} max={max} {...inputProps} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input type="text" {...inputProps} />
        </div>
    );
};
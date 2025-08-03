
// components/explanations/BaseExplanation.jsx
import React from "react";

export function BaseExplanation({ title, children, imageSrc, imageAlt }) {
    return (
        <>
            <div className="border p-4 bg-blue-50 rounded mt-4">
                <h2 className="font-bold text-lg mb-2">{title}</h2>
                {children}
            </div>
            {imageSrc && (
                <div className="mt-4">
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="rounded border shadow max-w-full mx-auto"
                    />
                    <p className="italic text-sm text-gray-700 text-center mt-2">
                        ↳ Sleuteltabel voor deze methode
                    </p>
                </div>
            )}
        </>
    );
}

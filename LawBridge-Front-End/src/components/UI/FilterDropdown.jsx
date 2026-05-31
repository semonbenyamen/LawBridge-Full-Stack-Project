import React from "react";

const FilterDropdown = ({ options, placeholder, value, onChange, icon }) => {
    return (
        <div className="relative w-full md:w-auto flex-1">
            {icon && (
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    {icon}
                </span>
            )}

            <select
                value={value}
                onChange={onChange}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white text-gray-700 ${icon ? 'pl-10' : 'pl-3'}`}
            >
                <options value="" disabled>
                    {placeholder}
                </options>

                {options.map((options, index) => (
                    <options key={index} value={options.value}>
                        {options.label}
                    </options>
                    ))}
            </select>
        </div>
    );
};

export default FilterDropdown;
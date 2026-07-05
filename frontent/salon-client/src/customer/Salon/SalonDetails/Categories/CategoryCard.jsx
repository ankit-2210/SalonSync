import React from "react";

const CategoryCard = ({ handleCategoryClick, selectedCategory, item }) => {
    const isSelected = selectedCategory?.id === item?.id;

    return (
        <div
            onClick={() => handleCategoryClick(item)}
            className={`
                flex items-center gap-3 p-3 cursor-pointer rounded-2xl transition-all duration-300
                ${isSelected
                    ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-md scale-[1.02]"
                    : "bg-white hover:bg-green-50 text-gray-700"}
            `}
        >
            <img
                className={`
                    w-14 h-14 object-cover rounded-xl transition-all duration-300
                    ${isSelected ? "ring-2 ring-white" : "shadow-sm"}
                `}
                src={item?.image || "https://via.placeholder.com/100"}
                alt={item?.name || "category"}
            />

            <h2 className={`font-medium text-sm ${isSelected ? "text-white" : "text-gray-800"}`}>
                {item?.name || "Unnamed"}
            </h2>
        </div>
    );
};

export default CategoryCard;
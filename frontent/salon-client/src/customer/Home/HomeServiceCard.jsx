import React from 'react'

const HomeServiceCard = ({ item }) => {
    return (
        <div className="group relative flex flex-col items-center justify-center gap-4 
            rounded-2xl p-5 w-36 h-52 
            bg-white/80 backdrop-blur-md
            shadow-sm border border-gray-100
            hover:shadow-2xl hover:-translate-y-3 
            transition-all duration-300 cursor-pointer">

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br 
                from-green-100 to-green-200 opacity-0 
                group-hover:opacity-30 transition duration-300 blur-xl">
            </div>

            {/* Icon */}
            <div className="relative bg-gradient-to-br from-green-100 to-green-200 
                p-3 rounded-full 
                group-hover:scale-110 group-hover:rotate-6
                transition duration-300">

                <img
                    className="w-16 h-16 rounded-full object-cover"
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                />
            </div>

            {/* Title */}
            <h2 className="text-center font-semibold text-gray-700 text-sm 
                group-hover:text-green-600 transition">
                {item.name}
            </h2>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-green-500 
                group-hover:w-full transition-all duration-300 rounded-b-2xl">
            </div>

        </div>
    )
}

export default HomeServiceCard
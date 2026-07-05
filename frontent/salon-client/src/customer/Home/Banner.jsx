import React from 'react'

const Banner = () => {
    return (
        <div className="w-full relative h-[85vh] overflow-hidden">

            {/* 🎬 Background Video */}
            <video
                className="w-full h-full object-cover"
                muted
                autoPlay
                loop
                playsInline
                src="https://booksy-public.s3.amazonaws.com/horizontal_.webm"
            />

            {/* 🌑 Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10"></div>

            {/* ✨ Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white px-5 space-y-6">

                {/* Heading */}
                <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                    Be Your <span className="text-green-400">Best Self</span>
                </h2>

                {/* Subtitle */}
                <p className="text-gray-300 text-lg md:text-2xl font-medium max-w-2xl">
                    Discover & book premium beauty and wellness services near you ✨
                </p>

                {/* 🔍 Search Bar */}
                <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg w-full max-w-xl">

                    <input
                        type="text"
                        placeholder="Search salon, service..."
                        className="flex-1 px-5 py-3 text-black outline-none"
                    />

                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 transition">
                        Search
                    </button>
                </div>

                {/* 🎯 CTA Button */}
                <button className="mt-4 px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition">
                    Explore Services
                </button>

            </div>
        </div>
    )
}

export default Banner
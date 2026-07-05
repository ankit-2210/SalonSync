import React from 'react'
import Banner from './Banner'
import HomeServiceCard from './HomeServiceCard'
import { services } from "../../data/services"
import SalonCarousel from '../Salon/SalonCarousel'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate();
    const handleViewAll = () => {
        navigate("/salons");
    }

    return (
        <div className="bg-gray-50 space-y-24">
            {/* 🔹 Banner */}
            <section>
                <Banner />
            </section>

            {/* 🔹 Services Section */}
            <section className="max-w-7xl mx-auto px-5 lg:px-10 flex flex-col lg:flex-row items-center gap-12">
                {/* LEFT SIDE */}
                <div className="w-full lg:w-1/2">
                    {/* Heading */}
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-snug">
                        What are you looking for,{" "}
                        <span className="text-green-600">Bestie?</span>
                    </h2>
                    <p className="text-gray-500 mt-3 mb-8 text-sm">
                        Discover premium salon services tailored just for you ✨
                    </p>
                    {/* Services Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {
                            services.map((item) => (
                                <HomeServiceCard key={item.id} item={item} />
                            ))
                        }
                    </div>
                </div>

                {/* RIGHT SIDE (IMAGE GRID) */}
                <div className="w-full lg:w-1/2 grid grid-cols-2 grid-rows-12 gap-4 h-[55vh] md:h-[90vh]">
                    {[
                        {
                            src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
                            title: "Hair Styling",
                            span: "row-span-7"
                        },
                        {
                            src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
                            title: "Makeup",
                            span: "row-span-5"
                        },
                        {
                            src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
                            title: "Hair Cut",
                            span: "row-span-7"
                        },
                        {
                            src: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1",
                            title: "Spa & Relax",
                            span: "row-span-5"
                        }
                    ].map((img, index) => (
                        <div
                            key={index}
                            className={`${img.span} relative group overflow-hidden rounded-2xl shadow-md`}
                        >
                            <img
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                                src={img.src}
                                alt={img.title}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                <p className="text-white text-lg font-semibold tracking-wide">
                                    {img.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-9xl mx-auto px-2 lg:px-20 py-12">
                {/* Heading */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                            Book your <span className="text-green-600">favorite salon</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm">
                            Discover top-rated salons near you and book instantly ✨
                        </p>
                    </div>
                    {/* Optional Button */}
                    <button onClick={handleViewAll} className="self-start md:self-auto px-5 py-2 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition">
                        View All
                    </button>
                </div>

                <div className="px-2">
                    <SalonCarousel />
                </div>
            </section>
        </div>
    )
}

export default Home
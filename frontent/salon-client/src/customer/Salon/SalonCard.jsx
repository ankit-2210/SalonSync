import React, { useEffect } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesBySalonId } from '../../Redux/Category/categorySlice';

const SalonCard = ({ salon }) => {
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/salon/${salon.id}`);
    }
    const handleBookClick = (e) => {
        e.stopPropagation();
        navigate(`/salon/${salon.id}`);
    }

    return (
        <div onClick={handleCardClick} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer group">
            {/* Image */}
            <div className="relative overflow-hidden">
                <img
                    className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
                    src={salon.images?.[0] || "https://via.placeholder.com/300"}
                    alt={salon.name}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <p className="text-white font-semibold">View Details</p>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">
                    {salon.name}
                </h2>
                <p className="text-sm text-gray-500">
                    {salon.city}
                </p>
                {/* Rating */}
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                        <StarIcon className="text-yellow-400" style={{ fontSize: 18 }} />
                        {salon.rating || "4.5"}
                    </div>
                    <button onClick={handleBookClick}
                        className="text-sm text-white bg-green-600 px-4 py-1 rounded-full hover:bg-green-700 transition">
                        Book
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SalonCard;
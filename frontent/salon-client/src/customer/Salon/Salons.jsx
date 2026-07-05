import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSalons } from '../../Redux/Salon/salonSlice'
import StarIcon from '@mui/icons-material/Star'
import { useNavigate } from 'react-router-dom';

const Salons = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { salons, loading } = useSelector((state) => state.salon);

    const [search, setSearch] = useState("");
    const [cityFilter, setCityFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const salonsPerPage = 5;

    useEffect(() => {
        dispatch(fetchSalons());
    }, [dispatch]);

    // 🔍 FILTER + SEARCH
    const filteredSalons = salons.filter((salon) => {
        return (
            salon.name.toLowerCase().includes(search.toLowerCase()) &&
            (cityFilter === "" || salon.city === cityFilter)
        );
    });

    // 📄 PAGINATION
    const indexOfLast = currentPage * salonsPerPage;
    const indexOfFirst = indexOfLast - salonsPerPage;
    const currentSalons = filteredSalons.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredSalons.length / salonsPerPage);

    // 🏙️ Unique cities
    const cities = [...new Set(salons.map(s => s.city))];

    const handleClickSalon = (id) => {
        navigate(`/salon/${id}`);
    }

    return (
        <div className="max-w-7xl mx-auto px-5 py-10">
            {/* 🔍 Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search salon..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full md:w-1/2 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select
                    value={cityFilter}
                    onChange={(e) => {
                        setCityFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-full"
                >
                    <option value="">All Cities</option>
                    {cities.map((city, i) => (
                        <option key={i} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            {/* 🧱 Skeleton Loader */}
            {loading && (
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="animate-pulse flex gap-4 bg-white p-4 rounded-2xl shadow">
                            <div className="w-1/3 h-32 bg-gray-300 rounded-xl"></div>
                            <div className="flex-1 space-y-3">
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* 🏪 Salon List */}
            {!loading && (
                <div className="space-y-6">
                    {currentSalons.map((salon) => (
                        <div
                            key={salon.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col md:flex-row overflow-hidden"
                        >
                            {/* Image */}
                            <img
                                src={salon.images?.[0]}
                                className="w-full md:w-1/3 h-52 object-cover"
                                alt={salon.name}
                            />
                            {/* Content */}
                            <div className="p-5 flex flex-col justify-between w-full">
                                <div>
                                    <h2 className="text-xl font-semibold">{salon.name}</h2>
                                    <p className="text-gray-500 text-sm">{salon.address}</p>
                                    <p className="text-gray-500 text-sm">{salon.city}</p>
                                </div>
                                {/* Bottom */}
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                                        <StarIcon className="text-yellow-400" style={{ fontSize: 18 }} />
                                        {salon.rating || "4.5"}
                                    </div>
                                    <button onClick={() => handleClickSalon(salon.id)} className="bg-green-600 text-white px-4 py-1 rounded-full hover:bg-green-700 transition">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 📄 Pagination */}
            {!loading && (
                <div className="flex justify-center mt-10 gap-2 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-full border transition ${currentPage === page
                                ? "bg-green-600 text-white"
                                : "bg-white hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Salons;
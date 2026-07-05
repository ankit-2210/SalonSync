import React, { useEffect, useState } from 'react'
import BookingCard from './BookingCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerBookings } from '../../Redux/Booking/bookingSlice'
import { useSearchParams } from 'react-router-dom'

const Bookings = () => {
    const [searchParams] = useSearchParams();
    const initialTab = searchParams.get("tab") || "upcoming";
    const [tab, setTab] = useState(initialTab);

    const dispatch = useDispatch();
    const { bookings, loading } = useSelector(state => state.booking);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchCustomerBookings());
    }, [dispatch]);

    const mapStatus = (status) => {
        if (status === "PENDING") return "upcoming";
        if (status === "CONFIRMED") return "completed";
        if (status === "CANCELLED") return "cancelled";
        return "";
    };

    const filtered = (bookings || []).filter(
        (b) => mapStatus(b.bookingStatus) === tab
    );

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentBookings = filtered.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    return (
        <div className="min-h-screen bg-gray-50 px-5 md:px-10 flex flex-col items-center mt-10">
            <div className="w-full md:w-[45rem]">
                <h2 className="text-2xl font-semibold text-gray-900 py-6">
                    My Bookings
                </h2>

                {/* ✅ TABS */}
                <div className="flex gap-2 mb-6 bg-gray-200 p-1 rounded-xl w-fit">
                    {["upcoming", "completed", "cancelled"].map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setTab(item);
                                setCurrentPage(1); // reset page
                            }}
                            className={`px-4 py-1.5 rounded-lg text-sm capitalize transition
                                ${tab === item
                                    ? "bg-white shadow-sm text-black"
                                    : "text-gray-600 hover:text-black"}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* ✅ LIST */}
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="space-y-6">
                            {currentBookings.length > 0 ? (
                                currentBookings.map((b) => (
                                    <BookingCard key={b.id} booking={b} />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center py-10">
                                    No {tab} bookings
                                </p>
                            )}
                        </div>

                        {/* ✅ PAGINATION */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Prev
                                </button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 rounded 
                                            ${currentPage === i + 1
                                                ? "bg-black text-white"
                                                : "bg-gray-200"}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Bookings;
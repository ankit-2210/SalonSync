import React from 'react'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import Swal from "sweetalert2";
import { updateBookingStatus } from '../../Redux/Booking/bookingSlice';
import { useNavigate } from 'react-router-dom';

const getStatusColor = (status) => {
    switch (status) {
        case "CONFIRMED":
            return "bg-green-100 text-green-700";
        case "PENDING":
            return "bg-yellow-100 text-yellow-700";
        case "CANCELLED":
            return "bg-red-100 text-red-600";
        default:
            return "bg-gray-100 text-gray-600";
    }
}

const BookingCard = ({ booking }) => {
    const dispatch = useDispatch();
    const salon = booking.salonDto;
    const navigate = useNavigate();

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short"
        });

    const formatTime = (date) =>
        new Date(date).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });

    const totalDuration = booking.serviceDtoList.reduce((sum, s) => sum + s.duration, 0);
    const handleCancel = async () => {
        const res = await Swal.fire({
            title: "Cancel booking?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Cancel",
            confirmButtonColor: "#dc2626"
        });
        if (res.isConfirmed) {
            try {
                const resultAction = await dispatch(
                    updateBookingStatus({
                        bookingId: booking.id,
                        status: "CANCELLED"
                    })
                )
                if (updateBookingStatus.fulfilled.match(resultAction)) {
                    await Swal.fire({
                        title: "Cancelled",
                        text: "Your booking has been cancelled",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });

                    navigate("/bookings?tab=cancelled");
                }
                else {
                    throw new Error("Failed");
                }
            }
            catch (err) {
                Swal.fire("Error", "Failed to cancel booking", "error");
            }
        }
    }

    const handleCalendar = () => {
        const start = new Date(booking.startTime).toISOString().replace(/[-:]/g, "").split(".")[0];
        const end = new Date(booking.endTime).toISOString().replace(/[-:]/g, "").split(".")[0];

        const url = `https://www.google.com/calendar/render?action=TEMPLATE
        &text=${encodeURIComponent(salon.name)}
        &dates=${start}/${end}
        &details=${encodeURIComponent("Salon Booking")}
        &location=${encodeURIComponent(salon.address)}`;

        window.open(url, "_blank");
    };

    const handleInvoice = () => {
        const blob = new Blob(
            [`Invoice\nBooking ID: ${booking.id}\nAmount: ₹${booking.totalPrice}`],
            { type: "text/plain" }
        );

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${booking.id}.txt`;
        a.click();
    }

    return (
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">
            {/* IMAGE */}
            <div className="relative h-44">
                <img src={salon.images?.[0]} className="w-full h-full object-cover" alt={salon.name} />
                {/* STATUS */}
                <div className={`absolute top-3 right-3 px-3 py-1 text-xs rounded-full font-medium ${getStatusColor(booking.bookingStatus)}`}>
                    {booking.bookingStatus}
                </div>
            </div>
            {/* BODY */}
            <div className="p-5 space-y-4">
                {/* SALON INFO */}
                <div>
                    <h3 className="text-lg font-semibold">{salon.name}</h3>
                    <p className="text-sm text-gray-500">
                        {salon.address}, {salon.city}
                    </p>
                    <p className="text-xs text-gray-400">
                        📞 {salon.phoneNumber}
                    </p>
                </div>
                {/* TIME */}
                <div className="flex justify-between text-sm text-gray-600">
                    <span>📅 {formatDate(booking.startTime)}</span>
                    <span>⏰ {formatTime(booking.startTime)}</span>
                </div>
                {/* SERVICES */}
                <div className="space-y-2">
                    {booking.serviceDtoList.map((s) => (
                        <div key={s.id} className="flex gap-3 items-center bg-gray-50 p-2 rounded-xl">
                            <img
                                src={s.image || "https://via.placeholder.com/50"}
                                className="w-12 h-12 rounded-lg object-cover"
                                alt={s.name}
                            />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{s.name}</p>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                    {s.description}
                                </p>
                            </div>
                            <span className="text-sm font-semibold">₹{s.price}</span>
                        </div>
                    ))}
                </div>
                {/* FOOTER */}
                <div className="flex justify-between items-center pt-3 border-t">
                    <div className="text-xs text-gray-500">
                        ⏱ {totalDuration} mins <br />
                        🕒 {salon.openTime} - {salon.closeTime}
                    </div>
                    <div className="text-lg font-bold">
                        ₹{booking.totalPrice}
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-2 pt-3">
                    {/* Cancel */}
                    {booking.bookingStatus === "PENDING" && (
                        <button onClick={handleCancel} className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg">
                            Cancel
                        </button>
                    )}
                    {/* Rebook */}
                    <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg"
                        onClick={() => window.location.href = `/salon/${salon.id}`}>
                        Rebook
                    </button>
                    {/* Calendar */}
                    <button onClick={handleCalendar}
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg">
                        Add to Calendar
                    </button>
                    {/* Invoice */}
                    <button onClick={handleInvoice}
                        className="px-3 py-1 text-sm bg-green-50 text-green-600 rounded-lg">
                        Invoice
                    </button>
                    {/* Rating */}
                    {booking.bookingStatus === "CONFIRMED" && (
                        <button
                            onClick={() =>
                                Swal.fire("Rate Service", "⭐ ⭐ ⭐ ⭐ ⭐", "info")
                            }
                            className="px-3 py-1 text-sm bg-yellow-50 text-yellow-700 rounded-lg">
                            Rate
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookingCard
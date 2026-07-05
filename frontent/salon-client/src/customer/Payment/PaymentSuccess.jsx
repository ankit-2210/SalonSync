import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { proceedPayment } from "../../Redux/Payment/paymentSlice";
import { fetchBookingById } from "../../Redux/Booking/bookingSlice";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
    const { orderId } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { booking, loading } = useSelector((state) => state.booking);
    const paymentId = searchParams.get("razorpay_payment_id");
    const paymentLinkId = searchParams.get("razorpay_payment_link_id");
    const status = searchParams.get("razorpay_payment_link_status");

    useEffect(() => {
        const process = async () => {
            try {
                if (status !== "paid") {
                    Swal.fire("Payment Failed", "Try again", "error");
                    return;
                }

                await dispatch(proceedPayment({ paymentId, paymentLinkId })).unwrap();
                await dispatch(fetchBookingById(orderId)).unwrap();
            }
            catch (err) {
                Swal.fire("Error", err.message || "Something went wrong", "error");
            }
        };

        if (orderId) process();
    }, [dispatch, orderId, paymentId, paymentLinkId, status]);

    if (loading || !booking) {
        return (
            <div className="h-screen flex justify-center items-center">
                <p className="text-lg font-semibold">Processing payment...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4 flex justify-center">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* HERO */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center py-8">
                    <CheckCircle size={50} className="mx-auto mb-3" />
                    <h1 className="text-2xl font-bold">Payment Successful</h1>
                    <p className="text-sm opacity-90">Your booking is confirmed</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* SALON IMAGES */}
                    <div className="flex gap-2 overflow-x-auto">
                        {booking.salonDto.images.map((img, i) => (
                            <img alt={img}
                                key={i}
                                src={img}
                                className="w-32 h-20 rounded-xl object-cover"
                            />
                        ))}
                    </div>
                    {/* SALON INFO CARD */}
                    <div className="bg-gray-50 p-4 rounded-2xl shadow-sm">
                        <h2 className="text-lg font-semibold mb-1">
                            {booking.salonDto.name}
                        </h2>
                        <p className="text-sm text-gray-500 mb-2">
                            {booking.salonDto.address}, {booking.salonDto.city}
                        </p>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p>📞 {booking.salonDto.phoneNumber}</p>
                            <p>📧 {booking.salonDto.email}</p>
                            <p>
                                🕒 {booking.salonDto.openTime} - {booking.salonDto.closeTime}
                            </p>
                        </div>
                    </div>

                    {/* SERVICES */}
                    <div>
                        <h3 className="font-semibold mb-3">Services</h3>
                        <div className="space-y-3">
                            {booking.serviceDtoList.map((s) => (
                                <div key={s.id} className="flex gap-3 bg-gray-50 p-3 rounded-xl shadow-sm">
                                    <img src={`http://localhost:5000/images/${s.image}`}
                                        className="w-16 h-16 rounded-lg object-cover" alt={`http://localhost:5000/images/${s.image}`} />
                                    <div className="flex-1">
                                        <p className="font-medium">{s.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {s.description}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            ⏱ {s.duration} mins
                                        </p>
                                    </div>
                                    <p className="font-semibold">₹{s.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BOOKING TIMELINE */}
                    <div className="bg-gray-50 p-4 rounded-2xl">
                        <h3 className="font-semibold mb-2">Booking Details</h3>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Date</span>
                            <span>
                                {new Date(booking.startTime).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">Time</span>
                            <span>
                                {new Date(booking.startTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Duration</span>
                            <span>
                                {booking.serviceDtoList.reduce((a, s) => a + s.duration, 0)} mins
                            </span>
                        </div>
                    </div>
                    {/* USER */}
                    <div className="bg-gray-50 p-4 rounded-2xl text-sm">
                        <h3 className="font-semibold mb-2">Customer</h3>
                        <p>{booking.userDto.fullName}</p>
                        <p className="text-gray-500">{booking.userDto.email}</p>
                    </div>
                    {/* TOTAL */}
                    <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
                        <span>Total Paid</span>
                        <span className="text-green-600">₹{booking.totalPrice}</span>
                    </div>
                    {/* ACTION */}
                    <button onClick={() => navigate("/bookings")}
                        className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition">
                        View My Bookings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
import React, { useState } from "react";
import { Dialog, DialogContent, Button, TextField, Divider } from "@mui/material";
import { Calendar, Clock } from "lucide-react";
import { useDispatch } from "react-redux";
import { createBooking } from "../../../Redux/Booking/bookingSlice";
import Swal from "sweetalert2";

const BookingModal = ({ open, onClose, services, salonId }) => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const dispatch = useDispatch();
    const totalPrice = services.reduce((sum, s) => sum + (s.price || 0), 0);
    const totalDuration = services.reduce((sum, s) => sum + Number(s.duration || 0), 0);

    const handleBooking = () => {
        const startTime = `${selectedDate}T${selectedTime}`;
        onClose();
        Swal.fire({
            title: "Confirm Booking?",
            html: `
                <div style="text-align:left">
                    <p><b>Total Price:</b> ₹${totalPrice}</p>
                    <p><b>Total Duration:</b> ${totalDuration} mins</p>
                    <p><b>Date:</b> ${selectedDate}</p>
                    <p><b>Time:</b> ${selectedTime}</p>
                </div>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Book Now",
            confirmButtonColor: "#111827"
        }).then((result) => {
            if (result.isConfirmed) {
                const bookingData = {
                    startTime,
                    serviceIds: services.map((s) => s.id)
                };

                dispatch(createBooking({ salonId, bookingData }))
                    .unwrap()
                    .then((res) => {
                        if (!res?.success || !res?.data?.paymentLinkUrl) {
                            Swal.fire({
                                title: "Booking Failed",
                                text: res?.message || "Unable to create booking",
                                icon: "error"
                            });
                            return;
                        }

                        Swal.fire({
                            title: "Booking Created!",
                            text: "Redirecting to payment...",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });

                        setTimeout(() => {
                            window.location.href = res.data.paymentLinkUrl;
                        }, 2000)
                    })
                    .catch((err) => {
                        Swal.fire({
                            title: "Error",
                            text: err?.message || "Something went wrong",
                            icon: "error"
                        });
                    })
            }
        });
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogContent className="p-6">
                {/* HEADER */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold">Confirm Booking</h2>
                    <p className="text-gray-500 text-sm">Review your services and select slot</p>
                </div>
                {/* SERVICES */}
                <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                    {services.map((service) => (
                        <div key={service.id} className="flex justify-between items-center bg-gray-50 rounded-xl p-3" >
                            <div className="flex gap-3 items-center">
                                <img src={service.image || "https://via.placeholder.com/60"} alt={service.name}
                                    className="w-12 h-12 rounded-lg object-cover" />
                                <div>
                                    <p className="font-medium text-sm">{service.name}</p>
                                    <p className="text-xs text-gray-500">{service.duration} mins</p>
                                </div>
                            </div>
                            <p className="font-semibold text-sm">₹{service.price}</p>
                        </div>
                    ))}
                </div>
                <Divider className="my-5" />
                {/* SUMMARY */}
                <div className="bg-gray-100 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Duration</span>
                        <span className="font-medium">{totalDuration} mins</span>
                    </div>
                    <div className="flex justify-between text-base">
                        <span className="font-semibold">Total Price</span>
                        <span className="font-bold">₹{totalPrice}</span>
                    </div>
                </div>
                {/* DATE & TIME */}
                <div className="grid grid-cols-2 gap-3 mt-5">
                    <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <TextField variant="standard" type="date" fullWidth value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)} />
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <TextField variant="standard" type="time" fullWidth value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)} />
                    </div>
                </div>
                {/* ACTION */}
                <div className="mt-6">
                    <Button fullWidth variant="contained" size="large"
                        disabled={!selectedDate || !selectedTime} className="rounded-xl py-3 text-base bg-black hover:bg-gray-900"
                        onClick={handleBooking}>
                        Confirm & Pay
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
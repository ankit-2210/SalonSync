import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useDispatch } from "react-redux";
import { markNotificationAsRead } from "../../Redux/Notification/NotificationSlice";
import { toast } from "react-toastify";

const NotificationCard = ({ notification }) => {
    const dispatch = useDispatch();

    const booking = notification.bookingDto;
    const salon = booking?.salonDto;

    const handleClick = async () => {
        if (!notification.isRead) {
            try {
                await dispatch(markNotificationAsRead(notification.id));
                toast.success("Marked as read ✅");
            }
            catch (err) {
                toast.error("Failed to update notification");
            }
        }

    };

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short"
        });

    const formatTime = (date) =>
        new Date(date).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });

    return (
        <div
            onClick={handleClick}
            className={`flex gap-4 p-4 rounded-xl border transition cursor-pointer
            ${notification.isRead
                    ? "bg-white border-gray-200"
                    : "bg-orange-50 border-orange-100"}
            hover:shadow-md active:scale-[0.98]`}>
            <div className="flex-shrink-0">
                <div className="bg-gray-100 p-3 rounded-xl">
                    <NotificationsNoneIcon className="text-gray-600" />
                </div>
            </div>
            <div className="flex-1 space-y-1">
                <p className="text-sm font-semibold text-gray-900">
                    {booking?.bookingStatus === "CONFIRMED"
                        ? "Booking Confirmed 🎉"
                        : booking?.bookingStatus === "CANCELLED"
                            ? "Booking Cancelled"
                            : "Booking Update"}
                </p>
                <p className="text-sm text-gray-600">
                    {salon?.name || "Salon"} • {salon?.city}
                </p>
                <p className="text-xs text-gray-500 line-clamp-1">
                    {booking?.serviceDtoList?.map(s => s.name).join(", ")}
                </p>
                <p className="text-xs text-gray-400">
                    📅 {formatDate(booking?.startTime)} • ⏰ {formatTime(booking?.startTime)}
                </p>
                <p className="text-sm font-semibold text-gray-800">
                    ₹{booking?.totalPrice}
                </p>
            </div>
            <div className="flex flex-col items-end justify-between">
                {!notification.isRead && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                )}
                <p className="text-xs text-gray-400 mt-auto">
                    {notification.createdAt
                        ? new Date(notification.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                        : "Now"}
                </p>
            </div>
        </div>
    );
};

export default NotificationCard;
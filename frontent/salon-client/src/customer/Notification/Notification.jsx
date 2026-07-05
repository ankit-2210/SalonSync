import React, { useEffect } from "react";
import NotificationCard from "./NotificationCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotificationByUser } from "../../Redux/Notification/NotificationSlice";
import ServiceUnavailable from "../../layout/ServiceUnavailable";

const groupByDate = (notifications) => {
    const groups = {
        today: [],
        yesterday: [],
        older: []
    };

    const now = new Date();
    notifications.forEach((n) => {
        const date = new Date(n.createdAt || n.bookingDto?.startTime || new Date());
        const diff = (now - date) / (1000 * 60 * 60 * 24);
        if (diff < 1) {
            groups.today.push(n);
        }
        else if (diff < 2) {
            groups.yesterday.push(n);
        }
        else {
            groups.older.push(n);
        }
    });

    return groups;
};

const Section = ({ title, data }) => {
    if (!data.length)
        return null;
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 px-1">
                {title}
            </h3>
            {data.map((n) => (
                <NotificationCard key={n.id} notification={n} />
            ))}
        </div>
    );
};

const Notification = () => {
    const dispatch = useDispatch();
    const { notifications, loading, error } = useSelector((state) => state.notification);

    const { user } = useSelector((state) => state.auth);
    const userId = user?.id;

    useEffect(() => {
        dispatch(fetchNotificationByUser(userId));
    }, [dispatch, userId]);

    if (!error?.success) {
        return <ServiceUnavailable serviceName="Notification Service" message={error?.message} />
    }

    const grouped = groupByDate(notifications);
    console.log(notifications);

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-8">
            <div className="w-full max-w-xl">
                {/* HEADER */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Notifications
                </h2>
                {loading ? (
                    <p className="text-gray-500 text-center">Loading...</p>
                ) : notifications.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        No notifications yet
                    </div>
                ) : (
                    <div className="space-y-6">
                        <Section title="Today" data={grouped.today} />
                        <Section title="Yesterday" data={grouped.yesterday} />
                        <Section title="Earlier" data={grouped.older} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notification;
import React from 'react'

const StatusChip = ({ status }) => {
    const styles = {
        Completed: "bg-green-100 text-green-600",
        Pending: "bg-yellow-100 text-yellow-600",
        Cancelled: "bg-red-100 text-red-600",
    };

    return (
        <span className={`px-3 py-1 text-xs rounded-full ${styles[status]}`}>
            {status}
        </span>
    );
};

export default StatusChip;
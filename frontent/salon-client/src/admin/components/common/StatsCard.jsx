import React from 'react'

const StatsCard = ({ label, value }) => {
    return (
        <div className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md">
            <p className="text-gray-500">{label}</p>
            <h2 className="text-2xl font-semibold mt-2">{value}</h2>
        </div>
    )
}

export default StatsCard
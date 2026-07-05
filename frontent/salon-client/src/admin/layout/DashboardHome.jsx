import React from 'react'

const DashboardHome = () => {
    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500">Overview of your salon</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Total Bookings", value: "120" },
                    { title: "Revenue", value: "₹25,000" },
                    { title: "Customers", value: "80" },
                    { title: "Services", value: "15" }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl border">
                        <p className="text-sm text-gray-500">{item.title}</p>
                        <h2 className="text-xl font-semibold mt-2">{item.value}</h2>
                    </div>
                ))}
            </div>

            {/* PLACEHOLDER */}
            <div className="bg-white rounded-xl border p-6 text-gray-500 text-center">
                Charts & analytics coming here 🚀
            </div>

        </div>
    )
}

export default DashboardHome
import React, { useState } from 'react'
import SalonDashboardList from '../components/SalonDashboardList'
import { Outlet } from 'react-router-dom'
import DashboardTopbar from '../components/topbar/DashboardTopbar'
import AdminRoutes from '../pages/AdminRoutes'

const SalonDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* TOPBAR */}
            <DashboardTopbar
                onToggleSidebar={() => setSidebarOpen(true)}
            />

            <div className="flex flex-1 overflow-hidden">
                {/* DESKTOP SIDEBAR */}
                <div className="hidden lg:flex w-[260px] bg-white border-r border-gray-100 shadow-sm">
                    <SalonDashboardList />
                </div>
                {/* MOBILE SIDEBAR */}
                <div className={`
                    fixed inset-0 z-40 lg:hidden
                    transition-all duration-300
                    ${sidebarOpen ? "visible" : "invisible"}
                `}>
                    {/* OVERLAY */}
                    <div
                        className={`
                        absolute inset-0 bg-black/40 backdrop-blur-sm
                        transition-opacity duration-300
                        ${sidebarOpen ? "opacity-100" : "opacity-0"}
                    `}
                        onClick={() => setSidebarOpen(false)}
                    />
                    {/* SIDEBAR PANEL */}
                    <div className={`
                        absolute left-0 top-0 h-full w-[260px] bg-white shadow-xl
                        transform transition-transform duration-300
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    `}>
                        <SalonDashboardList />
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="w-full px-4 md:px-6 lg:px-8 space-y-6">
                            <AdminRoutes />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SalonDashboard
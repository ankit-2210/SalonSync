import React, { useState } from 'react'
import {
    Avatar,
    IconButton,
    Badge,
    Menu,
    MenuItem
} from '@mui/material'
import {
    NotificationsNone,
    Menu as MenuIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const DashboardTopbar = ({ onToggleSidebar }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()

    return (
        <div className="h-16 bg-white border-b border-gray-100 px-4 md:px-6 flex items-center justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-3">
                {/* HAMBURGER */}
                <IconButton
                    onClick={onToggleSidebar}
                    className="lg:hidden"
                >
                    <MenuIcon />
                </IconButton>

                <h2 className="text-lg font-semibold text-gray-800">
                    Salon Booking
                </h2>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
                <IconButton sx={{ background: "#f9fafb" }}>
                    <Badge badgeContent={3} color="success">
                        <NotificationsNone />
                    </Badge>
                </IconButton>

                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <Avatar sx={{ bgcolor: "#16a34a" }}>S</Avatar>
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={() => navigate("/salon-dashboard/account")}>
                        Account
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/")}>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default DashboardTopbar;
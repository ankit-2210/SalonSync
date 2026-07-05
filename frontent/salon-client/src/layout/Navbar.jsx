import React, { useState } from 'react'
import { Avatar, Badge, Button, IconButton, Menu, MenuItem } from '@mui/material'
import { NotificationsActive, Menu as MenuIcon, Close, ShoppingCart } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../Redux/Auth/authSlice'
import { Link, useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";

const Navbar = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    // console.log(user);

    const [anchorEl, setAnchorEl] = useState(null)
    const [mobileOpen, setMobileOpen] = useState(false)
    const navigate = useNavigate();

    const open = Boolean(anchorEl)
    const location = useLocation()

    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Salons", path: "/salons" },
        { name: "Services", path: "/services" },
        { name: "Bookings", path: "/bookings" },
        { name: "Reviews", path: "/reviews" }
    ]

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You wil be logged out",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout"
        });

        if (result.isConfirmed) {
            dispatch(logout());
            await Swal.fire({
                title: "Logged out",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            navigate("/login");

        }
    }

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
                {/* LOGO */}
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white font-bold">
                        S
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900" onClick={(() => navigate("/"))}>
                        Salonify
                    </h2>
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {navLinks.map((item, i) => {
                        const isActive = location.pathname === item.path
                        return (
                            <Link
                                key={i}
                                to={item.path}
                                className={`relative transition
                                    ${isActive ? "text-green-600" : "text-gray-700 hover:text-green-600"}
                                `}>
                                {item.name}
                                {/* ACTIVE UNDERLINE */}
                                <span className={`absolute left-0 -bottom-1 h-[2px] w-full bg-green-500 transition-all duration-300
                                    ${isActive ? "opacity-100" : "opacity-0"}
                                `}></span>
                            </Link>
                        )
                    })}
                </div>

                {/* RIGHT */}
                <div className="hidden md:flex items-center gap-3">
                    {!isAuthenticated ? (
                        <Button
                            variant="contained"
                            onClick={() => navigate("/login")}
                            sx={{
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: "600",
                                backgroundColor: "#16a34a",
                                '&:hover': { backgroundColor: "#15803d" }
                            }}
                        >
                            Login
                        </Button>
                    ) : (
                        <>
                            {(user?.userRole === "ADMIN" || user?.userRole === "SALON_OWNER") ? (
                                <Button
                                    variant="contained"
                                    onClick={() => navigate("/salon-dashboard")}
                                    sx={{
                                        borderRadius: "10px",
                                        textTransform: "none",
                                        fontWeight: "600",
                                        backgroundColor: "#2563eb",
                                        '&:hover': { backgroundColor: "#1d4ed8" }
                                    }}
                                >
                                    Salon Dashboard
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate("/become-partner")}
                                    sx={{
                                        borderRadius: "10px",
                                        textTransform: "none",
                                        fontWeight: "600",
                                        borderColor: "#e5e7eb",
                                        color: "#111",
                                        '&:hover': {
                                            borderColor: "#16a34a",
                                            color: "#16a34a",
                                            background: "#f0fdf4"
                                        }
                                    }}
                                >
                                    Become Partner
                                </Button>
                            )}

                            <IconButton
                                sx={{ background: "#f9fafb" }}
                                onClick={() => navigate("/cart")}
                            >
                                <Badge badgeContent={3} color="success">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>

                            <IconButton sx={{ background: "#f9fafb" }} onClick={() => navigate("/notifications")}>
                                <Badge badgeContent={5} color="success">
                                    <NotificationsActive />
                                </Badge>
                            </IconButton>

                            <IconButton onClick={handleClick}>
                                <Avatar sx={{ bgcolor: "#16a34a" }}>
                                    {user?.fullName?.charAt(0) || "U"}
                                </Avatar>
                            </IconButton>

                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <MenuItem onClick={() => { navigate("/bookings"); handleClose() }}>
                                    My Bookings
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </div>

                {/* MOBILE BUTTON */}
                <div className="md:hidden">
                    <IconButton onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <Close /> : <MenuIcon />}
                    </IconButton>
                </div>
            </div>

            {/* MOBILE MENU */}
            {
                mobileOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-5 py-5 space-y-5">
                        {/* NAV LINKS */}
                        <div className="flex flex-col gap-4">
                            {navLinks.map((item, i) => {
                                const isActive = location.pathname === item.path
                                return (
                                    <Link
                                        key={i}
                                        to={item.path}
                                        className={`text-sm font-medium
                                        ${isActive ? "text-green-600" : "text-gray-700"}
                                    `}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </div>
                        <div className="border-t pt-4 space-y-4">
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ borderRadius: "10px", textTransform: "none" }}>
                                Become Partner
                            </Button>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-700">Cart</p>
                                <Badge badgeContent={3} color="success">
                                    <ShoppingCart />
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-gray-700">Notifications</p>
                                <Badge badgeContent={5} color="success">
                                    <NotificationsActive />
                                </Badge>
                            </div>
                            <Link to="/bookings" className="block text-sm text-gray-700">
                                My Bookings
                            </Link>
                            <button onClick={handleLogout} className="text-left text-sm text-red-500">
                                Logout
                            </button>
                        </div>
                    </div>
                )
            }

        </header>
    )
}

export default Navbar
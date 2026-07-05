import React from 'react'
import SalonDetails from "../customer/Salon/SalonDetails/SalonDetails";
import Bookings from "../customer/Booking/Bookings";
import Notification from "../customer/Notification/Notification"
import { Route, Routes } from "react-router-dom";
import Home from "../customer/Home/Home";
import SalonDashboard from "../admin/SalonDashboard";
import Navbar from '../layout/Navbar';
import NotFound from '../layout/NotFound';

const CustomerRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/bookings" element={<Bookings />}></Route>
                <Route path="/salon/:id" element={<SalonDetails />}></Route>
                <Route path="/notifications" element={<Notification />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </div>
    )
}

export default CustomerRoutes
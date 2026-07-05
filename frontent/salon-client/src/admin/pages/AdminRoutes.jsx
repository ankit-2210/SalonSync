import React from 'react'

import { Routes, Route } from "react-router-dom";
import BookingsPage from './Booking/BookingsPage';
import ServicesPage from './Services/ServicesPage';
import TransactionPage from './Transaction/TransactionPage';
import DashboardHome from '../layout/DashboardHome';
import CategoryPage from './Category/CategoryPage';
import AddService from './Services/AddService';
import Payment from './Payment/Payment';
import Account from './Settings/Account';
import SalonPage from './Salons/SalonPage';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="salons" element={<SalonPage />}></Route>
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="add-services" element={<AddService />}></Route>
            <Route path="transaction" element={<TransactionPage />} />
            <Route path="category" element={<CategoryPage />} />
            <Route path="payment" element={<Payment />}></Route>
            <Route path="account" element={<Account />}></Route>
        </Routes>
    )
}

export default AdminRoutes
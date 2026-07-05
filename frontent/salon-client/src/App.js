import Green from "./theme/Green"
import './App.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./Redux/Auth/authSlice";
import { ThemeProvider } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./layout/Navbar";
import SalonDetails from "./customer/Salon/SalonDetails/SalonDetails";
import Bookings from "./customer/Booking/Bookings";
import Notification from "./customer/Notification/Notification"
import Home from "./customer/Home/Home";
import NotFound from './layout/NotFound';
import SalonDashboard from "./admin/layout/SalonDashboard";
import Auth from "./auth/Auth";
import Loader from "./admin/components/common/Loader";
import { ToastContainer } from "react-toastify";
import Salons from "./customer/Salon/Salons";
import Footer from "./layout/Footar";
import PaymentSuccess from "./customer/Payment/PaymentSuccess";

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/salon-dashboard")
  return (
    <>
      {!isDashboard && <Navbar />}
      <Routes>
        {/* Dashboard */}
        <Route path="/salon-dashboard/*" element={<SalonDashboard />} />

        {/* Customer */}
        <Route path="/login" element={<Auth />}></Route>
        <Route path="/register" element={<Auth />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/bookings" element={<Bookings />}></Route>
        <Route path="/salons" element={<Salons />}></Route>
        <Route path="/salon/:id" element={<SalonDetails />}></Route>
        <Route path="/notifications" element={<Notification />}></Route>
        <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isDashboard && <Footer />}
    </>
  )
}

function App() {
  const dispatch = useDispatch();
  const { isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(getUser());
    }
    else {
      dispatch({ type: "auth/stopCheckingAuth" });
    }

  }, [dispatch]);

  if (isCheckingAuth) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={Green}>
      <AppContent />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
      />
    </ThemeProvider>
  )
}

export default App;

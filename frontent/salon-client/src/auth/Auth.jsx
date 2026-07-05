import React from 'react'
import { useLocation } from "react-router-dom";
import Login from './Login';
import Register from './Register';

const Auth = () => {
    const location = useLocation();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 text-white">
            <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl">
                {/* Left Branding */}
                <div className="hidden md:flex flex-col justify-center p-10 bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9')] bg-cover bg-center relative">
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold tracking-wide">LUXE SALON</h1>
                        <p className="mt-4 text-gray-300">Experience elegance, beauty & perfection.</p>
                    </div>
                </div>

                {/* Right Form */}
                <div className="bg-white text-gray-800 p-8 md:p-12">
                    {location.pathname === "/register" ? <Register /> : <Login />}
                </div>
            </div>
        </div>
    )
}

export default Auth
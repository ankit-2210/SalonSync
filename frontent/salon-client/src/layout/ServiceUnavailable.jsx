import React from "react";
import { motion } from "framer-motion";

const ServiceUnavailable = ({ serviceName = "Service", message }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center max-w-md w-full"
            >
                {/* ICON */}
                <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 text-3xl">
                        🚫
                    </div>
                </div>
                {/* TITLE */}
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    {serviceName} unavailable
                </h1>
                {/* MESSAGE */}
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    {message ||
                        `${serviceName} is currently down. Please try again shortly.`}
                </p>

                {/* ACTIONS */}
                <div className="flex justify-center gap-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-5 py-2 rounded-full bg-black text-white text-sm hover:opacity-90 transition"
                    >
                        Retry
                    </button>

                    <button
                        onClick={() => window.history.back()}
                        className="px-5 py-2 rounded-full text-gray-600 text-sm hover:text-black transition"
                    >
                        Go back
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ServiceUnavailable;
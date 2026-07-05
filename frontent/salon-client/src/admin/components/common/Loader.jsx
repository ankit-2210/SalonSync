import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = ({ fullScreen = true }) => {
    return (
        <div
            className={`flex items-center justify-center ${fullScreen ? "h-screen w-screen" : "h-full w-full py-10"
                }`}
        >
            <div className="flex flex-col items-center gap-4">
                <CircularProgress
                    size={50}
                    thickness={4}
                    sx={{ color: "#16a34a" }}
                />
                <p className="text-sm text-gray-500">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;
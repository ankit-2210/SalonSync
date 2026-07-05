import React from 'react'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-5 text-center">

            {/* BIG 404 */}
            <h1 className="text-[100px] md:text-[120px] pd-10 font-bold text-gray-200 leading-none">
                404
            </h1>

            {/* TITLE */}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 -mt-6 pt-10">
                Page not found
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-500 mt-3 max-w-md">
                The page you’re looking for doesn’t exist or has been moved.
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-6">

                <Button
                    variant="contained"
                    onClick={() => navigate("/")}
                    sx={{
                        borderRadius: "999px",
                        textTransform: "none",
                        fontWeight: "600",
                        paddingX: "20px",
                        background: "#16a34a",
                        '&:hover': { background: "#15803d" }
                    }}
                >
                    Go Home
                </Button>

                <Button
                    variant="text"
                    onClick={() => navigate(-1)}
                    sx={{
                        textTransform: "none",
                        fontWeight: "500",
                        color: "#6b7280"
                    }}
                >
                    Go Back
                </Button>

            </div>

        </div>
    )
}

export default NotFound
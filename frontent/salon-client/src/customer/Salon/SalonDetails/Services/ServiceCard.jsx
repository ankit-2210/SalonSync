import React from 'react';
import { FiberManualRecord } from "@mui/icons-material";
import { Button } from '@mui/material';

const ServiceCard = ({ service, onAdd, isAdded }) => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between gap-5">
                {/* LEFT */}
                <div className="space-y-2 w-[60%]">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {service?.name || "Service Name"}
                    </h2>

                    <p className="text-gray-500 text-sm leading-relaxed">
                        {service?.description || "No description available"}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <p className="font-medium text-black">
                            ₹{service?.price || 0}
                        </p>
                        <FiberManualRecord sx={{ fontSize: "8px", color: "gray" }} />
                        <p>{service?.duration || "30"} mins</p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-3 flex flex-col items-center">
                    <img
                        className="w-28 h-28 object-cover rounded-xl shadow-sm"
                        src={
                            service?.image ||
                            "https://via.placeholder.com/150"
                        }
                        alt={service?.name || "service"}
                    />
                    <Button
                        onClick={onAdd}
                        fullWidth
                        variant={isAdded ? "contained" : "outlined"}
                        sx={{
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: "600",
                            background: isAdded ? "#16a34a" : "transparent",
                            color: isAdded ? "#fff" : "#000",
                            borderColor: "#16a34a",
                            '&:hover': {
                                backgroundColor: isAdded ? "#15803d" : "#16a34a",
                                color: "#fff"
                            }
                        }}
                    >
                        {isAdded ? "Remove" : "Add"}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default ServiceCard;
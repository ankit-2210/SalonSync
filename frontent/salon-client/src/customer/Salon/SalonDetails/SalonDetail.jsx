import React from "react";

const SalonDetail = ({ salon }) => {
    if (!salon) {
        return (
            <div className="text-center py-10 text-gray-500">
                Loading salon details...
            </div>
        );
    }

    const { name, address, city, openTime, closeTime, rating, images } = salon;
    const defaultImage = "/default-salon.jpg"; // Add this in public folder

    return (
        <div className="space-y-6 mb-16">
            {/* Images Section */}
            {images && images.length > 0 ? (
                <section className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <img
                            className="w-full h-[18rem] object-cover rounded-2xl shadow-md"
                            src={images[0] || defaultImage}
                            alt={name || "Salon"}
                        />
                    </div>
                    {images[1] && (
                        <img
                            className="w-full h-[12rem] object-cover rounded-2xl shadow-md"
                            src={images[1] || defaultImage}
                            alt={`${name || "Salon"} - 2`}
                        />
                    )}
                    {images[2] && (
                        <img
                            className="w-full h-[12rem] object-cover rounded-2xl shadow-md"
                            src={images[2] || defaultImage}
                            alt={`${name || "Salon"} - 3`}
                        />
                    )}
                </section>
            ) : (
                <section>
                    <img
                        className="w-full h-[18rem] object-cover rounded-2xl shadow-md"
                        src={defaultImage}
                        alt="Default Salon"
                    />
                </section>
            )}

            {/* Salon Info */}
            <section className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">
                    {name || "Unnamed Salon"}
                </h2>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <span className="px-2 py-[2px] bg-green-100 text-green-700 rounded-md text-xs font-medium">
                        Open Now
                    </span>
                    <span>•</span>
                    <span>
                        {address || "Address not available"}, {city || "City not available"}
                    </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-gray-800">Timing:</span>
                        <span>
                            {openTime || "--:--"} – {closeTime || "--:--"}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <span className="font-medium text-gray-800">Rating:</span>
                        <span className="text-yellow-500 font-semibold">
                            ★ {rating || "4.5"}
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SalonDetail;
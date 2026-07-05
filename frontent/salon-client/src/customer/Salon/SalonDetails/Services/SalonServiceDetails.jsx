import React, { useEffect, useState } from 'react';
import CategoryCard from '../Categories/CategoryCard';
import ServiceCard from './ServiceCard';
import { Button } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, RemoveShoppingCart, ShoppingCart } from '@mui/icons-material';
import ServicesListSelected from './ServicesListSelected';
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceBySalonIdAndCategoryId } from '../../../../Redux/Service/serviceSlice';
import BookingModal from '../../Booking/BookingModal';

const SalonServiceDetails = ({ salon, categories }) => {
    const [openModal, setOpenModal] = useState(false);

    const salonId = salon?.id || salon?._id;

    const pages = 5;
    const dispatch = useDispatch();
    const { services, loadingServices } = useSelector(state => state.services);

    const [storedServices, setStoredServices] = useState(() => {
        const stored = localStorage.getItem("services");
        return stored ? JSON.parse(stored) : [];
    })

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedServices, setSelectedServices] = useState(() => {
        const stored = localStorage.getItem("selectedServices");
        return stored ? JSON.parse(stored) : [];
    });

    const [categoryPage, setCategoryPage] = useState(0);
    const [servicePage, setServicePage] = useState(0);

    useEffect(() => {
        if (categories?.length > 0 && !selectedCategory) {
            const firstCategory = categories[0];
            setSelectedCategory(firstCategory);

            dispatch(fetchServiceBySalonIdAndCategoryId({
                salonId,
                categoryId: firstCategory.id
            }));
        }
        if (salonId && selectedCategory) {
            dispatch(fetchServiceBySalonIdAndCategoryId({
                salonId,
                categoryId: selectedCategory.id
            }));
            setServicePage(0);
        }
    }, [categories, selectedCategory, salonId, dispatch]);

    useEffect(() => {
        if (services && services.length > 0) {
            localStorage.setItem("services", JSON.stringify(services));
            setStoredServices(services);
        }
    }, [services])

    useEffect(() => {
        if (selectedServices.length > 0) {
            localStorage.setItem("selectedServices", JSON.stringify(selectedServices));
        } else {
            localStorage.removeItem("selectedServices");
        }
    }, [selectedServices]);

    const handleToggle = (service) => {
        const exists = selectedServices.find(s => s.id === service.id);
        if (exists) {
            setSelectedServices(prev => prev.filter(s => s.id !== service.id));
        } else {
            setSelectedServices(prev => [...prev, service]);
        }
    };

    const totalCategoryPages = Math.ceil((categories?.length > 0 || 0) / pages);
    const paginatedCategories = categories?.slice(categoryPage * pages, (categoryPage + 1) * pages);

    const totalServicePages = Math.ceil((storedServices?.length > 0 || 0) / pages);
    const paginatedServices = storedServices?.slice(servicePage * pages, (servicePage + 1) * pages);

    return (
        <div className="lg:flex gap-6 mt-10">
            {/* LEFT - Categories */}
            <section className="lg:w-[25%] space-y-3 bg-white p-5 rounded-3xl shadow-md flex flex-col">
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px]">
                    {!paginatedCategories || paginatedCategories.length === 0 ? (
                        <p>No categories found</p>
                    ) : (
                        paginatedCategories.map(cat => (
                            <CategoryCard
                                key={cat.id}
                                item={cat}
                                selectedCategory={selectedCategory}
                                handleCategoryClick={() => setSelectedCategory(cat)}
                            />
                        ))
                    )}
                </div>

                <div className="flex justify-between mt-3">
                    <Button
                        disabled={categoryPage === 0}
                        onClick={() => setCategoryPage(prev => prev - 1)}
                        startIcon={<ArrowBackIos />}
                        size="small"
                    >
                        Prev
                    </Button>
                    <Button
                        disabled={categoryPage >= totalCategoryPages - 1}
                        onClick={() => setCategoryPage(prev => prev + 1)}
                        endIcon={<ArrowForwardIos />}
                        size="small"
                    >
                        Next
                    </Button>
                </div>
            </section>

            {/* CENTER - Services */}
            <section className="lg:w-[50%] space-y-5 px-2">
                {loadingServices ? (
                    <p>Loading services...</p>
                ) : (!Array.isArray(services) || services.length === 0) ? (
                    <p>No services found</p>
                ) : (
                    <>
                        <div className="flex flex-col gap-5 overflow-y-auto max-h-[600px]">
                            {paginatedServices.map(service => (
                                <div key={service.id} className="bg-white p-5 rounded-3xl shadow-md">
                                    <ServiceCard
                                        service={service}
                                        onAdd={() => handleToggle(service)}
                                        isAdded={selectedServices.some(s => s.id === service.id)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Service Pagination */}
                        <div className="flex justify-between mt-3">
                            <Button
                                disabled={servicePage === 0}
                                onClick={() => setServicePage(prev => prev - 1)}
                                startIcon={<ArrowBackIos />}
                                size="small"
                            >
                                Prev
                            </Button>
                            <Button
                                disabled={servicePage >= totalServicePages - 1}
                                onClick={() => setServicePage(prev => prev + 1)}
                                endIcon={<ArrowForwardIos />}
                                size="small"
                            >
                                Next
                            </Button>
                        </div>
                    </>
                )}
            </section>

            {/* RIGHT - Cart */}
            <section className="lg:w-[25%] sticky top-24 h-fit">
                <div className="bg-white p-6 rounded-3xl shadow-xl space-y-4">
                    {selectedServices.length > 0 ? (
                        <>
                            <div className="flex items-center gap-3 border-b pb-3">
                                <ShoppingCart />
                                <h2 className="font-semibold text-lg">Selected Services</h2>
                            </div>

                            <div className="py-4 space-y-2 max-h-[300px] overflow-y-auto">
                                <ServicesListSelected
                                    services={selectedServices}
                                    onRemove={(id) =>
                                        setSelectedServices(prev => prev.filter(s => s.id !== id))
                                    }
                                />
                            </div>

                            <Button fullWidth variant="contained" onClick={() => setOpenModal(true)}>Book Now</Button>
                        </>
                    ) : (
                        <div className="text-center text-gray-400 py-10">
                            <RemoveShoppingCart />
                            <p>No services selected</p>
                        </div>
                    )}
                </div>
            </section>

            <BookingModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                services={selectedServices}
                salonId={salonId}
            />

        </div>
    );
};

export default SalonServiceDetails;
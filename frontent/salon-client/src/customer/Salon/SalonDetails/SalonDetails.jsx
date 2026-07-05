import React, { useEffect, useState } from 'react'
import SalonDetail from './SalonDetail'
import { Button, Divider } from '@mui/material'
import SalonServiceDetails from './Services/SalonServiceDetails'
import Review from '../Review/Review';
import ReviewForm from '../Review/ReviewForm';
import { useParams } from 'react-router-dom';
import { fetchSalonById } from '../../../Redux/Salon/salonSlice';
import { getCategoriesBySalonId } from '../../../Redux/Category/categorySlice';
import { fetchServiceBySalonId } from '../../../Redux/Service/serviceSlice';
import { useDispatch, useSelector } from 'react-redux';

const tabs = [
    { name: "All Services" },
    { name: "Reviews" },
    { name: "Create Reviews" }
];

const SalonDetails = () => {
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { categories, loadingCategories } = useSelector((state) => state.categories);
    const { salon, loading } = useSelector((state) => state.salon);

    const [storedCategories, setStoredCategories] = useState(() => {
        const data = localStorage.getItem("categories");
        return data ? JSON.parse(data) : [];
    })

    const salonId = Number(id);
    useEffect(() => {
        if (salonId) {
            dispatch(getCategoriesBySalonId(salonId));
            dispatch(fetchSalonById(salonId));
        }
    }, [dispatch, salonId]);

    // store categories in localStorage when Redux updates
    useEffect(() => {
        if (categories && categories.length > 0) {
            localStorage.setItem("categories", JSON.stringify(categories));
            setStoredCategories(categories);
        }
    }, [categories])

    const finalCategories = categories?.length ? categories : storedCategories;

    return (
        <div className="px-5 lg:px-24 bg-gray-50 min-h-screen">
            <SalonDetail salon={salon} />
            <div className="space-y-6">
                <div className="flex gap-3">
                    {tabs.map((tab) => (
                        <Button
                            key={tab.name}
                            onClick={() => setActiveTab(tab)}
                            variant={tab.name === activeTab.name ? "contained" : "outlined"}
                            sx={{
                                borderRadius: "999px",
                                textTransform: "none",
                                px: 3
                            }}
                        >
                            {tab.name}
                        </Button>
                    ))}
                </div>
                <Divider />
                <div>
                    {activeTab.name === "Create Reviews" ? (
                        <div className="flex justify-center">
                            <ReviewForm salonId={id} />
                        </div>
                    ) : activeTab.name === "Reviews" ? (
                        <Review salonId={id} />
                    ) : (
                        <SalonServiceDetails salon={salon} categories={finalCategories} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default SalonDetails;
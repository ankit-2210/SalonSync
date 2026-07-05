import React, { useEffect } from 'react'
import SalonCard from './SalonCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSalons } from '../../Redux/Salon/salonSlice'

const SalonList = () => {
    const dispatch = useDispatch();
    const { salons, loading } = useSelector((state) => state.salon);

    useEffect(() => {
        dispatch(fetchSalons());
    }, [dispatch]);

    if (loading) {
        return <p className="text-center py-10">Loading salons...</p>
    }

    return (
        <div className="max-w-9xl mx-auto px-2 py-10">
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                    salons.map((salon) => (
                        <SalonCard key={salon.id} salon={salon} />
                    ))
                }
            </div>
        </div>
    )
}

export default SalonList
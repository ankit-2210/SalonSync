import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSalons } from '../../Redux/Salon/salonSlice'
import SalonCard from '../Salon/SalonCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const SalonCarousel = () => {
    const dispatch = useDispatch();
    const { salons, loading } = useSelector((state) => state.salon);

    useEffect(() => {
        dispatch(fetchSalons());
    }, [dispatch]);

    if (loading) {
        return <p className="text-center py-10">Loading salons...</p>;
    }

    return (
        <div className="w-full overflow-hidden">
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                loop={true}
                autoplay={{ delay: 2500 }}
                grabCursor={true}
                spaceBetween={20}
                slidesPerView={4}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}>
                {salons?.slice(0, 7).map((salon) => (
                    <SwiperSlide key={salon.id}>
                        <SalonCard salon={salon} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SalonCarousel;
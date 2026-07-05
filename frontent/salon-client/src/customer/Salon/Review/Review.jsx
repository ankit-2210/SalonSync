import React, { useState, useEffect } from 'react'
import ReviewCard from './ReviewCard'
import RatingCard from './RatingCard'
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from '../../../Redux/Review/ReviewSlice';


const Review = ({ salonId }) => {
    const [sort, setSort] = useState("top")
    const dispatch = useDispatch();
    const { reviews, loading } = useSelector((state) => state.review);

    useEffect(() => {
        if (salonId) {
            dispatch(fetchReviews(salonId));
        }
    }, [salonId, dispatch]);

    return (
        <div className="pt-10 flex flex-col lg:flex-row gap-14">
            {/* LEFT */}
            <section className="w-full lg:w-[40%] space-y-4 sticky top-24 h-fit">
                <h2 className="font-semibold text-xl text-gray-900">
                    Reviews & Ratings
                </h2>
                <div className="bg-white rounded-3xl shadow-lg p-5">
                    <RatingCard reviews={reviews} />
                </div>
            </section>

            {/* RIGHT */}
            <section className="w-full lg:w-[60%] space-y-5">
                {/* SORT BAR */}
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">{reviews?.length || 0} reviews</p>
                    <div className="flex gap-2">
                        {["top", "latest", "lowest"].map((item) => (
                            <button
                                key={item}
                                onClick={() => setSort(item)}
                                className={`px-3 py-1 rounded-full text-sm transition
                                    ${sort === item
                                        ? "bg-black text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"}
                                `}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* REVIEWS */}
                {loading ? (
                    <p className="text-gray-500">Loading reviews...</p>
                ) : (
                    reviews?.map((review) => (
                        <div key={review.id} className="bg-white rounded-3xl shadow-sm p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                            <ReviewCard review={review} />
                        </div>
                    ))
                )}
            </section>
        </div>
    )
}

export default Review
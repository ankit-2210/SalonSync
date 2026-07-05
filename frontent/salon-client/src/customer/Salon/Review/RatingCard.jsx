import { Rating } from '@mui/material'
import React from 'react'

const RatingCard = ({ reviews }) => {
    // console.log(reviews);
    const avgRating = reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 0

    const count = [5, 4, 3, 2, 1].map(star => reviews.filter(r => Math.round(r.rating) === star).length);
    const total = reviews.length;
    const percentages = count.map(c => total ? Math.round((c / total) * 100) : 0);
    const labels = ["Excellent", "Very Good", "Good", "Avg", "Poor"]

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-4xl font-bold text-gray-900">{avgRating}</p>
                    <p className="text-sm text-gray-500">Overall Rating</p>
                </div>
                <div className="text-right">
                    <Rating readOnly value={Number(avgRating)} precision={0.5} />
                    <p className="text-xs text-gray-400 mt-1">{total} reviews</p>
                </div>
            </div>

            {/* DISTRIBUTION */}
            <div className="space-y-3">
                {percentages.map((val, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <p className="text-xs w-20 text-gray-500">
                            {labels[i]}
                        </p>
                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-700"
                                style={{ width: `${val}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-400 w-10 text-right">
                            {val}%
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RatingCard
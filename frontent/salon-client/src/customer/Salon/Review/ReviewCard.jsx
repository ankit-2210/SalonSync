import { Delete, ThumbUp } from '@mui/icons-material'
import { Avatar, Rating, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteReview } from '../../../Redux/Review/ReviewSlice'
import Swal from 'sweetalert2'

const ReviewCard = ({ review }) => {
    const [expanded, setExpanded] = useState(false)
    const [liked, setLiked] = useState(false)

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) return;

        try {
            await dispatch(deleteReview(review.id)).unwrap();
            toast.success("Review deleted ✅");
        } catch (error) {
            toast.error("Delete failed ❌");
        }
    };

    const text = review?.reviewText || "";
    return (
        <div className="flex gap-4">
            <Avatar sx={{ width: 50, height: 50, bgcolor: "#16a34a" }}>
                {review?.userName
                    ? review.userName.charAt(0).toUpperCase()
                    : review?.userId?.toString().charAt(0) || "U"}</Avatar>
            <div className="flex-1 space-y-2">
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-gray-900">{review?.userName || `User-${review?.userId}`}</p>
                        <p className="text-xs text-gray-400">
                            {review?.createdAt
                                ? new Date(review.createdAt).toLocaleString()
                                : "Recently"}
                        </p>
                    </div>
                    {user?.id === review?.userId && (
                        <IconButton size="small" onClick={handleDelete}>
                            <Delete sx={{ color: "#ef4444", fontSize: "18px" }} />
                        </IconButton>
                    )}
                </div>

                {/* RATING */}
                <Rating readOnly value={review?.rating || 0} precision={0.5} />

                {/* TEXT */}
                <p className="text-sm text-gray-600 leading-relaxed">
                    {expanded ? text : text.slice(0, 100) + (text.length > 100 ? "..." : "")}
                </p>
                <button onClick={() => setExpanded(!expanded)} className="text-xs text-green-600 font-medium">
                    {expanded ? "Show less" : "Read more"}
                </button>

                {/* ACTIONS */}
                <div className="flex items-center gap-4 pt-2">
                    <button
                        onClick={() => setLiked(!liked)}
                        className={`flex items-center gap-1 text-sm transition
                            ${liked ? "text-green-600" : "text-gray-500"}
                        `}
                    >
                        <ThumbUp fontSize="small" />
                        Helpful
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard
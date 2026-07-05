import React from 'react'
import { Box, InputLabel, TextField, Rating, Button } from '@mui/material'
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createReview } from '../../../Redux/Review/ReviewSlice';

const ReviewForm = ({ salonId }) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            reviewText: "",
            reviewRating: 0
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                await dispatch(
                    createReview({
                        salonId,
                        reviewData: {
                            reviewText: values.reviewText,
                            rating: values.reviewRating,
                        },
                    })
                ).unwrap();
                toast.success("Review submitted successfully!");
                resetForm();
            }
            catch (error) {
                toast.error(error.message || "Failed to submit review");
            }
        }
    })

    return (
        <Box component="form" onSubmit={formik.handleSubmit}
            className="w-full lg:w-1/2 mx-auto bg-white p-6 rounded-3xl shadow-lg border border-gray-100 space-y-6" sx={{ mt: 4 }}>
            {/* HEADER */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900">
                    Write a Review
                </h2>
                <p className="text-sm text-gray-500">
                    Share your experience to help others
                </p>
            </div>

            {/* TEXT AREA */}
            <TextField fullWidth id="reviewText" name="reviewText" label="Your Review" variant="outlined" multiline rows={4}
                value={formik.values.reviewText} onChange={formik.handleChange}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '14px',
                        backgroundColor: '#fafafa'
                    }
                }}
            />

            {/* RATING */}
            <div className="space-y-2">
                <InputLabel className="text-gray-700 font-medium">
                    Your Rating
                </InputLabel>

                <div className="flex items-center gap-3">
                    <Rating id="reviewRating" name="reviewRating" precision={0.5} value={formik.values.reviewRating}
                        onChange={(event, newValue) =>
                            formik.setFieldValue("reviewRating", newValue)
                        }
                        sx={{ fontSize: "28px" }}
                    />
                    <span className="text-sm text-gray-500">
                        {formik.values.reviewRating > 0 ? `${formik.values.reviewRating} / 5` : "Tap to rate"}
                    </span>
                </div>
            </div>

            {/* BUTTON */}
            <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                    borderRadius: "12px",
                    textTransform: "none",
                    fontWeight: "600",
                    padding: "12px",
                    background: "linear-gradient(to right, #16a34a, #22c55e)",
                    boxShadow: "0 6px 20px rgba(34,197,94,0.3)",
                    '&:hover': {
                        background: "linear-gradient(to right, #15803d, #16a34a)"
                    }
                }}
            >
                Submit Review
            </Button>

        </Box>
    )
}

export default ReviewForm
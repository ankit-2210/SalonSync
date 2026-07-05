import api from "../../config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "/api/reviews";

export const fetchReviews = createAsyncThunk("review/getAll", async (salonId, { rejectWithValue }) => {
    try {
        const response = await api.get(`${BASE_URL}/salon/${salonId}`);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})

export const createReview = createAsyncThunk("review/create", async ({ salonId, reviewData }, { rejectWithValue }) => {
    try {
        const response = await api.post(`${BASE_URL}/salon/${salonId}`, reviewData);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})

export const updateReview = createAsyncThunk("review/update", async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
        const response = await api.put(`${BASE_URL}/${reviewId}`, reviewData);
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})


export const deleteReview = createAsyncThunk("review/delete", async (reviewId, { rejectWithValue }) => {
    try {
        const response = await api.delete(`${BASE_URL}/${reviewId}`);
        return { reviewId, response: response.data }
    }
    catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})


const reviewSlice = createSlice({
    name: "review",
    initialState: {
        reviews: [],
        loading: false,
        error: null,
        message: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.data;
                state.message = action.payload.message;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews.unshift(action.payload.data);
                state.message = action.payload.message;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload.data;
                state.reviews = state.reviews.map((r) =>
                    r.id === updated.id ? updated : r
                )
                state.message = action.payload.message;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = state.reviews.filter((r) => r.id !== action.payload.reviewId)
                state.message = action.payload.response.message;
            })
            .addMatcher(
                (action) => action.type.startsWith("review/") && action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.startsWith("review/") && action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )

    }
})

export default reviewSlice.reducer;

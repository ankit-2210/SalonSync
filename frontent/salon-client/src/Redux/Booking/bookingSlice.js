import api from "../../config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "/api/bookings";

// create
export const createBooking = createAsyncThunk("booking/create", async ({ salonId, bookingData }, { rejectWithValue }) => {
    try {
        const { data } = await api.post(BASE_URL, bookingData, {
            params: { salonId, paymentMethod: "RAZORPAY" }
        });

        console.log(data);
        if (!data.success) {
            return rejectWithValue(data);
        }
        return data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})

// fetch
export const fetchCustomerBookings = createAsyncThunk("booking/customer", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`${BASE_URL}/customer`);
        if (!data.success) {
            return rejectWithValue(data);
        }
        return data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})


export const fetchSalonBookings = createAsyncThunk("booking/salon", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`${BASE_URL}/salon`);
        if (!data.success) {
            return rejectWithValue(data);
        }
        return data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})

export const fetchBookingById = createAsyncThunk("booking/getById", async (bookingId, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`${BASE_URL}/${bookingId}`);
        if (!data.success) {
            return rejectWithValue(data);
        }
        return data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})

export const updateBookingStatus = createAsyncThunk("booking/updateStatus", async ({ bookingId, status }, { rejectWithValue }) => {
    try {
        const { data } = await api.put(`${BASE_URL}/${bookingId}/status`,
            null,
            {
                params: { bookingStatus: status }
            });
        if (!data.success) {
            return rejectWithValue(data);
        }
        return data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})


export const getSalonReport = createAsyncThunk("bookings/report", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.put(`${BASE_URL}/report`);
        if (!data.success) {
            return rejectWithValue(data);
        }
        return data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})


const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        bookings: [],
        booking: null,
        report: null,
        paymentLink: null,
        loading: false,
        error: null
    },
    reducers: {
        clearBooking: (state) => {
            state.booking = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(createBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.booking = action.payload;
            })
            .addCase(fetchCustomerBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchSalonBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchBookingById.fulfilled, (state, action) => {
                state.loading = false;
                state.booking = action.payload;
            })
            .addCase(updateBookingStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                state.booking = state.booking.map(b => b.id === updated.id ? updated : b);
            })
            .addCase(getSalonReport.fulfilled, (state, action) => {
                state.loading = false;
                state.report = action.payload;
            })
            .addMatcher(
                (action) => action.type.startsWith("booking/") && action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.startsWith("booking/") && action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    }
});

export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;





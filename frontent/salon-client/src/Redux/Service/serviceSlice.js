import api from "../../config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "/api/offeringService";

export const fetchServiceBySalonId = createAsyncThunk(
    "service/getBySalon",
    async ({ salonId }, { rejectWithValue }) => {
        try {
            const response = await api.get(`${BASE_URL}/salon/${salonId}`);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const fetchServiceBySalonIdAndCategoryId = createAsyncThunk(
    "service/getBySalonAndCategory",
    async ({ salonId, categoryId }, { rejectWithValue }) => {
        try {
            const response = await api.get(`${BASE_URL}/salon/${salonId}`, {
                params: { categoryId }
            });
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const serviceSlice = createSlice({
    name: "services",
    initialState: {
        services: [],
        service: null,
        loadingServices: false,
        error: null,
        message: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServiceBySalonId.pending, (state) => {
                state.loadingServices = true;
            })
            .addCase(fetchServiceBySalonId.fulfilled, (state, action) => {
                state.loadingServices = false;
                state.services = action.payload.data || [];
                state.message = action.payload.message || "Services fetched successfully";
            })
            .addCase(fetchServiceBySalonId.rejected, (state, action) => {
                state.loadingServices = false;
                state.error = action.payload;
            })
            .addCase(fetchServiceBySalonIdAndCategoryId.pending, (state) => {
                state.loadingServices = true;
            })
            .addCase(fetchServiceBySalonIdAndCategoryId.fulfilled, (state, action) => {
                state.loadingServices = false;
                state.services = action.payload.data || [];
                state.message = action.payload.message || "Services with Category fetched successfully";
            })
            .addCase(fetchServiceBySalonIdAndCategoryId.rejected, (state, action) => {
                state.loadingServices = false;
                state.error = action.payload;
            });
    }
});

export default serviceSlice.reducer;
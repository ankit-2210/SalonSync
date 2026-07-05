import api from "../../config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "/api/payments";

export const proceedPayment = createAsyncThunk("payment/proceed", async ({ paymentId, paymentLinkId }, { rejectWithValue }) => {
    try {
        const { data } = await api.patch(
            `${BASE_URL}/proceed`,
            null,
            {
                params: { paymentId, paymentLinkId }
            }
        );
        return data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
});

const paymentSlice = createSlice({
    name: "payment",

    initialState: {
        payment: null,
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        resetPayment: (state) => {
            state.payment = null;
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(proceedPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.payment = action.payload;
                state.success = true;
            })
            .addMatcher((action) => action.type.startsWith("payment/") && action.type.endsWith("/pending"), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher((action) => action.type.startsWith("payment/") && action.type.endsWith("/rejected"), (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;


import api from "../../config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const BASE_URL = "/api/salons";

export const createSalon = createAsyncThunk("salon/create", async (request, { rejectWithValue }) => {
    try {
        const res = await api.post(BASE_URL, request.salonDetails);
        if (!res.data.success) {
            return rejectWithValue(res.data.message);
        }
        toast.success("Salon created successfully 🎉");
        request.navigate("/salon-dashboard");
    }
    catch (error) {
        toast.error(error.response?.data?.message || "Failed to create salon");
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})

export const fetchSalons = createAsyncThunk("salon/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const res = await api.get(BASE_URL);
        if (!res.data.success) {
            return rejectWithValue(res.data.message);
        }
        return res.data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})

export const fetchSalonById = createAsyncThunk("salon/fetchById", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`${BASE_URL}/${id}`);
        if (!res.data.success) {
            return rejectWithValue(res.data.message);
        }
        return res.data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})

export const updateSalon = createAsyncThunk("salon/update", async ({ salonId, salon }, { rejectWithValue }) => {
    try {
        const res = await api.put(`${BASE_URL}/${salonId}`, salon);
        if (!res.data.success) {
            return rejectWithValue(res.data.message);
        }
        toast.success("Salon updated successfully ✨");
        return res.data.data;
    }
    catch (error) {
        const msg = error.response?.data?.message || "Update failed";
        toast.error(msg);
        return rejectWithValue(msg);
    }
})

export const searchSalon = createAsyncThunk("salon/search", async (city, { rejectWithValue }) => {
    try {
        const res = await api.get(`${BASE_URL}/search`, {
            params: { city },
        });
        if (!res.data.success) {
            return rejectWithValue(res.data.message);
        }
        return res.data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})

export const fetchSalonByOwnerId = createAsyncThunk("salon/owner", async (_, { rejectWithValue }) => {
    try {
        const res = await api.get(`${BASE_URL}/owner`);
        if (!res.data.success) {
            return rejectWithValue(res.data.message);
        }
        console.log(res.data.data);
        return res.data.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})

export const deleteSalon = createAsyncThunk("salon/deleteSalon", async (id, { rejectWithValue }) => {
    try {
        const res = await api.delete(`${BASE_URL}/${id}`);
        if (!res.data.success) {
            return rejectWithValue(res.data.message);
        }
        toast.success(res.data.message || "Deleted successfully");
        return id;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})

export const toggleSalonStatus = createAsyncThunk("salon/toggleStatus", async (id, { rejectWithValue }) => {
    try {
        const res = await api.put(`${BASE_URL}/${id}/toggle-status`);
        if (!res.data.success) {
            return rejectWithValue(res.data.message);
        }

        toast.success(res.data.message || "Status updated");
        return res.data.data;
    }
    catch (error) {
        return rejectWithValue(
            error.response?.data?.message || "Toggle failed"
        );
    }
})

export const fetchSalonOwners = createAsyncThunk(
    "auth/fetchSalonOwners", async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/api/users");
            const owners = res.data.data.filter(
                (u) => u.role === "SALON_OWNER"
            );
            return owners;
        }
        catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed"
            );
        }
    }
);
const salonSlice = createSlice({
    name: "salon",
    initialState: {
        salons: [],
        salon: null,
        searchSalon: [],
        loading: false,
        error: null,
        message: null,
        owners: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createSalon.fulfilled, (state, action) => {
                state.loading = false;
                state.salons = [action.payload, ...state.salons]
            })
            .addCase(fetchSalons.fulfilled, (state, action) => {
                state.loading = false;
                state.salons = action.payload;
            })
            .addCase(fetchSalonById.fulfilled, (state, action) => {
                state.loading = false;
                state.salon = action.payload;
            })
            .addCase(updateSalon.fulfilled, (state, action) => {
                state.loading = false;
                state.salons = state.salons.map((s) =>
                    s.id === action.payload.id ? action.payload : s
                );
            })
            .addCase(searchSalon.fulfilled, (state, action) => {
                state.loading = false;
                state.searchSalon = action.payload;
            })
            .addCase(fetchSalonByOwnerId.fulfilled, (state, action) => {
                state.loading = false;
                state.salons = action.payload;
            })
            .addCase(deleteSalon.fulfilled, (state, action) => {
                state.loading = false;
                state.salons = state.salons.filter((s) => s.id !== action.payload);
            })
            .addCase(fetchSalonOwners.fulfilled, (state, action) => {
                state.loading = false;
                state.owners = action.payload;
            })
            .addCase(toggleSalonStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload;
                if (!updated.active) {
                    state.salons = state.salons.filter((s) => s.id !== updated.id);
                }
                else {
                    state.salons = state.salons.map((s) => s.id === updated.id ? updated : s);
                }
            })
            // 🔄 LOADING
            .addMatcher((action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                })

            // ❌ ERROR
            .addMatcher((action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                    toast.error(action.payload || "Something went wrong");
                })
    }

})


export default salonSlice.reducer;

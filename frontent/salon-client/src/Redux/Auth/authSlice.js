import api from "../../config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
    try {
        const res = await api.post("/auth/signup", userData.data);
        const user = res.data.data;
        if (user?.jwt) {
            localStorage.setItem("jwt", user.jwt);
            toast.success("Account created 🎉");
            userData.navigate("/");
        }
        return user;
    }
    catch (error) {
        toast.error(error.response?.data?.message || "Signup failed");
        return rejectWithValue(error.response?.data?.message);
    }
})

export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const res = await api.post("/auth/login", userData.data);
        // console.log("Response:", res.data);
        const user = res.data.data;
        if (user?.jwt) {
            localStorage.setItem("jwt", user.jwt);
            toast.success(`Welcome back 👋`);
            if (user?.role === "ADMIN") {
                userData.navigate("/admin");
            }
            else if (user?.role === "SALON_OWNER") {
                userData.navigate("/salon-dashboard");
            }
            else {
                userData.navigate("/")
            }
        }
        return user;
    }
    catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
        return rejectWithValue(error.response?.data?.message);
    }
})

export const getUser = createAsyncThunk("auth/getUser", async (_, { rejectWithValue }) => {
    try {
        const res = await api.get("/api/users/profile");
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        isCheckingAuth: true,
        error: null
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("jwt");
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.isCheckingAuth = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        stopCheckingAuth: (state) => {
            state.isCheckingAuth = false;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getUser.pending, (state) => {
                state.isCheckingAuth = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.isAuthenticated = true;
                state.isCheckingAuth = false;
            })
            .addCase(getUser.rejected, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isCheckingAuth = false;
                localStorage.removeItem("jwt");
            })
            .addMatcher((action) => action.type.endsWith("/pending"),
                (state) => {
                    state.loading = true;
                })
            .addMatcher((action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
    }
})

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;








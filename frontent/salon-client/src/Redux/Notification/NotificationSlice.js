import api from "../../config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "/api/notifications";

// Fetch by user
export const fetchNotificationByUser = createAsyncThunk("notification/getByUser", async (userId, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`${BASE_URL}/user/${userId}`);
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


// Fetch by salon
export const fetchNotificationBySalon = createAsyncThunk("notification/getBySalon", async (salonId, { rejectWithValue }) => {
    try {
        const { data } = await api.get(`${BASE_URL}/salon-owner/salon/${salonId}`);
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

// Mark as read
export const markNotificationAsRead = createAsyncThunk("notification/markRead", async (notificationId, { rejectWithValue }) => {
    try {
        const { data } = await api.put(`${BASE_URL}/${notificationId}/read`);
        if (!data.success) {
            return rejectWithValue(data);
        }
        return notificationId;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || {
            success: false,
            message: error.message
        });
    }
})


// Delete
export const deleteNotification = createAsyncThunk("notification/delete", async (notificationId, { rejectWithValue }) => {
    try {
        await api.delete(`${BASE_URL}/${notificationId}`);
        return notificationId;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})

// Create
export const addNotification = createAsyncThunk("notification/create", async (notificationData, { rejectWithValue }) => {
    try {
        const { data } = await api.post(`${BASE_URL}`, notificationData);
        return data;
    }
    catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})


const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
        unreadCount: 0,
        loading: false,
        error: null
    },

    reducers: {
        clearNotifications: (state) => {
            state.notifications = [];
            state.unreadCount = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotificationByUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotificationByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload.data;
            })
            .addCase(fetchNotificationByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchNotificationBySalon.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
            })
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                const notif = state.notifications.find(n => n.id === action.payload);
                if (notif && !notif.isRead) {
                    notif.isRead = true;
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            })
            .addCase(deleteNotification.fulfilled, (state, action) => {
                const deleted = state.notifications.find(n => n.id === action.payload);
                state.notifications = state.notifications.filter(n => n.id !== action.payload);
                if (deleted && !deleted.isRead) {
                    state.unreadCount = Math.max(0, state.unreadCount - 1);
                }
            })
            .addCase(addNotification.fulfilled, (state, action) => {
                state.notifications.unshift(action.payload);
                state.unreadCount++;
            })
            .addMatcher((action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
    }

})

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;






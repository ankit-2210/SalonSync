import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
// import { salonReducer } from "./Salon/reducer";
import salonReducer from "./Salon/salonSlice";
import authReducer from "./Auth/authSlice";
import bookingReducer from "./Booking/bookingSlice";
import categoriesReducer from "./Category/categorySlice";
import servicesReducer from "./Service/serviceSlice";
import notificationReducer from "./Notification/NotificationSlice";
import reviewReducer from "./Review/ReviewSlice";
import paymentReducer from "./Payment/paymentSlice";
import { configureStore } from "@reduxjs/toolkit";

// const rootReducers = combineReducers({
// salon: salonReducer
// })

// export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
export const store = configureStore({
    reducer: {
        salon: salonReducer,
        auth: authReducer,
        booking: bookingReducer,
        categories: categoriesReducer,
        services: servicesReducer,
        notification: notificationReducer,
        review: reviewReducer,
        payment: paymentReducer
    }
})

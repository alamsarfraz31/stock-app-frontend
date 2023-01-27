import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/feetures/auth/authSlice";
import productReducer from "../redux/feetures/product/productSlice";
import filterReducer from "../redux/feetures/product/filterSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        filter: filterReducer,
    },
});
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import orderVisibilitySlice from './order-component-visibility-slice';
import authSlice from './auth-slice';
import foodSlice from './food-slice';
import userSlice from './user-slice';


// Reducers
const store = configureStore({
    reducer: {
        cartReducer: cartSlice.reducer,
        orderVisibilityReducer : orderVisibilitySlice.reducer,
        authReducer: authSlice.reducer,
        foodReducer: foodSlice.reducer,
        userReducer: userSlice.reducer
    }

})



// Actions
export const cartActions = cartSlice.actions;
export const orderVisibilityActions = orderVisibilitySlice.actions;
export const authActions = authSlice.actions;
export const foodActions = foodSlice.actions;




//Store
export default store;    
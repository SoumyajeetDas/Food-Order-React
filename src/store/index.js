import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import cartItemShowSlice from './cart-item-show-slice';
import authSlice from './auth-slice';
import foodSlice from './food-slice'


// Reducers
const store = configureStore({
    reducer: {
        cartReducer: cartSlice.reducer,
        cartItemShowReducer : cartItemShowSlice.reducer,
        authReducer: authSlice.reducer,
        foodReducer: foodSlice.reducer
    }

})



// Actions
export const cartActions = cartSlice.actions;
export const cartItemShowActions = cartItemShowSlice.actions;
export const authActions = authSlice.actions;
export const foodActions = foodSlice.actions;




//Store
export default store;    
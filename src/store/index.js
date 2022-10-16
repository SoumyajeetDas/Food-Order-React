import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import cartItemShowSlice from './cart-item-show-slice'



const store = configureStore({
    reducer: {
        cartReducer: cartSlice.reducer,
        cartItemShowReducer : cartItemShowSlice.reducer
    }

})


export const cartActions = cartSlice.actions;
export const cartItemShowActions = cartItemShowSlice.actions;

export default store;    
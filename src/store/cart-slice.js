import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./service/cartService";

const initialCartState = {
    items: [],
    totalPrice: 0,
    changed: false,
    isCartError: false,
    cartMessage: ''
}



/**********************Get the cart Data when Food.js gets mounted*************************/
export const getCartData = createAsyncThunk('cart/getCartData', async (value = null, thunkAPI) => {
    try {

        // With getState() you can access any state all over the React Project. getState() actually returns all the reducer which is 
        // present in the stire and throught the reducer the state can be accessed.
        const token = thunkAPI.getState().authReducer.registerData.token;


        let response = await cartService.getCart(token);


        // The value passed in the fulfillWithValue will be going in the reducer method as action.paylaod
        if (response.status === '200 OK') return thunkAPI.fulfillWithValue(response.cartData[0]);



        else if (response.status === '500 Internal Server Error')
            return thunkAPI.rejectWithValue(response.message);


    }

    catch (err) {
        return thunkAPI.rejectWithValue('Problem with the cart');
    }
});



/**********************Update the cart data in Mongo DB on adding any item in cart*************************/
export const updateCartData = createAsyncThunk('cart/updateCartData', async (value = null, thunkAPI) => {
    try {

        // With getState() you can access any state all over the React Project. getState() actually returns all the reducer which is 
        // present in the stire and throught the reducer the state can be accessed.
        const token = thunkAPI.getState().authReducer.registerData.token;

        const cartData = thunkAPI.getState().cartReducer


        let response = await cartService.updateCart(token, cartData);


        // The value passed in the fulfillWithValue will be going in the reducer method as action.paylaod
        if (response.status === '200 OK') return thunkAPI.fulfillWithValue(`Item got added`);

        else
            return thunkAPI.rejectWithValue(response.message);


    }

    catch (err) {
        return thunkAPI.rejectWithValue('Problem with the cart');
    }
});



const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {


        addItem(state, action) {


            // const updatedItems = state.items.concat(action.item);
            state.totalPrice = state.totalPrice + action.payload.price * action.payload.amount; // Costing


            /******************Checking new or updated element**************************/

            // 1. Find the index
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id); // findIndex will return the index if value found otherwise -1

            // 2. Find the item with the index
            const existingCartItem = state.items[existingCartItemIndex]; // If the index is incorrect then the value of existingCartItem is undefined


            state.changed = true; // This is required to confirm whethere the data will be save din DB or not. Explanation in App.js

            // 3. Update the item if present and add in the list if new


            if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.payload.amount
                }

                state.items[existingCartItemIndex] = updatedItem
            }
            else {

                // We can use both conact and push. However concat returns a new array while push adds data on the existing array
                // state.items = state.items.concat(action.payload)
                state.items.push(action.payload)
            }


        },

        removeItem(state, action) {

            // 1. Find the index
            const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload);


            // 2. Find the item with the index
            const existingCartItem = state.items[existingCartItemIndex];


            state.changed = true; // This is required to confirm whethere the data will be save din DB or not. Explanation in App.js


            // 3. Update the amount for the item if present and remove it when the amount is 0
            state.totalPrice = state.totalPrice - existingCartItem.price;

            if (state.totalPrice < 0) {
                state.totalPrice = 0
            }

            if (state.items[existingCartItemIndex].amount === 1) {
                state.items = state.items.filter(item => item.id !== action.payload);
            }
            else {
                state.items[existingCartItemIndex].amount = state.items[existingCartItemIndex].amount - 1
            }

        },

        clearItem(state) {
            state.items = [];
            state.totalPrice = 0;
        },

        reset(state) {
            state.isCartError = false;
            state.cartMessage = ''
            state.changed = false;
        }
    },

    extraReducers: {
        [getCartData.fulfilled]: (state, action) => {
            state.items = action.payload.items;
            state.totalPrice = action.payload.totalPrice;
            state.isCartError = false;
            state.changed = false
        },

        [getCartData.rejected]: (state, action) => {
            state.isCartError = true;
            state.cartMessage = action.payload
        },


        [updateCartData.fulfilled]: (state, action) => {
            state.cartMessage = action.payload;
            state.isCartError = false
        },

        [updateCartData.rejected]: (state, action) => {
            state.isCartError = true;
            state.cartMessage = action.payload
        },
    }
});


export default cartSlice

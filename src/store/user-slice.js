import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./service/userService";

const initialUserState = {
    name: '',
    address: '',
    email: '',
    phone: 0,
    orderNumber: 0,
    profilePic: '',
    isUserError: false,
    userMessage: '',
    isLoading: false
}


export const getUserData = createAsyncThunk('user/getUserData', async (value = null, thunkAPI) => {
    try {

        const token = thunkAPI.getState().authReducer.registerData.token;

        const response = await userService.getUser(token);

        // The value passed in the fulfillWithValue will be going in the reducer method as action.paylaod
        if (response.status === '200 OK') return thunkAPI.fulfillWithValue(response.data);


        else if (response.status === '500 Internal Server Error') return thunkAPI.rejectWithValue(response.message);



        else {
            return thunkAPI.rejectWithValue(response.status);
        }
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
    },
    extraReducers: {

        [getUserData.fulfilled]: (state, action) => {
            state.name = action.payload.name;
            state.address = action.payload.address;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.orderNumber = action.payload.orderNumber;
            state.profilePic = action.payload.profilePic;
            state.isUserError = false;
            state.userMessage = '';
            state.isLoading = false;
        },

        [getUserData.pending]: (state) => {
            state.isLoading = true;
        },

        [getUserData.rejected]: (state, action) => {
            state.name = '';
            state.address = '';
            state.email = '';
            state.phone = 0;
            state.orderNumber = 0;
            state.profilePic = action.payload.profilePic;
            state.isUserError = true;
            state.userMessage = action.payload;
            state.isLoading = false;
        },
    }
});

export default userSlice;
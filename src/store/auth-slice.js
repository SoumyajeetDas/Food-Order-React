import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './service/authService';
import Cookie from 'js-cookie';


// Done by normal authentication process. The autghentication process should be done by the reset token and access token 
// and httpOnly cookie but cannot be done as httpOnly Cookie is not working with vercel and Heroku.

// The expiration is 1 day. Within that 1 day each time the site gets loaded the cookie comes along with it. When the 
// cookie gets expired the cookies also disappears.
const registerData = Cookie.get('userregisterData') ? JSON.parse(Cookie.get('userregisterData')) : '';

const initialAuthState = {
    registerData,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


// createAsyncThunk will always return a promise
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {

    try {
        let response = await authService.register(user);

        // The value passed in the fulfillWithValue will be going in the reducer method as action.paylaod
        if (response.status === '201 Created successfully') return thunkAPI.fulfillWithValue(response.data);



        else if (response.status === '500 Internal Server Error' && response.message === "Duplicate")
            return thunkAPI.rejectWithValue("Sorry user already exists with same email!!")



        // The value passed in the rejectWithValue will be going in the reducer method as action.paylaod
        else return thunkAPI.rejectWithValue("Sorry Could not Signin !!");
    }

    catch (err) {
        return thunkAPI.rejectWithValue('Could not able to login. Problem from backend!!');
    }
});



// createAsyncThunk will always return a promise
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {

    try {
        let response = await authService.login(user);

        // The value passed in the fulfillWithValue will be going in the reducer method as action.paylaod
        if (response.status === '200 OK') return thunkAPI.fulfillWithValue(response.data);



        // The value passed in the rejectWithValue will be going in the reducer method as action.paylaod
        else return thunkAPI.rejectWithValue(response.message);
    }

    catch (err) {
        return thunkAPI.rejectWithValue('Could not able to login. Problem from backend!!');
    }
});


export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
})



// createAsyncThunk will always return a promise
export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (user, thunkAPI) => {

    try {
        let response = await authService.handleForgotPassword(user);

        // The value passed in the fulfillWithValue will be going in the reducer method as action.paylaod
        if (response.status === '200 OK') return thunkAPI.fulfillWithValue(response.message);



        // The value passed in the rejectWithValue will be going in the reducer method as action.paylaod
        else return thunkAPI.rejectWithValue(response.message);
    }

    catch (err) {
        return thunkAPI.rejectWithValue('Problem from backend!!');
    }
});



// createAsyncThunk will always return a promise
export const resetPassword = createAsyncThunk('auth/resetPassword', async (user, thunkAPI) => {

    try {
        let response = await authService.handleResetPassword(user);

        // The value passed in the fulfillWithValue will be going in the reducer method as action.paylaod
        if (response.status === '200 OK') return thunkAPI.fulfillWithValue(response.message);



        // The value passed in the rejectWithValue will be going in the reducer method as action.paylaod
        else return thunkAPI.rejectWithValue(response.message);
    }

    catch (err) {
        return thunkAPI.rejectWithValue('Problem from backend!!');
    }
});




export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },


    // For asyncCreateThunk the reducer methods will always be created inside extraReducer
    extraReducers: {
        [register.pending]: (state) => {
            state.isLoading = true
        },

        [register.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.registerData = action.payload
        },
        [register.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.registerData = null;
        },



        [login.pending]: (state) => {
            state.isLoading = true
        },

        [login.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.registerData = action.payload
        },
        [login.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.registerData = null;
        },



        [logout.fulfilled]: (state) => {
            state.registerData = '';
        },



        [forgotPassword.pending]: (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },

        [forgotPassword.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message = action.payload
        },
        [forgotPassword.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        },


        [resetPassword.pending]: (state) => {
            state.isLoading = true
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },

        [resetPassword.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.message = action.payload
        },
        [resetPassword.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
        },

    }
});


export default authSlice;


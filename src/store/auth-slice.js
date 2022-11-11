import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './service/authService';
import Cookie from 'js-cookie';



// Genarally the whole authentication should take place with the help of refresh token and acees token. But I didn't do in that way.
// I created two tokens in the backend. One is server Side JWT Token and another is client side JWT Token. The client side token
// gets stored into userRegisterData and in the cookie as well. And this token will be passed as Bearer token into all the requests.
// The server side token is registered as httpOnlyCookie.
// First when the request gets passed the client Side will go to the protect() route and it will be verified and then if it is 
// verified the server side token will be verified and then the request will be executed in the backend. 
// I feel if there is any changes made in the client side token there will be no problem as the backend will be ultimately get 
// authorized by the client token and that cannot be changed as it is httpOnlyCookie. 
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
        let response = await authService.passwordUpdate(user);

        // The value passed in the fulfillWithValue will be going in the reducer method as action.paylaod
        if (response.status === '200 OK') return thunkAPI.fulfillWithValue(response.message);



        else if (response.status === '500 Internal Server Error' && response.message === "Duplicate")
            return thunkAPI.rejectWithValue("Sorry user already exists with same email!!")



        // The value passed in the rejectWithValue will be going in the reducer method as action.paylaod
        else return thunkAPI.rejectWithValue(response.message);
    }

    catch (err) {
        return thunkAPI.rejectWithValue('Could not able to login. Problem from backend!!');
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

    }
});


export default authSlice;


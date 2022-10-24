import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import foodService from './service/food-fetch-service'


const initialFoodState = {
    foodItems: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


/**********************Get all Foods when Food.js gets mounted*************************/ 
export const fetchFood = createAsyncThunk('foods/fetchFood', async (value = null, thunkAPI) => {

    try {

        // With getState() you can access any state all over the React Project. getState() actually returns all the reducer which is 
        // present in the stire and throught the reducer the state can be accessed.
        const token = thunkAPI.getState().authReducer.registerData.token;
        
        const foodData = await foodService.getAllFoods(token);

        if(foodData.status === '401 Unauthorized') return thunkAPI.rejectWithValue(foodData.status);

        else if (foodData.status === '200 OK') return thunkAPI.fulfillWithValue(foodData.data);

        else if (foodData.status === '400 Bad Request') return thunkAPI.rejectWithValue(foodData.message);

        else return thunkAPI.rejectWithValue(foodData.message)
    }

    catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
})




/**********************Fetch the type of food depending on which button pressed like Breakfast, Lunch etc.*************************/ 
export const fetchFoodTypeFood = createAsyncThunk('foods/fetchFoodTypeFood',async(type, thunkAPI) => {
    try {

        // With getState() you can access any state all over the React Project. getState() actually returns all the reducer which is 
        // present in the stire and throught the reducer the state can be accessed.
        const token = thunkAPI.getState().authReducer.registerData.token;
        
        const foodData = await foodService.getFoodTypeFoods(type,token);


        if(foodData.status === '401 Unauthorized') return thunkAPI.rejectWithValue(foodData.status);

        else if (foodData.status === '200 OK') return thunkAPI.fulfillWithValue(foodData.data);

        else if (foodData.status === '400 Bad Request') return thunkAPI.rejectWithValue(foodData.message);

        else return thunkAPI.rejectWithValue(foodData.message)
    }

    catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
});




/**********************Call the searched Food*************************/ 
export const fetchSearchedFood = createAsyncThunk('foods/fetchSearchedFood',async(key, thunkAPI) => {
    try {

        // With getState() you can access any state all over the React Project. getState() actually returns all the reducer which is 
        // present in the stire and throught the reducer the state can be accessed.
        const token = thunkAPI.getState().authReducer.registerData.token;
        
        const foodData = await foodService.getSearchedFoods(key,token);

        if(foodData.status === '401 Unauthorized') return thunkAPI.rejectWithValue(foodData.status);

        else if (foodData.status === '200 OK' && foodData.length===0) return thunkAPI.rejectWithValue('No data found');

        else if (foodData.status === '200 OK') return thunkAPI.fulfillWithValue(foodData.data);

        else if (foodData.status === '400 Bad Request') return thunkAPI.rejectWithValue(foodData.message);

        else return thunkAPI.rejectWithValue(foodData.message)
    }

    catch(err){
        return thunkAPI.rejectWithValue(err.message);
    }
})

const foodSlice = createSlice({
    name: 'foods',
    initialState: initialFoodState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.message = ''
        }
    },

    extraReducers: {
        [fetchFood.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
        },

        [fetchFood.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.foodItems = action.payload;
        },

        [fetchFood.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload
        },


        [fetchFoodTypeFood.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
        },

        [fetchFoodTypeFood.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.foodItems = action.payload;
        },

        [fetchFoodTypeFood.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload
        },


        [fetchSearchedFood.pending]: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
        },

        [fetchSearchedFood.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.foodItems = action.payload;
        },

        [fetchSearchedFood.rejected]: (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload
        }
    }
});


export default foodSlice;
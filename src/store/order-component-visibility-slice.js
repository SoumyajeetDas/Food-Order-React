import { createSlice } from "@reduxjs/toolkit";

const initialOrderVisibilityState = {
    willShow:false
}


const orderVisibilitySlice = createSlice({
    name:'orderVisibility',
    initialState:initialOrderVisibilityState,
    reducers:{
        show(state){
            state.willShow = true;
        },
        dontShow(state){
            state.willShow = false;
        }
    }
})

export default orderVisibilitySlice

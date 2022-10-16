import { createSlice } from "@reduxjs/toolkit";

const initialCartShowState = {
    willShow:false
}


const carItemShowSlice = createSlice({
    name:'cartItemShow',
    initialState:initialCartShowState,
    reducers:{
        show(state){
            state.willShow = true;
        },
        dontShow(state){
            state.willShow = false;
        }
    }
})

export default carItemShowSlice

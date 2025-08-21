import { createSlice } from "@reduxjs/toolkit";

const cafeReducer = createSlice({
    name: 'cafe',
    initialState: {
       cafeList: []
    },
    reducers: {
        setCafeList(state, action) {
            state.cafeList = action.payload
        }, 
    }

},)

export const { setCafeList } = cafeReducer.actions

export default cafeReducer.reducer
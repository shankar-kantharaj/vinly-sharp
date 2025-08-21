import { createSlice } from "@reduxjs/toolkit";

const userDetailsReducer = createSlice({
    name: 'userDetails',
    initialState: {
       userType: 'Guest User'
    },
    reducers: {
        setUserType(state, action) {
            state.userType = action.payload
        }, 
    }

},)

export const { setUserType } = userDetailsReducer.actions

export default userDetailsReducer.reducer
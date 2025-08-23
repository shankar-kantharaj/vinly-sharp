import { createSlice } from "@reduxjs/toolkit";

const userDetailsReducer = createSlice({
    name: 'userDetails',
    initialState: {
       userType: 'Guest User',
       userLocation: {
           latitude: 0,
           longitude: 0
       }
    },
    reducers: {
        setUserType(state, action) {
            state.userType = action.payload
        }, 
        setUserLocation(state, action) {
            state.userLocation = action.payload
        }
    }

},)

export const { setUserType, setUserLocation } = userDetailsReducer.actions

export default userDetailsReducer.reducer
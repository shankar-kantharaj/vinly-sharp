import { createSlice } from "@reduxjs/toolkit";
import { FilterDataType } from "../../api/auth/main/safety-types";

const filterReducer = createSlice({
    name: 'filter',
    initialState: {
       filterDataFromApi: {} as FilterDataType,
       filterDataByUser: {} as FilterDataType,
    },
    reducers: {
        setFilterDataFromApi(state, action) {
            state.filterDataFromApi = action.payload
        }, 
        setFilterDataByUser(state, action) {
            state.filterDataByUser = action.payload
        },
        
    }

},)

export const { setFilterDataFromApi, setFilterDataByUser } = filterReducer.actions

export default filterReducer.reducer
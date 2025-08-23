import { createSlice } from '@reduxjs/toolkit';

const cafeReducer = createSlice({
  name: 'cafe',
  initialState: {
    cafeList: [],
    cafeListByLocation: [],
    cafeListBySearch: [],
    cafeListBySelectedFilters: [],
    recommendedCafesByLocationFilters: [],
    recommendedCafesByLocationFiltersAndSearches: [],
  },
  reducers: {
    setCafeList(state, action) {
      state.cafeList = action.payload;
    },
    setCafeListByLocation(state, action) {
      state.cafeListByLocation = action.payload;
    },
    setCafeListBySearch(state, action) {
      state.cafeListBySearch = action.payload;
    },
    setCafeListBySelectedFilters(state, action) {
      state.cafeListBySelectedFilters = action.payload;
    },
    setRecommendedCafesByLocationFilters(state, action) {
      state.recommendedCafesByLocationFilters = action.payload;
    },
    setRecommendedCafesByLocationFiltersAndSearches(state, action) {
      state.recommendedCafesByLocationFiltersAndSearches = action.payload;
    }       
  },
});

export const {
  setCafeList,
  setCafeListByLocation,
  setCafeListBySearch,
  setCafeListBySelectedFilters,
  setRecommendedCafesByLocationFilters,
  setRecommendedCafesByLocationFiltersAndSearches
} = cafeReducer.actions;

export default cafeReducer.reducer;

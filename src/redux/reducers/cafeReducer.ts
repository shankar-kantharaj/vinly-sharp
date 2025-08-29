import { createSlice } from '@reduxjs/toolkit';
import { pageinationType } from '../../api/auth/main/safety-types';

const cafeReducer = createSlice({
  name: 'cafe',
  initialState: {
    cafeList: {
      data: [],
      pagination: {} as pageinationType,
    },
    recommendations: {
      data: [],
      pagination: {} as pageinationType,
    },
    cafeListByLocation: {
      data: [],
      pagination: {} as pageinationType,
    },
    cafeListBySearch: {
      data: [],
      pagination: {} as pageinationType,
    },
    cafeListBySelectedFilters: {
      data: [],
      pagination: {} as pageinationType,
    },
    recommendedCafesByLocationFilters: {
      data: [],
      pagination: {} as pageinationType,
    },
    recommendedCafesByLocationFiltersAndSearches: {
      data: [],
      pagination: {} as pageinationType,
    },
  },
  reducers: {
    setCafeList(state, action) {
      state.cafeList = action.payload;
    },
    setRecommendations(state, action) {
      state.recommendations = action.payload;
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
  setRecommendations,
  setCafeListByLocation,
  setCafeListBySearch,
  setCafeListBySelectedFilters,
  setRecommendedCafesByLocationFilters,
  setRecommendedCafesByLocationFiltersAndSearches
} = cafeReducer.actions;

export default cafeReducer.reducer;

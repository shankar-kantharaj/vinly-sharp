import axios from 'axios';
import { baseUrl } from '../../../constants/variables';
import { AppDispatch } from '../../../redux/store';
import {
  setCafeList,
  setCafeListByLocation,
  setCafeListBySearch,
  setCafeListBySelectedFilters,
  setRecommendedCafesByLocationFilters,
  setRecommendedCafesByLocationFiltersAndSearches,
} from '../../../redux/reducers/cafeReducer';
import { FilterDataType } from './safety-types';
import { Alert } from 'react-native';

export const getCafeList = async (
  lat: Number,
  long: Number,
  dispatch: AppDispatch,
) => {
  try {
    // const response = await axios.get(
    //   `${baseUrl}/cafes?latitude=${lat}&longitude=${long}`,
    // );

    const data = [
      {
        cafe_id: 'cafe-uuid-123',
        cafe_name: 'The Cozy Corner',
        address: 'MG Road, Bangalore, Karnataka, 560001',
        distance: '2.3',
      },
      {
        cafe_id: 'cafe-uuid-124',
        cafe_name: 'Brew & Chew',
        address: '42nd Main road, Bangalore, Karnataka, 560003',
        distance: '1.4',
      },
      {
        cafe_id: 'cafe-uuid-125',
        cafe_name: 'Bloom cafe',
        address: 'MG Road, Bangalore, Karnataka, 560001',
        distance: '2',
      },
      {
        cafe_id: 'cafe-uuid-126',
        cafe_name: 'The Beanery',
        address: 'MG Road, Bangalore, Karnataka, 560001',
        distance: '2',
      },
    ];
    dispatch(setCafeList(data));
    // console.log(response.data);
  } catch (error) {
    console.log('Error getCafeList api : ', error);
  } finally {
    console.log('getCafeList finished');
  }
};

export const getCafeListByLocation = async (
  currentLocation: { latitude: number; longitude: number },
  dispatch: AppDispatch,
) => {
  try {
    // const response = await axios.get(
    //   `${baseUrl}/cafes?latitude=${lat}&longitude=${long}`,
    // );

    const data = [
      {
        cafe_id: 'cafe-uuid-123',
        cafe_name: 'The Cozy Corner',
        address: 'MG Road, Bangalore, Karnataka, 560001',
        distance: '2.3',
      },
      {
        cafe_id: 'cafe-uuid-124',
        cafe_name: 'Brew & Chew',
        address: '42nd Main road, Bangalore, Karnataka, 560003',
        distance: '1.4',
      },
      {
        cafe_id: 'cafe-uuid-125',
        cafe_name: 'Bloom cafe',
        address: 'MG Road, Bangalore, Karnataka, 560001',
        distance: '2',
      },
    ];
    dispatch(setCafeListByLocation(data));
    // console.log(response.data);
  } catch (error) {
    console.log('Error getCafeListByLocation api : ', error);
  } finally {
    console.log('getCafeListByLocation finished');
  }
};

export const getCafeListBySearch = async (
  cafeName: string,
  currentLocation: { latitude: number; longitude: number },
  dispatch: AppDispatch,
) => {
  try {
    // const response = await axios.get(
    //   `${baseUrl}/cafes/search?query=${cafeName}&latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}`,
    // );

    const data = [
      {
        cafe_id: 'cafe-uuid-234',
        cafe_name: 'Corner Bistro',
        address: 'Church Street, Bangalore, Karnataka, 560001',
        distance: 1.1,
      },
      {
        cafe_id: 'cafe-uuid-235',
        cafe_name: 'Brew & Bean',
        address: 'MG Road, Bangalore, Karnataka, 560001',
        distance: 0.8,
      },
      {
        cafe_id: 'cafe-uuid-236',
        cafe_name: 'Urban Grind',
        address: 'Indiranagar, Bangalore, Karnataka, 560038',
        distance: 2.3,
      },
      {
        cafe_id: 'cafe-uuid-237',
        cafe_name: 'The Daily Roast',
        address: 'Koramangala 5th Block, Bangalore, Karnataka, 560095',
        distance: 3.0,
      },
      {
        cafe_id: 'cafe-uuid-238',
        cafe_name: 'Java Junction',
        address: 'Brigade Road, Bangalore, Karnataka, 560025',
        distance: 1.5,
      },
    ];
    dispatch(setCafeListBySearch(data));
    // console.log(response.data);
  } catch (error) {
    console.log('Error getCafeListBySearch api : ', error);
  } finally {
    console.log('getCafeListBySearch finished');
  }
};

export const getCafeListBySelectedFilters = async (
  filters: FilterDataType,
  dispatch: AppDispatch,
) => {
  try {
    // const response = await axios.get(
    //   `${baseUrl}/cafes/filter`,
    // );

    const data = [
      {
        cafe_id: 'cafe-uuid-234',
        cafe_name: 'Corner Bistro',
        address: 'Church Street, Bangalore, Karnataka, 560001',
        distance: 1.1,
      },
      {
        cafe_id: 'cafe-uuid-235',
        cafe_name: 'Brew & Bean',
        address: 'MG Road, Bangalore, Karnataka, 560001',
        distance: 0.8,
      },
      {
        cafe_id: 'cafe-uuid-236',
        cafe_name: 'Urban Grind',
        address: 'Indiranagar, Bangalore, Karnataka, 560038',
        distance: 2.3,
      },
      {
        cafe_id: 'cafe-uuid-237',
        cafe_name: 'The Daily Roast',
        address: 'Koramangala 5th Block, Bangalore, Karnataka, 560095',
        distance: 3.0,
      },
      {
        cafe_id: 'cafe-uuid-238',
        cafe_name: 'Java Junction',
        address: 'Brigade Road, Bangalore, Karnataka, 560025',
        distance: 1.5,
      },
    ];
    dispatch(setCafeListBySelectedFilters(data));
    // console.log(response.data);
  } catch (error) {
    console.log('Error getCafeListBySearch api : ', error);
  } finally {
    console.log('getCafeListBySearch finished');
  }
};

export const getRecommendedCafesByLocationFilters = async (
  requestBody: {
    latitude: number;
    longitude: number;
    filter: FilterDataType;
    limit: number;
  },
  dispatch: AppDispatch,
) => {
  try {
    // const response = await axios.post(
    //   `${baseUrl}/cafes/recommend`,
    //   requestBody,
    // );

    const data = [
      {
        cafe_id: 'cafe-uuid-243',
        cafe_name: 'Cafe Aroma',
        address: 'Jayanagar 4th Block, Bangalore, Karnataka, 560011',
        distance: 2.9,
      },
      {
        cafe_id: 'cafe-uuid-244',
        cafe_name: 'Roast Republic',
        address: 'HSR Layout, Bangalore, Karnataka, 560102',
        distance: 4.8,
      },
      {
        cafe_id: 'cafe-uuid-245',
        cafe_name: 'Bean Boulevard',
        address: 'Banashankari, Bangalore, Karnataka, 560070',
        distance: 3.2,
      },
      {
        cafe_id: 'cafe-uuid-246',
        cafe_name: 'Cafe Cosmo',
        address: 'Ulsoor, Bangalore, Karnataka, 560008',
        distance: 2.4,
      },
        {
        cafe_id: 'cafe-uuid-247',
        cafe_name: 'Brew Haven',
        address: 'BTM Layout, Bangalore, Karnataka, 560029',
        distance: 3.7,
      },
      {
        cafe_id: 'cafe-uuid-248',
        cafe_name: 'Perk Palace',
        address: 'Vasanth Nagar, Bangalore, Karnataka, 560052',
        distance: 1.9,
      },
      {
        cafe_id: 'cafe-uuid-249',
        cafe_name: 'Ground Up Cafe',
        address: 'Domlur, Bangalore, Karnataka, 560071',
        distance: 2.8,
      },
      {
        cafe_id: 'cafe-uuid-250',
        cafe_name: 'Sip & Sit',
        address: 'Sarjapur Road, Bangalore, Karnataka, 560035',
        distance: 5.0,
      },
    ];
    dispatch(setRecommendedCafesByLocationFilters(data));
    // console.log(response.data);
  } catch (error) {
    console.log('Error getRecommendedCafesByLocationFilters api : ', error);
  } finally {
    console.log('getRecommendedCafesByLocationFilters finished');
  }
};

export const getRecommendedCafesByLocationFiltersSearches = async (
  requestBody: {
    latitude: number;
    longitude: number;
    recent_searches: string[];
    filter: FilterDataType;
    limit: number;
  },
  dispatch: AppDispatch,
) => {
  try {
    // const response = await axios.post(
    //   `${baseUrl}/cafes/recommendations`,
    //   requestBody,
    // );

    const data = [
      {
        cafe_id: 'cafe-uuid-239',
        cafe_name: 'Mocha Magic',
        address: 'Residency Road, Bangalore, Karnataka, 560025',
        distance: 1.2,
      },
      {
        cafe_id: 'cafe-uuid-240',
        cafe_name: 'Caffeine Dreams',
        address: 'Whitefield Main Road, Bangalore, Karnataka, 560066',
        distance: 5.4,
      },
      {
        cafe_id: 'cafe-uuid-241',
        cafe_name: 'Espresso Lane',
        address: 'JP Nagar 3rd Phase, Bangalore, Karnataka, 560078',
        distance: 4.1,
      },
      {
        cafe_id: 'cafe-uuid-242',
        cafe_name: 'Latte Lounge',
        address: 'Malleshwaram, Bangalore, Karnataka, 560003',
        distance: 3.6,
      },
    
    ];
    dispatch(setRecommendedCafesByLocationFiltersAndSearches(data));
    // console.log(response.data);
  } catch (error) {
    console.log(
      'Error getRecommendedCafesByLocationFiltersSearches api : ',
      error,
    );
  } finally {
    console.log('getRecommendedCafesByLocationFiltersSearches finished');
  }
};

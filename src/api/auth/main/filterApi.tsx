import { setFilterDataFromApi } from '../../../redux/reducers/filterReducer';
import { AppDispatch } from '../../../redux/store';

export const getAvailableFilters = async (
  dispatch: AppDispatch,
) => {
  try {
    // const response = await axios.get(
    //   `${baseUrl}/cafes/filters`,
    // );

    const data = {
      availability: ['Available', 'Unavailable'],
      amenities: [
        'Lunch',
        'Dinner',
        'Barbecue',
        'WiFi',
        'Parking',
        'Live Music',
      ],
      music_genre: [
        'Instrumental',
        'Rock',
        'Pop',
        'Jazz',
        'Classical',
        'Electronic',
      ],
      sortby: [
        'Distance: Near to Far',
        'Rating: High to Low',
        'Price: Low to High',
      ],
      category: ['Flagship', 'All Cafes'],
      timings: {
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        start_times: ['09:00', '10:00', '11:00', '12:00'],
        end_times: ['21:00', '22:00', '23:00', '00:00'],
      },
      servicable_locations: [
        { location_id: 'uuid-12', location_name: 'Bangalore' },
        { location_id: 'uuid-15', location_name: 'Mumbai' },
      ],
    };
    dispatch(setFilterDataFromApi(data));
  } catch (error) {
    console.log('Error getAvailableFilters api : ', error);
  } finally {
    console.log('getAvailableFilters finished');
  }
};

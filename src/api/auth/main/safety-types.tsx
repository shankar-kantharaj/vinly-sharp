export interface CafeDataType {
  key: string;
  cafe_name: string;
  address: string;
  cafeImage: any;
  isFavorite: boolean;
}

export interface CafeListByLocationType {
  key: string;
  cafe_name: string;
  address: string;
  cafeImage: any;
  distance: string | number;
  isFavorite: boolean;
}


export interface FilterDataTypeFromApi {
  availability: string[];
  amenities: string[];
  music_genre: string[];
  sortby: string[];
  category: string[];
  timings: {
    days: string[];
    start_times: string[];
    end_times: string[];
  };
  servicable_locations: Array<{
    location_id: string;
    location_name: string;
  }>;
}


export interface  FilterValuesForApiReqBody {
  availability: string ;
  amenities: string[];
  music_genre: string[];
  category: string;
  location_id: string;
  timings: {
    day: string;
    start_time: string;
    end_time: string;
  };
  sortby: string;
  latitude: number;
  longitude: number;
}


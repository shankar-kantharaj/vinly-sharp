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


export interface FilterDataType {
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




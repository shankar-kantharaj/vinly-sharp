export interface CafeDataType {
  key: string;
  cafeName: string;
  address: string;
  cafeImage: any;
  isFavorite: boolean;
  isFlagship?: boolean;
}

export interface CafeListByLocationType {
  key: string;
  cafeName: string;
  address: string;
  cafeImage: any;
  distance: string | number;
  isFavorite: boolean;
}

export interface FilterDataTypeFromApi {
  availability: string[];
  amenities: string[];
  musicGenre: string[];
  sortby: string[];
  category: string[];
  timings: {
    days: string[];
    startTimes: string[];
    endTimes: string[];
  };
  servicableLocations: Array<{
    locationId: string;
    locationName: string;
  }>;
}


export interface  FilterValuesForApiReqBody {
  availability: string ;
  amenities: string[];
  musicGenre: string[];
  category: string;
  locationId: string;
  timings: {
    day: string;
    startTime: string;
    endTime: string;
  };
  sortby: string; 
}

export interface pageinationType {
  /** total number of items across all pages */
  totalElements: number;
  /** zero-based page index (0 = first page) */
  page: number;
  /** max items per page */
  limit: number;
  /** total number of pages */
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

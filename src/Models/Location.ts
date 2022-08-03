interface Location {
  id?: number;
  tag?: string;
  address?: string;
  city?: {
    id?: number;
    name?: string;
  };
  state?: {
    id?: number;
    name?: string;
  };
  country: {
    id?: number;
    name?: string;
  };
  zipcode?: number;
  latitude?: number;
  longitude?: number;
}
export type { Location };

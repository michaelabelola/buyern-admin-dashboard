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
interface Country {
  id: number;
  name: string;
  iso3: string;
  numericCode: string;
  iso2: string;
  phoneCode: string;
  capital: string;
  currency: string;
  currencyName: string;
  currency_symbol: string;
  tld: string;
  _native: string;
  region: string;
  subRegion: string;
  timezones: string;
  translations: string;
  latitude: number;
  longitude: number;
  emoji: string;
  emojiU: string;
  createdAt: Date;
  updatedAt: Date;
  flag: boolean;
  wikiDataId: string;
}
interface State {
  id: number;
  name: string;
  countryId: number;
  countryCode: string;
  fipsCode: string;
  iso2: string;
  type: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
  flag: boolean;
  wikiDataId: string;
}
interface City {
  id: number;
  name: string;
  stateId: number;
  stateCode: string;
  countryId: number;
  countryCode: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
  flag: true;
  wikiDataId: string;
}
export type { Location, Country, State, City };

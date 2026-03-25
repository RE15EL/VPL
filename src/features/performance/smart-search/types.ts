export type RandomUserName = {
  title: string;
  first: string;
  last: string;
};

export type RandomUserStreet = {
  number: number;
  name: string;
};

export type RandomUserCoordinates = {
  latitude: string;
  longitude: string;
};

export type RandomUserTimezone = {
  offset: string;
  description: string;
};

export type RandomUserLocation = {
  street: RandomUserStreet;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: RandomUserCoordinates;
  timezone: RandomUserTimezone;
};

export type RandomUserLogin = {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
};

export type RandomUserDateInfo = {
  date: string;
  age: number;
};

export type RandomUserId = {
  name: string;
  value: string | null;
};

export type RandomUserPicture = {
  large: string;
  medium: string;
  thumbnail: string;
};

export type RandomUser = {
  gender: string;
  name: RandomUserName;
  location: RandomUserLocation;
  email: string;
  login: RandomUserLogin;
  dob: RandomUserDateInfo;
  registered: RandomUserDateInfo;
  phone: string;
  cell: string;
  id: RandomUserId;
  picture: RandomUserPicture;
  nat: string;
};

export type RandomUserInfo = {
  seed: string;
  results: number;
  page: number;
  version: string;
};

export type RandomUserResponse = {
  results: RandomUser[];
  info: RandomUserInfo;
};

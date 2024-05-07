export type TokenType = { _id: string; isBusiness: boolean; isAdmin: boolean };

export type LoginType = {
  email: string;
  password: string;
};

export type AddressType = {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip: number;
};

export type ImageType = { url?: string; alt?: string };

export type UserNameType = { first: string; middle?: string; last: string };

type UserType = {
  name: UserNameType;
  phone: string;
  email: string;
  password: string;
  isBusiness: boolean;
  image: ImageType;
  address: AddressType;
};

export type FullUserType = {
  _id: string;
  name: UserNameType;
  phone: string;
  email: string;
  password: string;
  isBusiness: boolean;
  image: ImageType;
  address: AddressType;
  CreatedAt: Date;
  isAdmin: boolean;
};

export type NormalizedEditUser = {
  _id?: string;
  name: UserNameType;
  phone: string;
  email: string;
  password?: string;
  isBusiness: boolean;
  image: ImageType;
  address: AddressType;
  CreatedAt: Date;
  isAdmin: boolean;
};

export type UserMapToModelType = {
  _id: string;
  first: string;
  middle: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  isBusiness: boolean;
  CreatedAt: Date;
  isAdmin: boolean;
};

export type EditedUserMapToModelType = {
  _id: string;
  first: string;
  middle: string;
  last: string;
  phone: string;
  email: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  isBusiness: boolean;
  CreatedAt: Date;
  isAdmin: boolean;
};

export type Login = Pick<UserType, "email" | "password">;

export type RegistrationForm = {
  first: string;
  middle: string;
  last: string;
  phone: string;
  email: string;
  password: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  isBusiness: boolean;
};

export type EditForm = {
  first: string;
  middle: string;
  last: string;
  phone: string;
  email: string;
  url: string;
  alt: string;
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
  zip: string;
  isBusiness: boolean;
};

export type RegistrationFormErrors = Partial<RegistrationForm>;

export type UserRegistered = {
  name: {
    first: string;
    middle?: string;
    last: string;
    _id?: string;
  };
  email: string;
  _id: string;
};

export default UserType;

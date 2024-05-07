import axios from "axios";
import UserType, {
  FullUserType,
  LoginType,
  NormalizedEditUser,
  UserRegistered,
} from "../models/types/userTypes";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:7575";

export const login = async (user: LoginType) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/users/login`, user);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const signup = async (normalizedUser: UserType) => {
  try {
    const { data } = await axios.post<UserRegistered>(
      `${apiUrl}/users`,
      normalizedUser
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getAllUsersInfo = async () => {
  try {
    const { data } = await axios.get<FullUserType[]>(`${apiUrl}/users`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getUserInfo = async (userId: string) => {
  try {
    const { data } = await axios.get<FullUserType>(`${apiUrl}/users/${userId}`);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const editUser = async (normalizedUser: NormalizedEditUser) => {
  try {
    const userToServer = { ...normalizedUser };

    const { data } = await axios.put<FullUserType>(
      `${apiUrl}/users/${normalizedUser._id}`,
      userToServer
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const ChangeUserStatus = async (userId: string | undefined) => {
  try {
    const { data } = await axios.patch<FullUserType>(
      `${apiUrl}/users/${userId}`
    );

    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/users/${userId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

import axios from "axios";
import {
  EditPayment,
  Event,
  StudentCard,
  studentDetailsToServerType,
} from "../models/types/studentTypes";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:7575";

export const getStudents = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/students`);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    console.error(error);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getMyStudents = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/students/my-students`);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getStudent = async (studentId: string) => {
  try {
    const { data } = await axios.get(`${apiUrl}/students/${studentId}`);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const createStudent = async (normalizedStudent: object) => {
  try {
    const { data } = await axios.post(`${apiUrl}/students`, normalizedStudent);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/students/${studentId}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};

export const editStudent = async (normalizedStudent: Event[]) => {
  try {
    const { data } = await axios.patch(
      `${apiUrl}/students/${normalizedStudent[0]._id}`,
      normalizedStudent
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};

export const editStudentDay = async (normalizedStudent: Event[]) => {
  try {
    const { data } = await axios.post(
      `${apiUrl}/students/edit-new-day`,
      normalizedStudent
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};

export const editStudentDetails = async (
  normalizedStudent: studentDetailsToServerType[]
) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/students/${normalizedStudent[0]._id}`,
      normalizedStudent
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};

export const editStudentPaymentRequst = async (
  normalizedStudent: EditPayment[]
) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/students/payment-requst/${normalizedStudent[0]._id}`,
      normalizedStudent
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
  }
};

export const getVerifyEmail = async (studentsEmail: string) => {
  try {
    const { data } = await axios.get(
      `${apiUrl}/students/verify-email/${studentsEmail}`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    console.error(error);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const SendEmail = async (studentDeatilToMeail: StudentCard) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/students/send-email`,
      studentDeatilToMeail
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    console.error(error);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getEmailAddresses = async (studentsEmail: string) => {
  try {
    const { data } = await axios.get(
      `${apiUrl}/students/emails-list/${studentsEmail}`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    console.error(error);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getDeletedStudents = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/students/deleted-students`);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    console.error(error);
    return Promise.reject("An unexpected error occurred!");
  }
};

export type Event = {
  title: string;
  start: Date;
  end: Date;
  price: number;
  isAttended: boolean;
  payment: Number;
  absences: Date | null;
  allowedAbsences: number;
  durationOfLesson: number;
  id: number;
  user_id?: string;
  _id?: string;
  dateOfPaymentRequest?: Date | null;
  sumOfPaymentRequest?: number;
};

export type studentFromClientType = {
  title: string;
  start: Date;
  end: Date;
  price: number;
  isAttended: boolean;
  payment: Number;
  absences: Date | null;
  allowedAbsences: number;
  durationOfLesson: number;
  id: number;
};

export type studentDetailsFromClientType = {
  _id?: string;
  user_id?: string;
  title?: string;
  start?: Date;
  end?: Date;
  isAttended?: boolean;
  payment?: Number;
  dateOfPaymentRequest?: Date | null;
  sumOfPaymentRequest?: Number;
  id?: Number;
  absences?: Date | null;
  price: string;
  allowedAbsences: string;
  durationOfLesson: string;
  phone: string;
  email: string;
  city: string;
  street: string;
  houseNumber: string;
  floor: string;
  appartment: string;
};

export type studentDetailsToServerType = {
  _id?: string;
  user_id?: string;
  title?: string;
  start?: Date;
  end?: Date;
  isAttended?: boolean;
  payment?: Number;
  id?: Number;
  absences?: Date | null;
  dateOfPaymentRequest?: Date | null;
  sumOfPaymentRequest?: Number;
  price: number;
  allowedAbsences: number;
  durationOfLesson: number;
  phone: string;
  email: string;
  city: string;
  street: string;
  houseNumber: number;
  floor: number;
  appartment: number;
};

export type editStudentsDetailsErrors = Partial<studentDetailsFromClientType>;

export type mapStudentToModel = {
  title: string;
  start: Date;
  end: Date;
  price: string;
  isAttended: boolean;
  payment: string;
  absences: Date | null;
  allowedAbsences: string;
  durationOfLesson: string;
  id: string;
  user_id?: string;
  _id?: string;
};

type address = {
  city: string;
  street: string;
  houseNumber: number;
  floor: number;
  appartment: number;
};
export type StudentCard = {
  _id: string;
  MyArray: Event[];
  email: string;
  phone: string;
  address: address;
  dateOfPaymentRequest: Date | null;
  sumOfPaymentRequest: Number;
  paymentSendAndNotReceived: Boolean;
  studentVerifiedEmail: string;
};
export type studentsFromDB = StudentCard[];

export type EditPayment = {
  dateOfPaymentRequest?: Date | null;
  sumOfPaymentRequest?: Number | null;
  paymentSendAndNotReceived?: Boolean;
  studentVerifiedEmail?: string;
  user_id?: string;
  _id?: string;
};

export type DataToChart = {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }[];
};

export type DeletedStudents = {
  _id: string;
  MyArray: Event[];
  email: string;
  phone: string;
  user_id?: string;
};

export type DeletedStudent = DeletedStudents[];

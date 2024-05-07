import { useCallback, useState, useMemo, useEffect } from "react";
import {
  SendEmail,
  createStudent,
  deleteStudent,
  editStudent,
  editStudentDay,
  editStudentDetails,
  editStudentPaymentRequst,
  getDeletedStudents,
  getEmailAddresses,
  getMyStudents,
  getStudent,
  getStudents,
  getVerifyEmail,
} from "../services/studentApi";
import useAxios from "../../hooks/useAxiosInterceptors";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnack } from "../../providers/SnackbarProvider";
import ROUTES from "../../routes/routesModel";
import {
  Event,
  StudentCard,
  studentFromClientType,
  studentsFromDB,
  studentDetailsFromClientType,
  EditPayment,
  DeletedStudent,
} from "../models/types/studentTypes";
import normalizeEditStudent from "../helpers/normalizations/normalizeEditStudent";
import normalizeEditedDetailsStudent from "../helpers/normalizations/normalizeEditedDetailsStudent";
import normalizePaymentReq from "../helpers/normalizations/normalizePaymentReq";

type StudentsType = studentsFromDB | null;
type StudentType = StudentCard | null;
type ErrorType = null | string;
type DeltedStudentType = DeletedStudent | null;

const useStudents = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [students, setStudents] = useState<StudentsType>(null);
  const [student, setStudent] = useState<StudentType>(null);
  const [DeletedStudent, setDeletedStudent] = useState<DeltedStudentType>(null);
  const [query, setQuery] = useState("");
  const [filteredStudents, setFilter] = useState<StudentsType>(null);
  const [searchParams] = useSearchParams();

  useAxios();

  const navigate = useNavigate();
  const snack = useSnack();

  const requestStatus = (
    loading: boolean,
    errorMessage: ErrorType,
    students: StudentsType,
    student: StudentType = null,
    DeletedStudent: DeltedStudentType = null
  ) => {
    setLoading(loading);
    setError(errorMessage);
    setStudents(students);
    setStudent(student);
    setDeletedStudent(DeletedStudent);
  };

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (students) {
      setFilter(
        students.filter((student) =>
          student.MyArray.find((student) => student.title.includes(query))
        )
      );
    }
  }, [students, query]);

  const handleGetStudents = useCallback(async () => {
    try {
      setLoading(true);
      const students = await getStudents();
      requestStatus(false, null, students);
    } catch (error) {
      if (typeof error === "string") return requestStatus(false, error, null);
    }
  }, []);

  const handleGetDeletedStudents = useCallback(async () => {
    try {
      setLoading(true);
      const student = await getDeletedStudents();
      requestStatus(false, null, null, null, student);
    } catch (error) {
      if (typeof error === "string") return requestStatus(false, error, null);
    }
  }, []);

  const handleGetMyStudents = useCallback(async () => {
    try {
      setLoading(true);
      const students = await getMyStudents();
      requestStatus(false, null, students);
    } catch (error) {
      if (typeof error === "string") return requestStatus(false, error, null);
    }
  }, []);

  const handleGetStudent = async (studentId: string) => {
    try {
      setLoading(true);
      const student = await getStudent(studentId);
      requestStatus(false, null, null, student);
      return student;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null);
    }
  };

  const handleCreateStudent = useCallback(
    async (studentFromClient: studentFromClientType[]) => {
      try {
        setLoading(true);
        const card = await createStudent(studentFromClient);
        requestStatus(false, null, null, card);
        snack("success", "A new student has been added");
      } catch (error) {
        if (typeof error === "string") return requestStatus(false, error, null);
      }
    },
    []
  );

  const handleDeleteStudent = useCallback(async (studentId: string) => {
    try {
      setLoading(true);
      await deleteStudent(studentId);
      snack("success", "The student card has been successfully deleted");
    } catch (error) {
      if (typeof error === "string") return requestStatus(false, error, null);
    }
  }, []);

  const handleUpdateStudent = useCallback(async (studentFromClient: Event) => {
    try {
      setLoading(true);
      const normalizedStudent = normalizeEditStudent(studentFromClient);
      const studentToServer = await editStudent(normalizedStudent);
      requestStatus(false, null, null, studentToServer);
      snack("success", "The student has been successfully updated");
    } catch (error) {
      if (typeof error === "string") return requestStatus(false, error, null);
    }
  }, []);

  const handleUpdateStudentDay = useCallback(
    async (studentFromClient: Event[]) => {
      try {
        setLoading(true);
        const studentToServer = await editStudentDay(studentFromClient);
        requestStatus(false, null, null, studentToServer);
        snack("success", "The lesson's day updated correctly");
      } catch (error) {
        if (typeof error === "string") return requestStatus(false, error, null);
      }
    },
    []
  );

  const handleEditedDetailsStudent = useCallback(
    async (studentFromClient: studentDetailsFromClientType) => {
      try {
        setLoading(true);
        const normalizedStudent =
          normalizeEditedDetailsStudent(studentFromClient);
        const studentToServer = await editStudentDetails(normalizedStudent);
        requestStatus(false, null, null, studentToServer);
        snack("success", "The student has been successfully updated");
        navigate(ROUTES.MANAGEMENT);
      } catch (error) {
        if (typeof error === "string") return requestStatus(false, error, null);
      }
    },
    []
  );

  const handleEditedPaymentRequestStudent = useCallback(
    async (studentFromClient: EditPayment) => {
      try {
        setLoading(true);
        const normalizedStudent = normalizePaymentReq(studentFromClient);
        const studentToServer = await editStudentPaymentRequst(
          normalizedStudent
        );
        requestStatus(false, null, null, studentToServer);
        snack("success", "The student has been successfully updated");
        navigate(ROUTES.MANAGEMENT);
      } catch (error) {
        if (typeof error === "string") return requestStatus(false, error, null);
      }
    },
    []
  );

  const handleGetVerifyEmail = async (studentsEmail: string) => {
    try {
      setLoading(true);
      const student = await getVerifyEmail(studentsEmail);
      requestStatus(false, null, null, student);
      snack("success", "verification email was send to the student");
      return student;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null);
    }
  };

  const handleSendEmail = async (studentDetailsToEmail: StudentCard) => {
    try {
      setLoading(true);
      const student = await SendEmail(studentDetailsToEmail);
      requestStatus(false, null, null, student);
      snack("success", "Payment requst email send to the student");
      return student;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null);
    }
  };

  const handleGetEmailList = async (studentsEmail: string) => {
    try {
      setLoading(true);
      const student = await getEmailAddresses(studentsEmail);
      requestStatus(false, null, null, student);
      return student;
    } catch (error) {
      if (typeof error === "string") requestStatus(false, error, null);
    }
  };

  const value = useMemo(() => {
    return {
      isLoading,
      students,
      student,
      DeletedStudent,
      error,
      filteredStudents,
    };
  }, [isLoading, students, student, DeletedStudent, error, filteredStudents]);

  return {
    value,
    handleGetStudents,
    handleGetMyStudents,
    handleGetStudent,
    handleCreateStudent,
    handleDeleteStudent,
    handleUpdateStudent,
    handleEditedDetailsStudent,
    handleEditedPaymentRequestStudent,
    handleGetVerifyEmail,
    handleSendEmail,
    handleGetEmailList,
    handleGetDeletedStudents,
    handleUpdateStudentDay,
  };
};

export default useStudents;

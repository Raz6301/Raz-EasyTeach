import React, { useEffect } from "react";
import { useUser } from "../../users/providers/UserProvider";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useStudents from "../hooks/useStudents";
import useForm from "../../forms/hooks/useForm";
import initialEditForm from "../helpers/initialForms/initialEditForm";
import studentEditSchema from "../models/joi/studentEditSchema";
import ROUTES from "../../routes/routesModel";
import mapStudentToModelFunc from "../helpers/normalizations/mapStudentToModel";
import { Container } from "@mui/material";
import StudentForm from "../components/StudentForm";

const EditStudentsDeatailsPage = () => {
  const { user } = useUser();
  const { studentId } = useParams();
  const { handleGetStudent, handleEditedDetailsStudent } = useStudents();
  const navigate = useNavigate();
  const { value, ...rest } = useForm(
    initialEditForm,
    studentEditSchema,
    handleEditedDetailsStudent
  );
  const { data, errors } = value;
  const { handleInputChange, handleReset, onSubmit, setData, validateForm } =
    rest;

  useEffect(() => {
    if (studentId)
      handleGetStudent(studentId).then((studentFromServer) => {
        if (user?._id !== studentFromServer!.user_id)
          return navigate(ROUTES.ROOT);
        const modeledStudent = mapStudentToModelFunc(studentFromServer!);
        setData(modeledStudent);
      });
  }, []);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StudentForm
        title="Edit Details"
        onSubmit={onSubmit}
        onReset={handleReset}
        errors={errors}
        onFormChange={validateForm}
        onInputChange={handleInputChange}
        data={data}
      />
    </Container>
  );
};

export default EditStudentsDeatailsPage;

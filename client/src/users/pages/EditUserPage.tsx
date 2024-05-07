import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useForm from "../../forms/hooks/useForm";
import ROUTES from "../../routes/routesModel";
import useHandleUser from "../hooks/useHandleUser";
import editUserSchema from "../models/joi-schema/editUserSchema";
import { useUser } from "../providers/UserProvider";
import UserEditForm from "../components/UserEditForm";
import initialEditForm from "../helpers/initialForms/initialEditForm";
import mapEditedUserToModel from "../helpers/normalization/mapEditUserToModel";

const EditUserPage = () => {
  const { user } = useUser();
  const { userId } = useParams();
  const { handleGetUserInfo, handleUpdateUser } = useHandleUser();

  const navigate = useNavigate();

  const { value, ...rest } = useForm(
    initialEditForm,
    editUserSchema,
    handleUpdateUser
  );

  const { data, errors } = value;
  const { handleInputChange, handleReset, onSubmit, setData, validateForm } =
    rest;

  useEffect(() => {
    if (userId)
      handleGetUserInfo(userId).then((userInfoFromService) => {
        if (user?._id !== userInfoFromService?._id)
          return navigate(ROUTES.ROOT);
        const modeledUser = mapEditedUserToModel(userInfoFromService!);
        setData(modeledUser);
      });
  }, []);

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <div>
      <Container
        sx={{
          paddingTop: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserEditForm
          title="edit user"
          onSubmit={onSubmit}
          onReset={handleReset}
          data={data}
          errors={errors}
          onFormChange={validateForm}
          onInputChange={handleInputChange}
          setData={setData}
        />
      </Container>
    </div>
  );
};

export default EditUserPage;

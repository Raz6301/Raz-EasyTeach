import Container from "@mui/material/Container";
import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useForm from "../../forms/hooks/useForm";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import INITIALLOGINFORM from "../helpers/initialForms/initialLogin";
import loginSchema from "../models/joi-schema/loginSchema";
import useHandleUser from "../hooks/useHandleUser";
import FormLink from "../../forms/components/FormLink";
import { useUser } from "../providers/UserProvider";

const LoginPage = () => {
  const {
    handleLogin,
    value: { user },
  } = useHandleUser();

  const { value, ...rest } = useForm(
    INITIALLOGINFORM,
    loginSchema,
    handleLogin
  );
  const { handleInputChange, handleReset, onSubmit, validateForm } = rest;
  const { data, errors } = value;

  if (user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        onSubmit={onSubmit}
        onReset={handleReset}
        onFormChange={validateForm}
        title="login"
        styles={{ maxWidth: "450px" }}
      >
        <Input
          data={data}
          label="email"
          name="email"
          onInputChange={handleInputChange}
          error={errors.email}
          required={true}
        />
        <Input
          data={data}
          label="password"
          name="password"
          onInputChange={handleInputChange}
          error={errors.password}
          required={true}
        />
        <FormLink text="Did not registered yet?" to={ROUTES.SIGNUP} />
      </Form>
    </Container>
  );
};

export default LoginPage;

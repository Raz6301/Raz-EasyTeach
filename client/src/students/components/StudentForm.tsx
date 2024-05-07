import React, { FC, ChangeEvent } from "react";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import Joi from "joi";
import {
  studentDetailsFromClientType,
  editStudentsDetailsErrors,
} from "../models/types/studentTypes";
type Props = {
  title?: string;
  onSubmit: () => void;
  onReset: () => void;
  onFormChange: () => Joi.ValidationError | null;
  errors: editStudentsDetailsErrors;
  data: studentDetailsFromClientType;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const studentForm: FC<Props> = ({
  onSubmit,
  onReset,
  onFormChange,
  title,
  errors,
  data,
  onInputChange,
}) => {
  return (
    <Form
      onSubmit={onSubmit}
      onReset={onReset}
      onFormChange={onFormChange}
      styles={{ maxWidth: "800px" }}
      title={title}
      spacing={1}
    >
      <Input
        name="phone"
        label="phone"
        type="phone"
        error={errors.phone}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="email"
        label="email"
        type="email"
        error={errors.email}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="city"
        label="city"
        error={errors.city}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="street"
        label="street"
        error={errors.street}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="houseNumber"
        label="houseNumber"
        type="number"
        error={errors.houseNumber}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="floor"
        label="floor"
        type="number"
        error={errors.floor}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="appartment"
        label="appartment"
        type="number"
        error={errors.appartment}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="durationOfLesson"
        label="durationOfLesson"
        type="number"
        error={errors.durationOfLesson}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="price"
        label="price"
        type="number"
        error={errors.price}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
      <Input
        name="allowedAbsences"
        label="allowedAbsences"
        type="number"
        error={errors.allowedAbsences}
        onInputChange={onInputChange}
        data={data}
        breakPoints={{ sm: 6 }}
      />
    </Form>
  );
};

export default React.memo(studentForm);

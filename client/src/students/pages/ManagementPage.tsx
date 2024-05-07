/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { Button, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import useStudents from "../hooks/useStudents";
import { useUser } from "../../users/providers/UserProvider";
import ROUTES from "../../routes/routesModel";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { StudentCard } from "../models/types/studentTypes";
import EditIcon from "@mui/icons-material/Edit";
import PaidIcon from "@mui/icons-material/Paid";
import DeleteIcon from "@mui/icons-material/Delete";

const Management = () => {
  const {
    handleGetMyStudents,
    handleDeleteStudent,
    handleEditedPaymentRequestStudent,
    handleGetVerifyEmail,
    handleSendEmail,
    handleGetEmailList,
    value,
  } = useStudents();
  const { filteredStudents } = value;
  const navigate = useNavigate();

  useEffect(() => {
    handleGetMyStudents();
  }, []);

  const { user } = useUser();

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [studentToActive, setStudentToActive] = useState<StudentCard | null>(
    null
  );
  const [messgae, setMessage] = useState("");
  const [action, setAction] = useState("");

  const handleOpenConfirmation = (
    student: StudentCard,
    selectedAction: string,
    messgae: string
  ) => {
    setStudentToActive(student);
    setConfirmationOpen(true);
    setAction(selectedAction);
    setMessage(messgae);
  };

  const handleCloseConfirmation = () => {
    setStudentToActive(null);
    setConfirmationOpen(false);
    setAction("");
    setMessage("");
  };

  const handleConfirm = async () => {
    if (studentToActive) {
      if (action === "delete") {
        await handleDeleteStudent(studentToActive._id);
        await handleGetMyStudents();
        handleCloseConfirmation();
      } else if (action === "payment") {
        const ArrayOfOccurredLessons = studentToActive.MyArray.filter(
          (item) =>
            new Date(item.start) <= new Date() &&
            new Date(item.start) >
              new Date(studentToActive.dateOfPaymentRequest!)
        ).filter((item) => item.payment !== 0);
        if (ArrayOfOccurredLessons.length === 0)
          return alert("No new charges by now");
        studentToActive.sumOfPaymentRequest =
          ArrayOfOccurredLessons.length * studentToActive.MyArray[0].price;

        studentToActive.dateOfPaymentRequest = new Date();
        studentToActive.paymentSendAndNotReceived = true;

        await handleEditedPaymentRequestStudent(studentToActive);
        handleCloseConfirmation();
        await handleGetMyStudents();
      } else if (action === "verify") {
        await handleGetVerifyEmail(studentToActive.email);
        studentToActive.studentVerifiedEmail = "pending";
        await handleEditedPaymentRequestStudent(studentToActive);
        handleCloseConfirmation();
        await handleGetMyStudents();
      } else if (action === "sendEmail") {
        if (studentToActive.studentVerifiedEmail === "yes") {
          await handleSendEmail(studentToActive);
          handleCloseConfirmation();
          return await handleGetMyStudents();
        } else if (studentToActive.studentVerifiedEmail === "pending") {
          const isEmailInlist = await handleGetEmailList(studentToActive.email);
          console.log(isEmailInlist);

          if (isEmailInlist) {
            studentToActive.studentVerifiedEmail = "yes";
            await handleEditedPaymentRequestStudent(studentToActive);
            await handleSendEmail(studentToActive);
            handleCloseConfirmation();
            await handleGetMyStudents();
          } else if (!isEmailInlist) {
            alert(`This student still didn't verify the verfication email`);
            handleCloseConfirmation();
            await handleGetMyStudents();
          }
        }
      }
    }
  };

  const handleApprovePayment = async (student: StudentCard) => {
    setStudentToActive(student);
    student.sumOfPaymentRequest = 0;
    student.paymentSendAndNotReceived = false;
    await handleEditedPaymentRequestStudent(student);
    await handleGetMyStudents();
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "brown",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  if (!user) return <Navigate replace to={ROUTES.ROOT} />;
  return (
    <>
      <Container>
        <Typography textAlign={"left"} padding={2} variant="h4">
          Students Management
        </Typography>
        {user && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Number</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Email Services</StyledTableCell>
                  <StyledTableCell>Payment Sum</StyledTableCell>
                  <StyledTableCell>Delete Student</StyledTableCell>
                  <StyledTableCell>Edit-Details </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents?.map((student, key) => (
                  <StyledTableRow key={key}>
                    <StyledTableCell component="th" scope="row">
                      {key + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {`${student.MyArray[0].title.replace(/✅|❌|❗/g, "")}`}
                    </StyledTableCell>
                    <StyledTableCell>{`${student.address.street} ${student.address.houseNumber}, ${student.address.appartment},Floor: ${student.address.floor} `}</StyledTableCell>
                    <StyledTableCell>
                      {student.email} <br />
                      {student.studentVerifiedEmail === "" && (
                        <Button
                          onClick={() =>
                            handleOpenConfirmation(
                              student,
                              "verify",
                              "By confirm you send one-time verifictaion email to your student and after his approvment, you will be able to send him your payment requst.\n First of all, Please notice to update his email address by click on Edit-Details button."
                            )
                          }
                        >
                          Verify Email by aws
                        </Button>
                      )}
                      {student.studentVerifiedEmail !== "" && (
                        <Button
                          disabled={student.sumOfPaymentRequest === 0}
                          onClick={() =>
                            handleOpenConfirmation(
                              student,
                              "sendEmail",
                              "By confirm, the system will check if your student approve your verification email, if does, you will send to your student the payment requst you calculated in the amount button. if he still didn't approve the initial mail verifiation you will get an alert message. "
                            )
                          }
                        >
                          Ask payment
                        </Button>
                      )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {student.paymentSendAndNotReceived === false && (
                        <Button
                          onClick={() =>
                            handleOpenConfirmation(
                              student,
                              "payment",
                              "By confirm you calculate the payment amount to your student."
                            )
                          }
                          color="warning"
                          variant="contained"
                        >
                          <PaidIcon />
                        </Button>
                      )}
                      {student.paymentSendAndNotReceived === true && (
                        <>
                          {`Did payment of ${
                            student.sumOfPaymentRequest
                          } that send in ${new Date(
                            student.dateOfPaymentRequest!
                          ).toLocaleDateString()} was accepted?`}

                          <Button
                            onClick={() => handleApprovePayment(student)}
                            color="success"
                            variant="contained"
                          >
                            Yes
                          </Button>
                        </>
                      )}
                    </StyledTableCell>

                    <StyledTableCell>
                      <Button
                        onClick={() =>
                          handleOpenConfirmation(
                            student,
                            "delete",
                            "By confirm you absloutly delete the student from your system."
                          )
                        }
                        color="error"
                        variant="contained"
                      >
                        <DeleteIcon />
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      <Button
                        onClick={() =>
                          navigate(`${ROUTES.EDIT_DETAILS}/${student._id}`)
                        }
                        color="primary"
                        variant="outlined"
                      >
                        <EditIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <ConfirmationDialog
                open={confirmationOpen}
                onClose={handleCloseConfirmation}
                onConfirm={handleConfirm}
                student={studentToActive}
                message={messgae}
              />
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default Management;

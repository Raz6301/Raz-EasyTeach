import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <Container maxWidth="lg">
      <Typography
        fontSize={{ xs: "5vh", sm: "8vh", md: "8vh" }}
        textAlign={"center"}
        fontFamily={"fantasy"}
        padding={2}
        color={"darkgoldenrod"}
      >
        Welcome to EasyTeach
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" lineHeight="1.5">
            {" "}
            High quality teaching is a complex mession, but manage all the
            issues around it, can be easy and fast. For that purpose we created
            EasyTeach, to manage the schedule, the payments, and some important
            statistics.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          alignSelf="center"
          fontSize={18}
          lineHeight="1.5"
        >
          You can register to the app as a regular member or as a business
          member. The regular one have access to the calendar section but not to
          the management and the statistics. In the calendar you add your
          students and mark their presence. To add new Student just click on the
          desirable slot date{" "}
          <span style={{ backgroundColor: "yellow" }}>number</span>, and you
          will be transfer to the day column.
        </Grid>
        <Grid item md={7} xs={12}>
          <img src="/assets/images/first.png" alt="card" width="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          alignSelf="center"
          fontSize={18}
          lineHeight="1.5"
        >
          After you passed to the day column, you should choice the desirable
          hour from the list. After your choice, 4 inputs with basic details
          will appear. You have to fill them all to release the button and send
          the new students details. Please note that the day list divided to
          quarters of hours and your choice appear in the top of the page.
        </Grid>
        <Grid item md={7} xs={12}>
          <img src="/assets/images/second.png" alt="card" width="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          alignSelf="center"
          fontSize={18}
          lineHeight="1.5"
        >
          Now the lessons appear in the calendar until the end of the year. To
          mark if lesson has occurred, click on the lesson and a dialog will be
          open. If the lesson existed, choose the occurred button. If the
          student cancelled the lesson, choose cancel and it will be write in
          the system that one permitted absence was used. If you cancelled the
          lesson, choose reset and no absences or charges will be write to the
          student.
        </Grid>
        <Grid item md={7} xs={12}>
          <img src="/assets/images/third.png" alt="card" width="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          alignSelf="center"
          fontSize={18}
          lineHeight="1.5"
        >
          In case student want to change once time is date of lesson it is
          possible to write it in the calendar. In the Left top point there is a
          button called: 'One time change'. click on it and 2 inputs will
          appear, one of date input to choice the new date, and the other to
          determine the hour. After you choose the desirable data, click on the
          lesson you want to change and it will update and move automatically.
        </Grid>
        <Grid item md={7} xs={12}>
          <img src="/assets/images/nine.png" alt="card" width="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          alignSelf="center"
          fontSize={18}
          lineHeight="1.5"
        >
          Occurred lessons are painted in green, cancelled lessons in red, and
          when student pass his amount of permitted absences, the passed lessons
          paint in yellow and payment is required on them automatically.
        </Grid>
        <Grid item md={7} xs={12}>
          <img src="/assets/images/four.png" alt="card" width="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          alignSelf="center"
          fontSize={18}
          lineHeight="1.5"
        >
          In case you have more than 3 students on some day you will not be able
          to see all of them on the slot, but only the first students. You can
          update the lessons of the rest by clicking on the agenda button and
          move to the desirable day and update the lessons you want. Please note
          that you can't update lessons from the day or week column because of
          settings system.
        </Grid>
        <Grid item md={7} xs={12}>
          <img src="/assets/images/six.png" alt="card" width="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          alignSelf="center"
          fontSize={18}
          lineHeight="1.5"
        >
          Business Members can manage their students in CRM system. They get a
          table of their students and can add or edit another details to each
          student or to delete him from the list. In addition, there is a
          usefull tool of sending automatic emails. Each time a teacher want to
          charge a fee he can click on the payment button to calculate the sum
          and then he can send an email with the charge to the student after he
          update and verify the email once time with aws services. Please note
          your private credentials include the premission to use ses service of
          aws.
        </Grid>
        <Grid item md={7} xs={12}>
          <img src="/assets/images/seven.png" alt="card" width="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          alignSelf="center"
          fontSize={18}
          lineHeight="1.5"
        >
          There is 2 statistics that business members can get. The first one is
          a pie chart with all the current students divided by the sum of
          payment they pay, clicking on ecah slice reveal the price beneath the
          chart. The second one is the Bar chart that anlayze the ex-students
          and show after how much lessons each student quited from the learning.
        </Grid>
        <Grid item md={7} xs={12}>
          <img src="/assets/images/eight.png" alt="card" width="100%" />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          alignSelf="center"
          fontSize={18}
          lineHeight="1.5"
        >
          Admins Members can manage their users in the CRM system. If you are an
          admin (in that site you can insert the email: admin@gmail.com and the
          password: Aa1234! to get that page and see how it works) the link
          'CRM' will appear in the head navbar. The page consist table with the
          details of all the users in the website. You can delete users by
          clicking the delete button or change their status by clicking the
          business status.
        </Grid>
        <Grid item md={7} xs={12}>
          <img src="/assets/images/crm.png" alt="card" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;

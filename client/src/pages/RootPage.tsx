import React from "react";
import { Container, Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/routesModel";

const RootPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Grid container>
          <Grid
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            flexDirection={"column"}
            marginTop={{ xs: "30vh", sm: "14vh", md: "24vh", lg: "25vh" }}
            item
            xs={12}
            sx={{
              backgroundImage: `url(/assets/images/easyno.png)`,
              backgroundSize: {
                xs: "130vw",
                sm: "100vw",
                md: "92vw",
                lg: "85vw",
              },
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: { xs: "14vh", sm: "22vh", md: "25vh", lg: "35vh" },
            }}
          >
            <Box
              textAlign={"center"}
              marginTop={{ xs: 34, sm: 22, md: 27, lg: 35 }}
            >
              <Typography
                display="flex"
                alignItems="center"
                justifyContent={"center"}
                fontSize={{ xs: "25px", sm: "14px", md: "20px", lg: "23px" }}
              >
                Friendly advanced system to manage online your private lessons
              </Typography>{" "}
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent={"center"}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <Button
                sx={{
                  width: { xs: "93vw", sm: "140px", md: "160px", lg: "200px" },
                  fontSize: { xs: "16px", sm: "12px", md: "14px", lg: "16px" },
                  backgroundColor: "beige",
                  margin: "10px",
                  color: "#B47C52",
                }}
                onClick={() => navigate(ROUTES.SIGNUP)}
                variant="contained"
              >
                Sign up
              </Button>
              <Button
                sx={{
                  color: "beige",
                  backgroundColor: "#B47C52",
                  width: { xs: "93vw", sm: "80px", md: "80px", lg: "90px" },
                  fontSize: { xs: "16px", sm: "12px", md: "14px", lg: "16px" },
                }}
                onClick={() => navigate(ROUTES.LOGIN)}
                variant="contained"
              >
                Log in
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <Typography
              fontSize={{ xs: 32, sm: 30, md: 35, lg: 40 }}
              marginTop={{ xs: 31, sm: 14, md: 18, lg: 18 }}
              marginBottom={{ xs: "12px", sm: "14px", md: "20px", lg: 3 }}
            >
              Advanteges{" "}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            flexDirection={"column"}
          >
            {" "}
            <Typography variant="h5" padding={1}>
              Organized use{" "}
            </Typography>
            <img src="/assets/images/calendar2.png" alt="" width={"40%"} />
            <Typography variant="body1" marginTop={2} maxWidth={"250px"}>
              The whole management done by pick the lessons events on the
              calendar divided to month, week and day options.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            flexDirection={"column"}
          >
            {" "}
            <Typography variant="h5" padding={1}>
              All the payments in one place{" "}
            </Typography>
            <img src="/assets/images/payments5.png" alt="" width={"40%"} />
            <Typography variant="body1" marginTop={2} maxWidth={"250px"}>
              Every lesson's payment is recording and the teacher can demand it
              by automatic sending email service any time he wants.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            flexDirection={"column"}
          >
            {" "}
            <Typography variant="h5" padding={1}>
              Personal tracking{" "}
            </Typography>
            <img src="/assets/images/chart.png" alt="" width={"40%"} />
            <Typography variant="body1" marginTop={2} maxWidth={"250px"}>
              Dynamic Monitoring of important paramaters from your work to
              improve your revenues and teaching skills.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Grid
        container
        sx={{ backgroundColor: "beige" }}
        display="flex"
        alignItems="center"
        justifyContent={"center"}
        marginTop={10}
      >
        <Grid item xs={12} marginTop={3}>
          <Typography
            variant="h4"
            padding={2}
            textAlign={{ xs: "left", sm: "center" }}
          >
            Join EasyTeach today and make your work efficient and comfortable
          </Typography>
        </Grid>
        <Button
          sx={{
            color: "beige",
            backgroundColor: "#B47C52",
            width: { xs: "160px", sm: "160px", md: "180px", lg: "200px" },
            fontSize: { xs: "16px", sm: "12px", md: "14px", lg: "16px" },
            marginBottom: 6,
          }}
          onClick={() => navigate(ROUTES.ABOUT)}
          variant="contained"
        >
          Learn More
        </Button>
      </Grid>
    </>
  );
};

export default RootPage;

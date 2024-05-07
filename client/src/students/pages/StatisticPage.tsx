import React, { useEffect } from "react";
import { VictoryLabel, VictoryBar, VictoryChart, VictoryAxis } from "victory";
import useStudents from "../hooks/useStudents";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import lodash from "lodash";
import { Container, Typography } from "@mui/material";
import PieChart from "../components/PieChart";

const StatisticPage = () => {
  const { handleGetDeletedStudents, value } = useStudents();
  const { isLoading, error, DeletedStudent } = value;

  useEffect(() => {
    handleGetDeletedStudents();
  }, []);

  let allEvents: any[] = [];
  let combinedEvents: any[] = [];

  if (DeletedStudent && DeletedStudent.length > 0) {
    allEvents = DeletedStudent.flatMap((student) =>
      student.MyArray.map((event) => ({
        occured: event.payment !== 0,
        name:
          event.title.length > 7 ? event.title.slice(0, 5) + ".." : event.title,
        price: event.price,
      })).filter((event) => event.occured === true)
    );

    combinedEvents = lodash
      .chain(allEvents)
      .groupBy("name")
      .map((groupedEvents, name) => {
        const sum = groupedEvents.length;
        return {
          occured: true,
          x: `${name.replace(/✅|❗/g, "")}`,
          y: sum,
          price: groupedEvents[0].price,
        };
      })
      .value();
  }

  const data: any[] = [
    { x: "John", y: 2 },
    { x: "Ben", y: 4 },
    { x: "Dave", y: 3 },
  ];

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  return (
    <>
      <Container>
        <Typography textAlign={"left"} padding={2} variant="h3">
          Student's Statistics
        </Typography>
        <Typography
          fontFamily={"roboto"}
          fontSize={{ xs: "3vh", sm: "3vh", md: "3vh" }}
          marginBottom={2}
          lineHeight={1.7}
        >
          In the charts above you can follow your work and get important
          information. The Bar chart present your ex-students and show how much
          lessons each student took from you until he decided to stop the
          learning. <br /> <br /> The Pie Chart show your current students,
          divided by their sum of payment. By clicking on each student slice you
          will be able to see the sum beneath the chart. In case you have no
          students yet, demos chart will appear with random names and numbers.
        </Typography>
        <div className="victory-pie-container">
          <VictoryChart domainPadding={{ x: 20 }} width={400} height={400}>
            <VictoryAxis tickFormat={(tick) => `${tick}`} />
            <VictoryAxis dependentAxis tickFormat={(tick) => `${tick}`} />
            <VictoryBar
              data={combinedEvents.length > 0 ? combinedEvents : data}
              x="x"
              y="y"
              style={{
                data: { fill: "blue" },
                labels: {
                  fontSize: 16,
                  fill: "white",
                  fontWeight: 7,
                },
              }}
              padding={1}
            />
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="start"
              x={200}
              y={380}
              style={{ fontSize: 19 }}
              text={"Sum of lessons"}
            />
          </VictoryChart>
        </div>
        <PieChart />
      </Container>
    </>
  );
};

export default StatisticPage;

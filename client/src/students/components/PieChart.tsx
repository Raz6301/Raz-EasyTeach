import React, { useEffect, useState } from "react";
import { VictoryLabel, VictoryPie } from "victory";
import useStudents from "../hooks/useStudents";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import lodash from "lodash";

const ChartBar = () => {
  const { handleGetMyStudents, value } = useStudents();
  const { isLoading, error, students } = value;
  const [selectedLabelIndex, setSelectedLabelIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    handleGetMyStudents();
  }, []);

  let allEvents1: any[] = [];
  let combinedEvents1: any[] = [];

  if (students && students.length > 0) {
    allEvents1 = students.flatMap((student) => ({
      name:
        student.MyArray[0].title.length > 7
          ? student.MyArray[0].title.slice(0, 5) + ".."
          : student.MyArray[0].title,
      price: student.MyArray[0].price,
    }));

    combinedEvents1 = lodash
      .chain(allEvents1)
      .groupBy("name")
      .map((groupedEvents, name) => {
        const sum = groupedEvents.length;
        return {
          occured: true,
          x: `${name.replace(/✅|❗|❌/g, "")}`,
          sum: sum,
          y: groupedEvents[0].price,
        };
      })
      .value();
  }

  const data: any[] = [
    { x: "Example A", y: 4000 },
    { x: "Example B", y: 5000 },
    { x: "Example C", y: 6000 },
  ];

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error} />;
  return (
    <>
      <div className="victory-pie-container">
        <svg viewBox="0 0 480 480">
          <VictoryPie
            standalone={false}
            width={350}
            height={350}
            data={combinedEvents1.length > 0 ? combinedEvents1 : data}
            labelRadius={80}
            style={{
              labels: {
                fontSize: 25,
                fill: "white",
                fontWeight: 7,
              },
            }}
            colorScale={"qualitative"}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: (_, props) => {
                    setSelectedLabelIndex(props.index);
                    return [];
                  },
                },
              },
            ]}
            padding={1}
          />

          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={200}
            y={460}
            style={{ fontSize: 22 }}
            text={
              selectedLabelIndex !== null
                ? `Price for lesson:${combinedEvents1[selectedLabelIndex]?.y}` ||
                  `Price for lesson:${data[selectedLabelIndex]?.y}`
                : "Price for lesson"
            }
          />
        </svg>
      </div>
    </>
  );
};
export default ChartBar;

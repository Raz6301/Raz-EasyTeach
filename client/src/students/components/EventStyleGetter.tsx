import { Event } from "../models/types/studentTypes";

const eventStyleGetter = (event: Event) => {
  if (event.title.charAt(event.title.length - 1) === "✅") {
    return {
      style: {
        backgroundColor: "green",
      },
    };
  } else if (event.title.charAt(event.title.length - 1) === "❌") {
    return {
      style: {
        backgroundColor: "red",
      },
    };
  } else if (event.title.charAt(event.title.length - 1) === "❗") {
    return {
      style: {
        backgroundColor: "yellow",
      },
    };
  }
  return {
    style: {
      backgroundColor: "#3174ad",
    },
  };
};

export default eventStyleGetter;

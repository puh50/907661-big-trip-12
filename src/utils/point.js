import moment from "moment";

export const sortByTime = (pointA, pointB) => {
  return (pointA.to - pointA.from - (pointB.to - pointB.from));
};

export const sortByPrice = (pointA, pointB) => {
  return pointA.price - pointB.price;
};

export const formatPointDuration = (dateA, dateB) => {
  if (dateA > dateB) {
    return moment.duration(moment(dateA).diff(moment(dateB)));
  }

  return moment.duration(moment(dateB).diff(moment(dateA)));
};

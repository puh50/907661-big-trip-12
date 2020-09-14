import moment from "moment";

export const sortByTime = (pointA, pointB) => {
  return (pointA.to.getTime() - pointA.from.getTime()) - (pointB.to.getTime() - pointB.from.getTime());
};

export const sortByPrice = (pointA, pointB) => {
  return pointA.price - pointB.price;
};

export const formatTaskDueDate = (dateA, dateB) => {
  // if (!(date instanceof Date)) {
  //   return ``;
  // }

  return moment.duration(moment(dateA).diff(moment(dateB)));
};

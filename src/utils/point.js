export const sortByTime = (pointA, pointB) => {
  return pointA.from.getTime() - pointB.to.getTime();
};

export const sortByPrice = (pointA, pointB) => {
  return pointA.price - pointB.price;
};

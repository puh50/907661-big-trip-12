import Abstract from "./abstract.js";

const tripDaysListTemplate = (pointCount) => {
  return pointCount === 0 ? ` ` : `<ul class="trip-days"></ul>`;
};

export default class DaysList extends Abstract {
  constructor(pointCount) {
    super();
    this._pointCount = pointCount;
  }

  getTemplate() {
    return tripDaysListTemplate(this._pointCount);
  }

}

import Abstract from "./abstract.js";

const noPointsTemplate = (pointCount) => {
  return pointCount === 0
    ? `<p class="trip-events__msg">Click New Event to create your first point</p>`
    : ` `;
};

export default class NoPoints extends Abstract {
  constructor(pointCount) {
    super();
    this._pointCount = pointCount;
  }

  getTemplate() {
    return noPointsTemplate(this._pointCount);
  }

}

import {createElement} from "../util.js";

const noPointsTemplate = (pointCount) => {
  return pointCount === 0
    ? `<p class="trip-events__msg">Click New Event to create your first point</p>`
    : ` `;
};

export default class NoPoints {
  constructor(pointCount) {
    this._pointCount = pointCount;
    this._element = null;
  }

  getTemplate() {
    return noPointsTemplate(this._pointCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

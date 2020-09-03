import {createElement} from "../util.js";

const tripDaysListTemplate = (pointCount) => {
  return pointCount === 0 ? ` ` : `<ul class="trip-days"></ul>`;
};

export default class DaysList {
  constructor(pointCount) {
    this._pointCount = pointCount;
    this._element = null;
  }

  getTemplate() {
    return tripDaysListTemplate(this._pointCount);
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

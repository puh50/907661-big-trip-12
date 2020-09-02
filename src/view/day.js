import {createElement} from "../util.js";

const tripDayTemplate = (day, dayDate, points) => {
  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${day}</span>
      <time class="day__date" datetime="2019-03-18">${dayDate}</time>
    </div>
    <ul class="trip-days">${points}</ul>
    </li>`
  );
};

export default class TripDay {
  constructor(day, dayDate, points) {
    this._day = day;
    this._dayDate = dayDate;
    this._points = points;

    this._element = null;
  }

  getTemplate() {
    return tripDayTemplate(this._day, this._dayDate, this._points);
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

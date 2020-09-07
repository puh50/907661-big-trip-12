import Abstract from "./abstract.js";

const tripDayTemplate = (day, dayDate) => {
  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${day}</span>
      <time class="day__date" datetime="2019-03-18">${dayDate}</time>
    </div>
    <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class TripDay extends Abstract {
  constructor(day = ``, dayDate = ``) {
    super();
    this._day = day;
    this._dayDate = dayDate;
    this._eventList = null;
  }

  getTemplate() {
    return tripDayTemplate(this._day, this._dayDate);
  }

  getEventList() {
    if (!this._eventList) {
      this._eventList = this.getElement().querySelector(`.trip-events__list`);
    }
    return this._eventList;
  }

}

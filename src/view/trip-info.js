import {createElement} from "../util.js";

const tripInfoTemplate = (pointCount) => {
  return pointCount === 0
    ? `<section class="trip-main__trip-info  trip-info">
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
        </p>
      </section>`
    : `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>

          <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
        </div>

        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
        </p>
      </section>`;
};

export default class TripInfo {
  constructor(pointCount) {
    this._pointCount = pointCount;
    this._element = null;
  }

  getTemplate() {
    return tripInfoTemplate(this._pointCount);
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

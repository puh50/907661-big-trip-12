import {upFirstLetter} from "../utils/common.js";
import {formatPointDuration} from "../utils/point.js";
import Abstract from "./abstract.js";
import moment from "moment";

export const tripPointTemplate = (point) => {
  const {type, city, price, offers, from, to} = point;

  let typeText;
  if (type !== `check-in` && type !== `sightseeing` && type !== `restaurant`) {
    typeText = `${type} to`;
  } else {
    typeText = `${type} in`;
  }
  typeText = upFirstLetter(typeText);

  const selectedOffers = offers.filter((offer) => offer.isSelected).slice(0, 3);

  const offerList = selectedOffers.map((offer) => {
    const offerTemplate = `<li class="event__offer">
                            <span class="event__offer-title">${offer.name}</span>
                            &plus;
                            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
                          </li>`;
    const isChecked = offer.isSelected ? offerTemplate : ``;

    return isChecked;
  }).join(` `);

  const getFormatedTime = () => {

    const dateDiff = formatPointDuration(to, from);

    if (dateDiff.days() === 0) {
      return `${dateDiff.hours()}H ${dateDiff.minutes()}M`;
    } else {
      return `${dateDiff.days()}D ${dateDiff.hours()}H ${dateDiff.minutes()}M`;
    }
  };

  const fromTime = moment(from, moment.defaultFormat);
  const fromFormated = fromTime.format(`HH:mm`);

  const toTime = moment(to, moment.defaultFormat);
  const toFormated = toTime.format(`HH:mm`);

  return `<li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${typeText} ${city}</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-18T10:30">${fromFormated}</time>
                  &mdash;
                  <time class="event__end-time" datetime="2019-03-18T11:00">${toFormated}</time>
                </p>
                <p class="event__duration">${getFormatedTime()}</p>
              </div>

              <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${price}</span>
              </p>

              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${offerList}
              </ul>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>`;
};

export default class Point extends Abstract {
  constructor(point) {
    super();
    this._point = point;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return tripPointTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

}

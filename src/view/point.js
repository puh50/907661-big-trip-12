import {upFirstLetter} from "../utils/common.js";
import Abstract from "./abstract.js";

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

  const options = {
    // era: `long`,
    // year: `2-digit`,
    // month: `2-digit`,
    // day: `2-digit`,
    // weekday: `long`,
    // timezone: `UTC`,
    hour: `2-digit`,
    hour12: false,
    minute: `numeric`,
    // second: `numeric`,
  };

  const fromMilliseconds = from.getTime();
  const toMilliseconds = to.getTime();
  const differenceMilliseconds = toMilliseconds - fromMilliseconds;

  function msToTime(duration) {
    let days = Math.floor(duration / (24 * 60 * 60 * 1000));
    let daysms = duration % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = duration % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    // let minutesms = duration % (60 * 1000);
    // let sec = Math.floor((minutesms) / (1000));

    minutes = minutes < 0 ? minutes * (-1) : minutes;
    hours = hours < 0 ? hours * (-1) : hours;
    days = days < 0 ? days * (-1) : days;

    if (days === 0) {
      return `${hours}H ${minutes}M`;
    } else {
      return `${days}D ${hours}H ${minutes}M`;
    }
  }

  return `<li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${typeText} ${city}</h3>

              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-18T10:30">${from.toLocaleString(`en-US`, options)}</time>
                  &mdash;
                  <time class="event__end-time" datetime="2019-03-18T11:00">${to.toLocaleString(`en-US`, options)}</time>
                </p>
                <p class="event__duration">${msToTime(differenceMilliseconds)}</p>
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
  }

  getTemplate() {
    return tripPointTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

}

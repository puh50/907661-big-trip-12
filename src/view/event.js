import {cities} from "../mock/point-mock.js";
import {upFirstLetter} from "../util.js";

const date = new Date(2020, 7, 26, 0);

const dateOptions = {
  // era: `long`,
  year: `2-digit`,
  month: `2-digit`,
  day: `2-digit`,
  // weekday: `long`,
  // timezone: `UTC`,
  hour24: `numeric`,
  minute: `numeric`,
  second: `numeric`
};

const defaultPoint = {
  type: `flight`,
  city: ``,
  price: ``,
  offers: [
    {
      type: `luggage`,
      name: `Add luggage`,
      price: `20`,
      isSelected: false,
    },
    {
      type: `meal`,
      name: `Add meal`,
      price: `50`,
      isSelected: false,
    },
    {
      type: `seats`,
      name: `Choose seats`,
      price: `5`,
      isSelected: false,
    },
    {
      type: `comfort`,
      name: `Switch to comfort class`,
      price: `100`,
      isSelected: false,
    },
    {
      type: `train`,
      name: `Travel by train`,
      price: `10`,
      isSelected: false,
    },
  ],
  from: date.toLocaleString(`en-US`, dateOptions),
  to: date.toLocaleString(`en-US`, dateOptions),
  photos: [],
};

export let typeText;

export const createEventTemplate = (point = defaultPoint) => {
  const {type, city, price, offers, from, to, photos, description} = point;

  if (type !== `check-in` && type !== `sightseeing` && type !== `restaurant`) {
    typeText = `${type} to`;
  } else {
    typeText = `${type} in`;
  }
  typeText = upFirstLetter(typeText);

  const additionalButtonTemplate = `<label class="event__favorite-btn" for="event-favorite-1">
  <span class="visually-hidden">Add to favorite</span>
  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
  </svg>
  </label> <button class="event__rollup-btn" type="button">
  <span class="visually-hidden">Open event</span>
  </button>`;

  const additionalButtons = point === defaultPoint ? `` : additionalButtonTemplate;

  const optionsList = cities.map((citySelected) => {
    return `<option value="${citySelected}"></option>`;
  }).join(` `);

  const offerList = offers.map((offer) => {
    const isChecked = offer.isSelected ? `checked` : ``;
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.type}-1" type="checkbox" name="event-offer-${offer.type}" ${isChecked}>
              <label class="event__offer-label" for="event-offer-${offer.type}-1">
                <span class="event__offer-title">${offer.name}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`;
  }).join(` `);

  const dateRange = () => {
    const options = {
      // era: `long`,
      year: `2-digit`,
      month: `2-digit`,
      day: `2-digit`,
      // weekday: `long`,
      // timezone: `UTC`,
      hour24: `numeric`,
      minute: `numeric`,
      second: `numeric`,
    };
    return `<div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">
                From
              </label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${from.toLocaleString(`en-US`, options)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">
                To
              </label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${to.toLocaleString(`en-US`, options)}">
            </div>`;
  };

  const destinationImages = photos.map((photo) => {
    return `<img class="event__photo" src="${photo}" alt="Event photo"></img>`;
  }).join(` `);

  const destinationTemplate = `<h3 class="event__section-title  event__section-title--destination">Destination</h3>
                                <p class="event__destination-description">${description}</p>

                                <div class="event__photos-container">
                                  <div class="event__photos-tape">
                                    ${destinationImages}
                                  </div>
                                </div>`;

  const destinationBlock = point === defaultPoint ? `` : destinationTemplate;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
              <label class=" event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${typeText}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${optionsList}
        </datalist>
      </div>

      ${dateRange()}

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
      ${additionalButtons}
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offerList}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        ${destinationBlock}
      </section>
    </section>
  </form>`
  );
};

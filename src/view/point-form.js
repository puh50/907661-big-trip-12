import {cities, pointTypesTransport, pointTypesIn} from "../mock/point-mock.js";
import {upFirstLetter} from "../utils/common.js";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const date = new Date(2020, 7, 26, 0);

const dateOptions = {
  // era: `long`,
  year: `2-digit`,
  month: `2-digit`,
  day: `2-digit`,
  // weekday: `long`,
  // timezone: `UTC`,
  hour: `2-digit`,
  minute: `2-digit`,
  second: `2-digit`,
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

const createPointFormTemplate = (point = defaultPoint) => {
  const {type, city, price, offers, from, to, photos, description, isFavorite} = point;

  let typeText;
  if (type !== `check-in` && type !== `sightseeing` && type !== `restaurant`) {
    typeText = `${type} to`;
  } else {
    typeText = `${type} in`;
  }
  typeText = upFirstLetter(typeText);

  const typeItemsTransport = pointTypesTransport.map((pointType) => {
    const typeFirstUppercase = upFirstLetter(pointType);
    return type === pointType
      ? `<div class="event__type-item">
          <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" checked>
          <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${typeFirstUppercase}</label>
        </div>`
      : `<div class="event__type-item">
          <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}">
          <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${typeFirstUppercase}</label>
        </div>`;
  }).join(` `);

  const typeItemsIn = pointTypesIn.map((pointType) => {
    const typeFirstUppercase = upFirstLetter(pointType);
    return type === pointType
      ? `<div class="event__type-item">
          <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}" checked>
          <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${typeFirstUppercase}</label>
        </div>`
      : `<div class="event__type-item">
          <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}">
          <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${typeFirstUppercase}</label>
        </div>`;
  }).join(` `);

  const favoriteButton = isFavorite
    ? `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>`
    : `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite">`;

  const additionalButtonTemplate = `${favoriteButton}
  <label class="event__favorite-btn" for="event-favorite-1">
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
      hour: `2-digit`,
      hour12: false,
      minute: `2-digit`,
      // second: `2-digit`,
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

  return `<div><form class="trip-events__item  event  event--edit" action="#" method="post">
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
                    ${typeItemsTransport}
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${typeItemsIn}
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
          </form></div>`;
};

export default class PointForm extends SmartView {
  constructor(point) {
    super();
    this._data = PointForm.parsePointToData(point);
    this._fromDatepicker = null;
    this._toDatepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._favoriteSelectHandler = this._favoriteSelectHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._formCancelHandler = this._formCancelHandler.bind(this);
    this._eventTypeSelectHandler = this._eventTypeSelectHandler.bind(this);
    this._eventCitySelectHandler = this._eventCitySelectHandler.bind(this);
    this._fromDateChangeHandler = this._fromDateChangeHandler.bind(this);
    this._toDateChangeHandler = this._toDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setFromDatepicker();
    this._setToDatepicker();
  }

  reset(point) {
    this.updateData(PointForm.parsePointToData(point), true);
  }

  getTemplate() {
    return createPointFormTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setFromDatepicker();
    this._setToDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointForm.parseDataToPoint(this._data));
  }

  _favoriteSelectHandler() {
    this.updateData({
      isFavorite: !this._data.isFavorite,
    }, true);
  }

  _formCancelHandler(evt) {
    evt.preventDefault();
    this._callback.formCancel();
  }

  _eventTypeSelectHandler(evt) {
    this.updateData({
      type: evt.target.value,
    }, false);
  }

  _eventCitySelectHandler(evt) {
    evt.preventDefault();
    this.updateData({
      city: evt.target.value,
    }, true);
  }

  _priceInputHandler(evt) {
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _fromDateChangeHandler(evt) {
    this.updateData({
      from: evt.target.value,
    }, true);
  }

  _toDateChangeHandler(evt) {
    this.updateData({
      to: evt.target.value,
    }, true);
  }

  _setFromDatepicker() {
    if (this._fromDatepicker) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._fromDatepicker.destroy();
      this._fromDatepicker = null;
    }

    if (this._data.from) {
      // flatpickr есть смысл инициализировать только в случае,
      // если поле выбора даты доступно для заполнения
      this._fromDatepicker = flatpickr(
          this.getElement().querySelector(`#event-start-time-1`),
          {
            enableTime: true,
            dateFormat: `d/m/y H:i`,
            defaultDate: this._data.from,
            // time_24hr: true,
          }
      );
      this.getElement().querySelector(`#event-start-time-1`).addEventListener(`change`, this._fromDateChangeHandler);
    }
  }

  _setToDatepicker() {
    if (this._toDatepicker) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._toDatepicker.destroy();
      this._toDatepicker = null;
    }

    if (this._data.to) {
      // flatpickr есть смысл инициализировать только в случае,
      // если поле выбора даты доступно для заполнения
      this._toDatepicker = flatpickr(
          this.getElement().querySelector(`#event-end-time-1`),
          {
            enableTime: true,
            dateFormat: `d/m/y H:i`,
            defaultDate: this._data.to,
            // time_24hr: true,
          }
      );
      this.getElement().querySelector(`#event-end-time-1`).addEventListener(`change`, this._toDateChangeHandler);
    }
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setformCancelHandler(callback) {
    this._callback.formCancel = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formCancelHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    if (this.getElement().querySelector(`.event__favorite-icon`)) {
      this.getElement().querySelector(`.event__favorite-icon`).addEventListener(`click`, this._callback.favoriteClick);
    }
  }


  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__favorite-icon`)
      .addEventListener(`click`, this._favoriteSelectHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);
    this.getElement()
      .querySelectorAll(`.event__type-input`).forEach((element) => {
        element.addEventListener(`change`, this._eventTypeSelectHandler);
      });
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._eventCitySelectHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
        {},
        point
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    if (!data.isFavorite) {
      data.isFavorite = false;
    }

    return data;
  }

}

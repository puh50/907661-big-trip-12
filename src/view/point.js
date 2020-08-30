import {typeText} from "./event.js";

export const tripPointTemplate = (point) => {
  const {type, city, price, offers, from, to} = point;

  const offerList = offers.map((offer) => {
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
    hour24: `numeric`,
    minute: `numeric`,
    second: `numeric`,
  };

  return (
    `<li class="trip-events__item">
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
        <p class="event__duration">30M</p>
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
  </li>`
  );
};

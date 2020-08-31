import {typeText} from "./point-form.js";

export const tripPointTemplate = (point) => {
  const {type, city, price, offers, from, to} = point;

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
    // let milliseconds = parseInt((duration % 1000) / 100, 10);
    // let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    minutes = minutes < 0 ? minutes * (-1) : minutes;
    hours = hours < 0 ? hours * (-1) : hours;

    return `${hours}H ${minutes}M`;
  }

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
  </li>`
  );
};

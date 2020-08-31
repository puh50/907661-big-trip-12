import {tripInfoTemplate} from "./view/trip-info.js";
import {pageMenuTemplate} from "./view/page-menu.js";
import {tripFiltersTemplate} from "./view/filter.js";
import {tripSortTemplate} from "./view/sorting.js";
import {createPointFormTemplate} from "./view/point-form.js";
import {tripDaysListTemplate} from "./view/days-list.js";
import {tripDayTemplate} from "./view/day.js";
import {tripPointTemplate} from "./view/point.js";
import {generatePoint} from "./mock/point-mock.js";


const POINT_COUNT = 21;

const points = new Array(POINT_COUNT).fill().map(generatePoint).sort((a, b) => {
  return a.from - b.from;
});

const dateOptions = {
  // era: `long`,
  // year: `2-digit`,
  month: `short`,
  day: `2-digit`,
  // weekday: `long`,
  // timezone: `UTC`,
  // hour24: `numeric`,
  // minute: `numeric`,
  // second: `numeric`,
};
const uniqueDates = [...new Set(points.map((point) => {
  return point.from.toLocaleDateString(`en-US`, dateOptions);
}))];
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
render(tripMainElement, tripInfoTemplate(), `afterbegin`);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const hiddenTitleMenu = tripControlsElement.querySelector(`.visually-hidden`);
render(hiddenTitleMenu, pageMenuTemplate(), `afterend`);
render(tripControlsElement, tripFiltersTemplate(), `beforeend`);

const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
render(tripEventsElement, tripSortTemplate(), `beforeend`);
render(tripEventsElement, createPointFormTemplate(points[0]), `beforeend`);
render(tripEventsElement, tripDaysListTemplate(), `beforeend`);

const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);

for (let i = 0; i < uniqueDates.length; i++) {
  const daysCount = i + 1;
  const pointsByDate = points.filter((point) => {
    return point.from.toLocaleDateString(`en-US`, dateOptions) === uniqueDates[i];
  }).map((point) => {
    return tripPointTemplate(point);
  }).join(` `);
  render(tripDaysListElement, tripDayTemplate(daysCount, uniqueDates[i], pointsByDate), `beforeend`);
}

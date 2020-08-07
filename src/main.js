import {tripInfoTemplate} from "./view/trip-info.js";
import {pageMenuTemplate} from "./view/page-menu.js";
import {tripFiltersTemplate} from "./view/filter.js";
import {tripSortTemplate} from "./view/sorting.js";
import {createEventTemplate} from "./view/event.js";
import {tripDaysListTemplate} from "./view/days-list.js";
import {tripDayTemplate} from "./view/day.js";
import {tripPointsListTemplate} from "./view/points-list.js";
import {tripPointTemplate} from "./view/point.js";

const POINT_COUNT = 3;

const DAYS_COUNT = 3;

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
render(tripEventsElement, createEventTemplate(), `beforeend`);
render(tripEventsElement, tripDaysListTemplate(), `beforeend`);

const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);

for (let i = 0; i < DAYS_COUNT; i++) {
  render(tripDaysListElement, tripDayTemplate(), `beforeend`);
}

const tripDaysItemElement = tripEventsElement.querySelectorAll(`.day`);

for (let i = 0; i < tripDaysItemElement.length; i++) {
  render(tripDaysItemElement[i], tripPointsListTemplate(), `beforeend`);
  const tripPointsListElement = tripDaysItemElement[i].querySelector(`.trip-events__list`);
  for (let j = 0; j < POINT_COUNT; j++) {
    render(tripPointsListElement, tripPointTemplate(), `beforeend`);
  }
}

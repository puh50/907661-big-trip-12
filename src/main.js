import TripInfo from "./view/trip-info.js";
import PageMenu from "./view/page-menu.js";
import Filter from "./view/filter.js";
import Sort from "./view/sorting.js";
import PointForm from "./view/point-form.js";
// import DaysList from "./view/days-list.js";
import TripDay from "./view/day.js";
import Point from "./view/point.js";
import {generatePoint} from "./mock/point-mock.js";
import {render, renderTemplate, RenderPosition} from "./util.js";

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

const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
render(tripMainElement, new TripInfo().getElement(), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const hiddenTitleMenu = tripControlsElement.querySelector(`.visually-hidden`);
renderTemplate(hiddenTitleMenu, new PageMenu().getElement(), `afterend`);
render(tripControlsElement, new Filter().getElement(), RenderPosition.BEFOREEND);

const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
render(tripEventsElement, new Sort().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new PointForm(points[0]).getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new TripDay().getElement(), RenderPosition.BEFOREEND);

const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);

for (let i = 0; i < uniqueDates.length; i++) {
  const daysCount = i + 1;
  const pointsByDate = points.filter((point) => {
    return point.from.toLocaleDateString(`en-US`, dateOptions) === uniqueDates[i];
  }).map((point) => {
    return new Point(point).getElement();
  }).join(` `);

  render(tripDaysListElement, new TripDay(daysCount, uniqueDates[i], pointsByDate).getElement(), RenderPosition.BEFOREEND);
}

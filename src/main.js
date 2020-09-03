import TripInfo from "./view/trip-info.js";
import PageMenu from "./view/page-menu.js";
import Filter from "./view/filter.js";
import Sort from "./view/sorting.js";
import DaysList from "./view/days-list.js";
import TripDay from "./view/day.js";
import Point from "./view/point.js";
import PointForm from "./view/point-form.js";
import {generatePoint} from "./mock/point-mock.js";
import {render, RenderPosition} from "./util.js";

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
const hiddenTitleMenu = tripControlsElement.querySelectorAll(`.visually-hidden`);
render(tripControlsElement, new PageMenu().getElement(), RenderPosition.AFTER, hiddenTitleMenu[1]);
render(tripControlsElement, new Filter().getElement(), RenderPosition.BEFOREEND);

const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
render(tripEventsElement, new Sort().getElement(), RenderPosition.BEFOREEND);
render(tripEventsElement, new DaysList().getElement(), RenderPosition.BEFOREEND);

const tripDaysListElement = tripEventsElement.querySelector(`.trip-days`);

for (let i = 0; i < uniqueDates.length; i++) {
  const daysCount = i + 1;

  const tripDay = new TripDay(daysCount, uniqueDates[i]).getElement();

  render(tripDaysListElement, tripDay, RenderPosition.BEFOREEND);
  const tripEventList = tripDay.querySelector(`.trip-events__list`);

  points.filter((point) => {
    return point.from.toLocaleDateString(`en-US`, dateOptions) === uniqueDates[i];
  }).forEach((point) => {
    const pointComponent = new Point(point).getElement();
    const pointFormComponent = new PointForm(point).getElement();
    render(tripEventList, pointComponent, RenderPosition.BEFOREEND);

    const replacePointToForm = () => {
      tripEventList.replaceChild(pointFormComponent, pointComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const replaceFormToPoint = () => {
      tripEventList.replaceChild(pointComponent, pointFormComponent);
    };

    const rollupButton = pointComponent.querySelector(`.event__rollup-btn`);

    rollupButton.addEventListener(`click`, () => {
      replacePointToForm();
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    if (pointFormComponent) {
      pointFormComponent.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    }
  });
}

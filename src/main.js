import TripInfo from "./view/trip-info.js";
import PageMenu from "./view/page-menu.js";
import Filter from "./view/filter.js";
import {generatePoint} from "./mock/point-mock.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from "./presenter/trip.js";

export const POINT_COUNT = 20;

const points = new Array(POINT_COUNT).fill().map(generatePoint).sort((a, b) => {
  return a.from - b.from;
});

const pageHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = pageHeaderElement.querySelector(`.trip-main`);
render(tripMainElement, new TripInfo(POINT_COUNT).getElement(), RenderPosition.AFTERBEGIN);

const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const hiddenTitleMenu = tripControlsElement.querySelectorAll(`.visually-hidden`);
render(tripControlsElement, new PageMenu().getElement(), RenderPosition.AFTER, hiddenTitleMenu[1]);
render(tripControlsElement, new Filter().getElement(), RenderPosition.BEFOREEND);

const eventSection = document.querySelector(`.trip-events`);

const boardPresenter = new TripPresenter(eventSection);
boardPresenter.init(points);

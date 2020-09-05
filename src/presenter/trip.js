// import TripInfo from "../view/trip-info.js";
import Sort from "../view/sorting.js";
import DaysList from "../view/days-list.js";
import TripDay from "../view/day.js";
import Point from "../view/point.js";
import PointForm from "../view/point-form.js";
import NoPoints from "../view/no-points.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {POINT_COUNT} from "../main.js";
import {generatePoint} from "../mock/point-mock.js";


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    // this._tripInfoComponent = new TripInfo();
    this._sortComponent = new Sort(POINT_COUNT);
    this._daysListComponent = new DaysList(POINT_COUNT);
    this._tripDayComponent = new TripDay();
    this._pointComponent = new Point();
    this._pointFormComponent = new PointForm();
    this._noPointsComponent = new NoPoints(POINT_COUNT);

    // this._handleEditPointClick = this._handleEditPointClick.bind(this);
    // this._handleFormSubmit = this._handleFormSubmit.bind(this);
    // this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    this._sourcedBoardTasks = tripPoints.slice();
    this._renderTrip();
  }

  // _renderTripInfo() {
  //   render(this._tripContainer/* ? */, this._tripInfoComponent(POINT_COUNT), RenderPosition.AFTERBEGIN);
  // }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointsComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderDaysList() {
    render(this._tripContainer, this._daysListComponent, RenderPosition.BEFOREEND);
  }

  _renderTripPoints() {
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

    for (let i = 0; i < uniqueDates.length; i++) {
      const daysCount = i + 1;

      const tripDay = new TripDay(daysCount, uniqueDates[i]).getElement();

      render(this._daysListComponent, tripDay, RenderPosition.BEFOREEND);
      const tripEventList = tripDay.querySelector(`.trip-events__list`);

      points.filter((point) => {
        return point.from.toLocaleDateString(`en-US`, dateOptions) === uniqueDates[i];
      }).forEach((point) => {

        const pointComponent = new Point(point);
        const pointFormComponent = new PointForm(point);

        render(tripEventList, pointComponent.getElement(), RenderPosition.BEFOREEND);

        const replacePointToForm = () => {
          replace(pointFormComponent, pointComponent);
          document.addEventListener(`keydown`, onEscKeyDown);
        };

        const replaceFormToPoint = () => {
          replace(pointComponent, pointFormComponent);
        };

        pointComponent.setEditClickHandler(() => {
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
          pointFormComponent.setFormSubmitHandler(() => {
            replaceFormToPoint();
            document.removeEventListener(`keydown`, onEscKeyDown);
          });
        }
      });
    }
  }

  _renderTrip() {
    this._renderNoPoints();
    this._renderSort();
    this._renderDaysList();
    this._renderTripPoints();
  }

}

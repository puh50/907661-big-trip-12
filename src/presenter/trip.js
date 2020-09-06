import Sort from "../view/sorting.js";
import DaysList from "../view/days-list.js";
import TripDay from "../view/day.js";
import Point from "../view/point.js";
import PointForm from "../view/point-form.js";
import NoPoints from "../view/no-points.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {sortByTime, sortByPrice} from "../utils/point.js";
import {POINT_COUNT} from "../main.js";
import {generatePoint} from "../mock/point-mock.js";
import {SortType} from "../const.js";


export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._currentSortType = SortType.DEFAULT;

    this._sortComponent = new Sort();
    this._daysListComponent = new DaysList();
    this._tripDayComponent = new TripDay();
    this._pointComponent = new Point();
    this._pointFormComponent = new PointForm();
    this._noPointsComponent = new NoPoints();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    // 1. В отличии от сортировки по любому параметру,
    // исходный порядок можно сохранить только одним способом -
    // сохранив исходный массив:
    // this._sourcedtripPoints = tripPoints.slice();
    this._renderTrip();
  }

  _sortPoints(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.TIME:
        this._tripPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._tripPoints.sort(sortByPrice);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this._boardTasks = this._sourcedBoardTasks.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    // - Очищаем список
    // - Рендерим список заново
    this._clearPointsList();
    // this._renderTripPoints();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

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

      const tripDay = new TripDay(daysCount, uniqueDates[i]);

      render(this._daysListComponent, tripDay.getElement(), RenderPosition.BEFOREEND);
      const tripEventList = tripDay.getEventList();

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
    if (POINT_COUNT === 0) {
      this._renderNoPoints();
      return;
    }
    this._renderSort();
    this._renderDaysList();
    this._renderTripPoints();
  }

  _clearPointsList() {
    this._daysListComponent.getElement().innerHTML = ``;
    this._pointComponent.getElement().innerHTML = ``;
  }

}

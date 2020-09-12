import Point from "../view/point.js";
import PointForm from "../view/point-form.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class PointPresenter {
  constructor(pointListContainer, changeData, changeMode) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointFormComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    // this._handleTypeSelect = this._handleTypeSelect.bind(this);
    // this._handleCitySelect = this._handleCitySelect.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointFormComponent = this._pointFormComponent;

    this._pointComponent = new Point(point);
    this._pointFormComponent = new PointForm(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointFormComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointFormComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    // this._pointFormComponent.setEventTypeSelectHandler(this._handleTypeSelect);
    // this._pointFormComponent.setEventCitySelectHandler(this._handleCitySelect);

    if (prevPointComponent === null || prevPointFormComponent === null) {
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointFormComponent, prevPointFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._pointFormComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  _replacePointToForm() {
    replace(this._pointFormComponent, this._pointComponent);
    this._changeMode();
    this._mode = Mode.EDITING;
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._pointFormComponent);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._pointFormComponent.reset(this._point);
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleFormSubmit(point) {
    this._changeData(point);
    this._replaceFormToPoint();
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._point,
            {
              isFavorite: !this._point.isFavorite
            }
        )
    );
  }

  // _handleTypeSelect(evt) {
  //   this._changeData(
  //       Object.assign(
  //           {},
  //           this._point,
  //           {
  //             type: evt.target.value,
  //           }
  //       )
  //   );
  // }

  // _handleCitySelect(evt) {
  //   // console.log(evt.target);
  //   this._changeData(
  //       Object.assign(
  //           {},
  //           this._point,
  //           {
  //             city: this._point.city,
  //             // photos: evt.target.value,
  //             // description: evt.target.value,
  //           }
  //       )
  //   );
  // }

}

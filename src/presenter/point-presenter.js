import { render, replace, remove } from '../framework/render.js';
import NewPointView from '../view/new-point.js';
import PointView from '../view/point-view.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING:'EDITING'
}
export default class PointPresenter {
  #pointComponent = null;
  #pointEditComponent = null;
  #PointEditContainer = null;
  #point;
  #handleModeChange = null;
  #handleDataChange  = null;
  #mode = Mode.DEFAULT;

  constructor({PointEditContainer, onModeChange, onDataChange}) {
    this.#PointEditContainer = PointEditContainer;
    this.#handleModeChange = onModeChange;
    this.#handleDataChange = onDataChange;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      onEditClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#pointEditComponent = new NewPointView({
      point: this.#point,
      onFormSubmit: this.#handleFormSubmit,
      onFormDelete: this.#handleFormDelete
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#PointEditContainer);
      return
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent)
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent)
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove (this.#pointComponent);
    remove(this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  resetView () {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard()
    }
  }

  #replaceCardToForm = () => {
   replace(this.#pointEditComponent, this.#pointComponent);
   this.#handleModeChange();
   this.#mode = Mode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) =>{
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point
    );
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#replaceFormToCard();
  }

  #handleFormDelete = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
    // document.removeEventListener('keydown', this.#escKeyDownHandler);
    // this.#replaceFormToCard();
    // this.#pointEditComponent.reset(this.#point);
  }
}





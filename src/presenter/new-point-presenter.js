import { render, replace, remove, RenderPosition } from '../framework/render.js';
import NewPointView from '../view/new-point.js';
import {UserAction, UpdateType} from '../const.js';
import { nanoid } from 'nanoid';

export default class NewPointPresenter {
  #pointEditComponent = null;
  #PointEditContainer = null;
  #handleDataChange  = null;
  #handleDestroy = null;

  constructor({PointEditContainer, onDataChange, onDestroy}) {
    this.#PointEditContainer = PointEditContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return
    }

    this.#pointEditComponent = new NewPointView({
      // point: this.#point,
      onFormSubmit: this.#handleFormSubmit,
      onFormDelete: this.#handleFormDelete
    });

    render(this.#pointEditComponent, this.#PointEditContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return
    }
    this.#handleDestroy();
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) =>{
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy;
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isSaving: true,
      isDisabled: true
    })
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
      isSaving: false,
      isDisabled: false,
      isDeleting: false
      })
      this.#pointEditComponent.shake(resetFormState)
    }
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      // {id: nanoid(), ...point}
      point
    );
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormDelete = () => {
    this.destroy()
  }
}

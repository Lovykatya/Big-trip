import { render, replace, remove } from '../framework/render.js';
import NewPointView from '../view/new-point.js';
import PointView from '../view/point-view.js';
// import FilterView from '../view/filter.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING:'EDITING'
}
export default class PointPresenter {
  // #filters = null;
  // #filterComponent = new FilterView ({ filters: this.#pointModel});
  #pointComponent = null;
  #pointEditComponent = null;
  #PointEditContainer = null;
  #point;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({PointEditContainer, onModeChange}) {
    this.#PointEditContainer = PointEditContainer;
    this.#handleModeChange = onModeChange;
    // this.#handlePointChange = onDataChange;
    // this.#filters = filters;
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
      onFormSubmit: this.#handleFormSubmit
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
    remove(this.#pointEditComponent)
  }

  resetView () {
    if (this.#mode !== Mode.DEFAULT) {
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
      this.#replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    }
  }

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  }
}




  // #filterView () {

  //   const pointComponent = new PointView({
  //     point,
  //     onEditClick: () => {
  //       replaceCardToForm.call(this);
  //       document.addEventListener('keydown', escKeyDownHandler);
  //     }

  //     const filterComponent = new FilterView({
  //       filters: this.#pointModel.point,
  //       acceptFilterClick: () => {
  //         render(this.#filterView, this.#tripComponents.element, RenderPosition.AFTERBEGIN)
  //       }
  //   })

  //   const currentFilterType = 'EVERYTHING';
  //    this.#filterComponent = new FilterView ({
  //     filters: generateFilter(this.#boardPoint),
  //     currentFilterType: currentFilterType,
  //     acceptFilterClick: acceptFilterClick
  //     acceptFilterClick: () => {
  //       replaceCard.call(this);
  //       render(this.#filterComponent, this.#tripComponents.element, RenderPosition.AFTERBEGIN)
  //     }
  //   })

  //   const replaceCard = () => {
  //     render(this.#filterComponent, this.#tripComponents.element)
  //   }
  // }



  //   this.#filterView();


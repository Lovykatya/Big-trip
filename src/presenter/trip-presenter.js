import PointsListView from '../view/points-list.js';
import {render, RenderPosition} from '../framework/render.js';
import EmptyList from '../view/empty_list.js';
import PointPresenter from '../presenter/point-presenter.js';
import {updateItem} from '../utils/common.js';
import SortView from '../view/sort.js';
import { SortType } from '../const.js';
import {SortDate, SortPriceUp, SortPriceDown, SortDateDown} from '../utils/tasks.js';
// import FilterView from '../view/filter.js';


export default class TripPresenter {
  #tripComponents = new PointsListView();
  #tripContainer = null;
  #pointModel = null;
  #boardPoint = [];
  #createEmptyListTemplate = new EmptyList();
  #pointsPresenter = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardPoint = [];
  #currentSortOrder = 'asc';
    // #filters = null;
  // #filterComponent = new FilterView ({ filters: this.#pointModel});

  constructor({ tripContainer, pointModel}) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel;
        // this.#filters = filters;
  }

  init() {
    this.#boardPoint = [...this.#pointModel.point].sort(SortDate);
    this.#sourcedBoardPoint = [...this.#pointModel.point].sort(SortDate);

    this.#renderBoard();
  }

  #renderEmptyList () {
    render(this.#createEmptyListTemplate, this.#tripComponents.element, RenderPosition.AFTERBEGIN);
  }

  #renderSortView () {
    this.#sortComponent = new SortView ({
      onSortTypeChange: this.#handleSortTypeChange,
      currentSortType: this.#currentSortType
    })

    render(this.#sortComponent, this.#tripComponents.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter ({
      PointEditContainer: this.#tripComponents.element,
      onDataChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange,
    })

    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter)
  }

  #renderTaskList () {
    for (let i = 0; i < this.#boardPoint.length; i++) {
      this.#renderPoint(this.#boardPoint[i]);
    }
  }

  #renderBoard() {
    render(this.#tripComponents, this.#tripContainer);

    if (this.#boardPoint.length === 0) {
    this.#renderEmptyList();
    return;
    }

    this.#renderSortView(SortType.DEFAULT);

    console.log('Rendered EmptyList:', this.#createEmptyListTemplate.element);

    this.#renderTaskList()
  }

  #handleDataChange = (updatePoint) => {
    this.#boardPoint = updateItem(this.#boardPoint, updatePoint);
    this.#pointsPresenter.get(updatePoint.id).init(updatePoint);
    this.#sourcedBoardPoint = updateItem(this.#sourcedBoardPoint, updatePoint);
  }
  // }
  // #handleDataChange = (updatePoint) => {
  //   if (updatePoint) {
  //     this.#boardPoint = updateItem(this.#boardPoint, updatePoint);
  //     const presenter = this.#pointsPresenter.get(updatePoint.id);
  //     if (presenter) {
  //       presenter.init(updatePoint);
  //     }
  //     this.#sourcedBoardPoint = updateItem(this.#sourcedBoardPoint, updatePoint);
  //   } else {
  //     console.error('updatePoint не определен!');
  //   }
  // }

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  }

  #SortTask (sortType, currentSortOrder) {
    switch (sortType) {
        case SortType.DEFAULT:
            if (currentSortOrder === 'asc') {
              this.#boardPoint.sort(SortDate);

            } else {
              currentSortOrder = 'desc';
              this.#boardPoint.sort(SortDateDown);
            }
            break;
        case SortType.PRICE:
            if ( currentSortOrder === 'asc') {
              this.#boardPoint.sort(SortPriceUp);

            } else {
              currentSortOrder = 'desc';
              this.#boardPoint.sort(SortPriceDown);
            }
            break;
    }
    this.#currentSortType = sortType;
    this.#currentSortOrder = currentSortOrder;
}

#handleSortTypeChange = (sortType) => {
  if (this.#currentSortType === sortType) {
    this.#currentSortOrder = this.#currentSortOrder === 'asc' ? 'desc' : 'asc';
  }

  this.#SortTask(sortType, this.#currentSortOrder);
  this.#clearPointList();
  this.#renderTaskList();
}

  #clearPointList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
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

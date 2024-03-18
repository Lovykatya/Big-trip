import PointsListView from '../view/points-list.js';
import {render, RenderPosition} from '../framework/render.js';
import EmptyList from '../view/empty_list.js';
import PointPresenter from '../presenter/point-presenter.js';
import {updateItem} from '../utils/common.js';
import SortView from '../view/sort.js';
import { SortType } from '../const.js';
import {SortUp, SortDown} from '../utils/tasks.js';

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

  constructor({ tripContainer, pointModel}) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel;
  }

  init() {
    this.#boardPoint = [...this.#pointModel.point];
    this.#sourcedBoardPoint = [...this.#pointModel.point];

    this.#renderBoard();
  }

  #renderEmptyList () {
    render(this.#createEmptyListTemplate, this.#tripComponents.element, RenderPosition.AFTERBEGIN);
  }

  #renderSortView () {
    this.#sortComponent = new SortView ({
      onSortTypeChange: this.#handleSortTypeChange
    })

    render(this.#sortComponent, this.#tripComponents.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter ({
      PointEditContainer: this.#tripComponents.element,
      onDataChange: this.#handlePointChange
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

  #handlePointChange (updatePoint) {
    this.#boardPoint = updateItem(this.#boardPoint, updatePoint);
    this.#pointsPresenter.get(updatePoint.id).init(updatePoint);
    this.#sourcedBoardPoint = updateItem(this.#sourcedBoardPoint, updatePoint);

  }

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  }

  #SortTask (sortType) {
    switch (sortType) {
      case sortType.DEFAULT: this.#boardPoint(SortUp);
      break;
      case sortType.DEFAULT: this.#boardPoint(SortDown);
      break;
      case sortType.PRICE: this.#boardPoint(SortUp);
      break;
      case sortType.PRICE: this.#boardPoint(SortDown);
      break;
      default:
        this.#boardPoint = [...this.#sourcedBoardPoint];
    }
    this.#currentSortType = sortType
  }

  #handleSortTypeChange = (sortType) => {
    if (sortType === SortType.PRICE) {
      this.#boardPoint.sort(sortPointPriceDown);
      return
    }

    this.#SortTask(sortType);
    this.#clearPointList();
    this.#renderTaskList();
  }

  #clearPointList() {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  }
}



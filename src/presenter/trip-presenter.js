import PointsListView from '../view/points-list.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import EmptyList from '../view/empty_list.js';
import PointPresenter from '../presenter/point-presenter.js';
import SortView from '../view/sort.js';
import { SortType, UpdateType, UserAction } from '../const.js';
import {SortDate, SortPriceUp, SortPriceDown, SortDateDown} from '../utils/tasks.js';
import { filter, filterType } from '../utils/filter-util.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #tripComponents = new PointsListView();
  #tripContainer = null;
  #pointModel = null;
  #EmptyListComponent = null;
  #pointPresenter = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;
  #currentSortOrder = 'asc';
  #filterModel = null;
  #filterType = filterType.EVERYTHING;
  #NewPointPresenter = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ tripContainer, pointModel, filterModel, onNewPointDestroy}) {
    this.#tripContainer = tripContainer;
    this.#pointModel = pointModel;
    this.#filterModel = filterModel;

    this.#NewPointPresenter = new NewPointPresenter ({
      PointEditContainer: this.#tripComponents.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    })

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get point() {
    this.#filterType = this.#filterModel.filter;
    const point = this.#pointModel.point;
    const filteredTasks = filter[this.#filterType](point);

    switch (this.#currentSortType) {
      case SortType.DEFAULT:
        filteredTasks.sort(this.#currentSortOrder === 'asc' ? SortDate : SortDateDown);
        break;
      case SortType.PRICE:
        filteredTasks.sort(this.#currentSortOrder === 'asc' ? SortPriceUp : SortPriceDown);
        break;
    }
    return filteredTasks;
  }

  init() {
    this.#renderBoard();
  }

  createPoint() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType.EVERYTHING);
    this.#NewPointPresenter.init()
  }

  #renderEmptyList() {
    this.#EmptyListComponent = new EmptyList ({
      filterType: this.#filterType
    })
    render(this.#EmptyListComponent, this.#tripComponents.element, RenderPosition.AFTERBEGIN);
  }

  #renderSortView() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      sortType: this.#currentSortType
    });
    render(this.#sortComponent, this.#tripComponents.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      PointEditContainer: this.#tripComponents.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }

  #renderTaskList() {
    this.point.forEach((point) => this.#renderPoint(point));
  }

  #renderBoard() {
    render(this.#tripComponents, this.#tripContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return
    }

    if (this.point.length === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSortView();

    this.#renderTaskList();
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#NewPointPresenter.setSaving();
        try {
        await this.#pointModel.addPoint(updateType, update);
        } catch(err) {
          this.#NewPointPresenter.setAborting()
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).isDeleting();
        try {
          await this.#pointModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#tripComponents.element, RenderPosition.AFTERBEGIN)
  }

  #handleModeChange = () => {
    this.#NewPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      this.#currentSortOrder = this.#currentSortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.#currentSortOrder = 'asc';
    }
    this.#currentSortType = sortType;
    this.#clearBoard({resetSortType: true});
    this.#renderBoard();
  }

  #clearBoard({resetSortType = false} = {}) {
    this.#NewPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#loadingComponent);

    if (this.#EmptyListComponent) {
      remove(this.#EmptyListComponent)
    }

    if (this.#sortComponent) {
      remove(this.#sortComponent);
    }
  }
}


import { filterType } from '../utils/filter-util.js';
import FilterView from '../view/filter.js';
import {remove, render, replace} from '../framework/render.js';
import { UpdateType } from '../const.js';


export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #pointModel = null;

  #filterComponent = null;

  constructor({filterContainer, filterModel, pointModel}) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#pointModel = pointModel;

    this.#pointModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    return [
      {
       type: filterType.EVERYTHING,
       name: 'EVERYTHING'
      },
      {
        type: filterType.FUTURE,
        name: 'FUTURE'
      }
    ];
  }

  init () {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView ({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    })

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

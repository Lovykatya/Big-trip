import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType) {
  const {name} = filter;
  return (
      `<div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${name}" ${name === currentFilterType ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
      </div>`
  )
}

function createFilterTemplate(filterItems, currentFilterType) {
  if (!Array.isArray(filterItems)) {
    console.error("filterItems is not an array:", filterItems);
    return '';
  }
  if (!filterItems || filterItems === undefined) {
    return '';
  }
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

    return (
    `<form class="trip-filters" action="#" method="get">
    ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
    )
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor ({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('change', this.#handleFilterTypeChangeHandler);

  }

  get template() {

    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #handleFilterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  }


}


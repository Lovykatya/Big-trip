import AbstractView from '../framework/view/abstract-view.js';

// function createFilterTemplate(filters, currentFilterType) {
//   return (
    // `<form class="trip-filters" action="#" method="get">
    // ${filters.map(({name}) =>
    //   `<div class="trip-filters__filter">
    //     // <input id="filter-${name}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${name}" ${name === currentFilterType ? 'checked' : ''}>
    //     <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    //   </div>`).join('')}
    //   <button class="visually-hidden" type="submit">Accept filter</button>
    // </form>`

function createFilterItemTemplate(filter, currentFilterType) {
  const {name, count} = filter;
  return (
      `<div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="${name}" ${currentFilterType ? 'checked' : ''}${count === 0 ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
      </div>`
  )
}

function createFilterTemplate(filterItems) {
  if (!filterItems || filterItems === undefined) {
    return '';
  }
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
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
  // #acceptFilterClick;
  // #currentFilterType = null;

  // constructor ({filters, acceptFilterClick, currentFilterType}) {
    constructor ({filters}) {
    super();
    this.#filters = filters;
    // this.#acceptFilterClick = acceptFilterClick;
    // this.#currentFilterType = currentFilterType;
    // this.element.addEventListener('change', this.#editFilterClick);
  }

  get template() {
    // return createFilterTemplate(this.#filters, this.#currentFilterType);
    return createFilterTemplate(this.#filters);
  }

  // #editFilterClick = (evt) => {
  //   evt.preventDefault();
  //   this.#acceptFilterClick(evt.target.value);
  // }
}

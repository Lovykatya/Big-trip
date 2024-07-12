import AbstractView from '../framework/view/abstract-view.js';
import { filterType } from '../utils/filter-util.js';

const noTaskType ={
  [filterType.EVERYTHING]: 'Click New Event to create your first point',
  [filterType.FUTURE]: 'There are no future events now'
}

function createEmptyListTemplate (filterType) {
  const noTaskTypeValue = noTaskType[filterType];
    return `<p class="trip-events__msg">${noTaskTypeValue}</p>`;
}

export default class EmptyList extends AbstractView {

  #filterType = null;

  constructor ({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate( this.#filterType);
  }
}



import AbstractView from '../framework/view/abstract-view.js';
import {formatTimePoint, formatDatePoint} from '../utils/tasks.js';

function createPointTemplate(point) {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = point;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${formatDatePoint(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.city}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${formatTimePoint(dateFrom)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${formatTimePoint(dateTo)}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.map(({title, price}) =>
          `<li class="event__offer">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </li>`).join('')}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointView extends AbstractView {
  #point = null;
  #handleEditClick = null;
  #handleFilterClick = null;

  constructor ({point, onEditClick, onDataChange}) {
    super();
    this.#point = point;
    this.#handleEditClick = onEditClick;
    this.#handleFilterClick = onDataChange;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.addEventListener('change', this.#editFilterClick);
  }

  get template() {
    return createPointTemplate(this.#point);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  }

  #editFilterClick = (evt) => {
      evt.preventDefault();
      this.#handleFilterClick();
    }
}

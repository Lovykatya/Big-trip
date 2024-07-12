import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {formatDateForm} from '../utils/tasks.js';
import { offersByType, findDestination } from '../mock/point.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let alltypes = ['taxi', 'ship', 'drive']; 

const defaultPoint = {
  basePrice: 1100,
  dateFrom: "2019-07-10T22:55:56.845Z",
  dateTo: "2019-07-11T11:22:13.375Z",
  destination: {
    id: -1,
    description: 'Moscow parliament building',
    city: 'Moscow',
    pictures: [
      {
        src: 'https://loremflickr.com/248/152?random=1',
        altDescription: 'Moscow parliament building'
      },
      {
        src: 'https://loremflickr.com/248/152?random=2',
        altDescription: 'Moscow parliament building'
      }
    ]
  },
  id: 0,
  offers: [
    {
      id: 0,
      title: 'Add something',
      price: 200
    },
    {
      id: 1,
      title: 'Buy something',
      price: 500
    }
  ],
  type: 'taxi'
};


function createTypeTemplate(alltypes, currentType) {
  return (
    `<div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
          ${alltypes.map((type) => `<div class="event__type-item">
              <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
              <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
          </div>`).join('')}
      </fieldset>
    </div>`
  );
}

function createOffersTemplate(offers) {
  if (!offers || !Array.isArray(offers)) {
    return ''; // Возвращаем пустую строку, если offers не определен или не является массивом
  }

  return (
    `<section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offers.map(({ id, title, price, isChecked }) =>
            `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" ${isChecked ? 'checked' : ''}>
              <label class="event__offer-label" for="event-offer-${id}">
                <span class="event__offer-title">${title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${price}</span>
              </label>
            </div>`).join('')}
        </div>
      </section>
    </section>`
  );
}

function createPictureTemplate(pictures) {
  if (!pictures || !Array.isArray(pictures)) {
    return '';
  }

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map(({ src, altDescription }) =>
          `<img class="event__photo" src="${src}" alt="${altDescription}">`).join('')}
      </div>
    </div>`
  );
}

function createNewPointTemplate(point = defaultPoint) {
  const { basePrice, dateFrom, dateTo, destination, offers } = point;
  const offersTemplate = createOffersTemplate(offers);
  const destinationPicture = createPictureTemplate(destination.pictures);
  const typeTemplate = createTypeTemplate(alltypes, point.type);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            ${typeTemplate}
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${point.type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.city)}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDateForm(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDateForm(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        ${offersTemplate}

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.description}</p>

          ${destinationPicture}

        </section>
      </form>
    </li>`
  );
}


export default class NewPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleFormDelete = null;
  #datePickerFrom = null;
  #datePickerTo = null;


  constructor ({point = defaultPoint, onFormSubmit, onFormDelete}) {
    super();
    this. _setState(NewPointView.parsePointToState(point));
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormDelete = onFormDelete;
    this._restoreHandlers();
  }

  get template() {
    return createNewPointTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.HandlerTypeChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.HandlerDestionationChange);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#HandlerPriceChange);
    this.#setDatePickr()
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const offers = this._state.offers.map(offer => ({
      ...offer,
      isChecked: formData.has(`event-offer-${offer.id}`)
    }));

    this.updateElement({ offers });

    this.#handleFormSubmit(NewPointView.parseStateToPoint(this._state));
  }


  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDelete(NewPointView.parseStateToPoint(this._state));
  }

  removeElement() {
    super.removeElement();

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  }

  static parsePointToState (point) {
    return {...point}
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    point.offers = state.offers.filter(offer => offer.isChecked); // Сохраняем только выбранные offers
    return point;
  }

  HandlerTypeChange = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;
    const newOffers = offersByType({ ...this._state, type: newType });

    const typeOutputLabel = this.element.querySelector('.event__type-output');
    if (typeOutputLabel) {
      typeOutputLabel.textContent = newType;
    }

    const eventTypeToggle = this.element.querySelector('.event__type-toggle');
    if (eventTypeToggle) {
      eventTypeToggle.checked = false;
    }

    this.updateElement({
      type: newType,
      offers: newOffers,
    });
  }

  HandlerDestionationChange = (evt) => {
    evt.preventDefault();
    const selectedCity = evt.target.value;
    const newDestination = findDestination({ city: selectedCity });

    if (newDestination) {
      this.updateElement({
        destination: newDestination
      });
    } else {
      console.error(`Destination for city "${selectedCity}" not found.`);
    }
  };

  #HandlerPriceChange = (evt) => {
    evt.preventDefault();
    const price = evt.target.value;

    this.updateElement({
      basePrice: price
    })
  }

  reset(point) {
    this.updateElement(
      NewPointView.parsePointToState(point)
    )
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    })
  }

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate
    })
  }

  #setDatePickr () {
    this.#datePickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat:'j/n/y H:i',
        dafaultDate: this._state.dateFrom,
        onClose: this.#dateFromChangeHandler,
        enableTime: true,
        time_24hr: true,
        minuteIncrement: 1
      }
    )

    this.#datePickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat:'j/n/y H:i',
        dafaultDate: this._state.dateTo,
        onClose: this.#dateToChangeHandler,
        enableTime: true,
        time_24hr: true,
        minuteIncrement: 1
      }
    )
  }
}


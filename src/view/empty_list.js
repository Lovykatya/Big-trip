import AbstractView from '../framework/view/abstract-view.js';

// const FILTERTYPE = [
//   {
//     id: 'Everthing',
//     description: 'Click New Event to create your first point'
//   },
//   {
//     id: 'Past',
//     description: 'There are no past events now'
//   },
//   {
//     id: 'Future',
//     description: 'There are no future events now'
//   }
// ]

// const FILTERTYPE = {
//   Everthing: 'Click New Event to create your first point',
//   Past: 'There are no past events now',
//   Future: 'There are no future events now'
// }


function createEmptyListTemplate () {
    return `<p class="trip-events__msg">'Click New Event to create your first point'</p>`;
}

export default class EmptyList extends AbstractView {

  // #message;

  // constructor ({message}) {
  //   // this.#message = message;

  // }

  get template() {
    return createEmptyListTemplate();
  }
}

// export {FILTERTYPE}

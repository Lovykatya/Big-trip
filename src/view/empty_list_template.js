import AbstractView from '../framework/view/abstract-view.js';

function createPointsListTemplate() {
  return '<section class="trip-events"></section>';
}

export default class EmptyTemplate extends AbstractView {

  get template() {
    return createPointsListTemplate();
  }

}

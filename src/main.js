import FilterView from './view/filter.js';
// import SortView from './view/sort.js';
import { render } from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import {generateFilter} from './mock/filter.js';

document.addEventListener('DOMContentLoaded', () => {
const siteFiltersElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const siteTripEvents = siteMainElement.querySelector('.trip-events');
const pointModel = new PointModel();
const tripPresenter = new TripPresenter({tripContainer: siteTripEvents, pointModel});

const filters = generateFilter(pointModel.point);
// debugger;

// render(new SortView({onSortTypeChange: currentFilterType}), siteTripEvents);
render(new FilterView({filters}), siteFiltersElement)

tripPresenter.init();
})

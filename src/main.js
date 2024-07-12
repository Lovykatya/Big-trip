import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import { render } from './framework/render.js';
import TripPresenter from './presenter/trip-presenter.js';
import PointModel from './model/point-model.js';
import {filters} from './const.js';
import NewPointButtonView from './view/new-point-btn.js';
import PointApiService from './api/point-api-service.js';

const AUTHORIZATION = 'Basic hdodmen43f563t245';
const END_POINT = 'https://19.ecmascript.pages.academy/big-trip-simple';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event');
  const siteFiltersElement = document.querySelector('.trip-controls__filters');
  const siteMainElement = document.querySelector('.page-main');
  const siteTripEvents = siteMainElement.querySelector('.trip-events');
  const siteHeaderEvents = document.querySelector('.trip-main');
  const pointModel = new PointModel({
    PointApiService: new PointApiService(END_POINT, AUTHORIZATION)
  });
  const filterModel = new FilterModel();
  const tripPresenter = new TripPresenter({
    tripContainer: siteTripEvents,
    pointModel,
    filterModel,
    onNewPointDestroy: handleNewPointFormClose
  });

  const NewPointButtonComponent = new NewPointButtonView ({
    onClick: handleNewTaskButtonClick
  });

  function handleNewTaskButtonClick () {
    tripPresenter.createPoint();
    NewPointButtonComponent.element.disabled = true;
  }

  function handleNewPointFormClose() {
    NewPointButtonComponent.element.disabled = false;
  }

  const filterPresenter = new FilterPresenter({
    filterContainer: siteFiltersElement,
    filterModel,
    pointModel
  });

  filterPresenter.init();
  tripPresenter.init();
  pointModel.init()
  .finally(() =>
    render(NewPointButtonComponent, siteHeaderEvents));
});

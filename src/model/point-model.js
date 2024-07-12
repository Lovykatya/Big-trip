import { getPoint } from '../mock/point.js';
import Observable from '../framework/observable.js';
import PointApiService from '../api/point-api-service.js';
import { UpdateType } from '../const.js';

// const COUNTOFPOINTS = 22;

export default class PointModel extends Observable {
  #pointDescription = [];
  #PointApiService = null;

  constructor({PointApiService}) {
    super();
    // this.#pointDescription = Array.from({ length: COUNTOFPOINTS }, getPoint);
    this.#PointApiService = PointApiService;
    // this.#PointApiService.points.then((points) => {
    //   console.log(points.map(this.#adapteToClient))
    // })
  }

  get point() {
    return this.#pointDescription;
  }

  async init() {
    try {
      const point = await this.#PointApiService.point;
      this.#pointDescription = point.map(this.#adaptToClient)
    } catch(err) {
      this.#pointDescription = []
    }

    this._notify(UpdateType.INIT)
  }

  async updatePoint(updateType, update) {
    const index = this.#pointDescription.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#PointApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);

      this.#pointDescription = [
        ...this.#pointDescription.slice(0, index),
        updatedPoint,
        ...this.#pointDescription.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error ('Can\'t update task');
    }
  }

  async addPoint(updateType, update) {
    try {  const response = await this.#PointApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);

      this.#pointDescription = [
        newPoint,
        ...this.#pointDescription,
      ];

      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error ('Can\'t add task');
    }
  }

  async deletePoint(updateType, update) {
    const index = this.#pointDescription.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    try {
      await this.#PointApiService.deletePoint(update);

      this.#pointDescription = [
        ...this.#pointDescription.slice(0, index),
        ...this.#pointDescription.slice(index + 1),
      ];

      this._notify(updateType, update);
    }  catch(err) {
      throw new Error('Can\'t delete task');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point["base_price"],
      dateFrom: point["date_from"].dateFrom !== null ? new Date(point["date_from"]) : point["date_from"],
      dateTo: point["date_to"].dateFrom !== null ? new Date(point["date_to"]) : point["date_to"],
      destination: point["destination"],
      id: point["id"],
      offers: point["offers"],
      type: point["type"]
    }

    delete adaptedPoint["base_price"];
    delete adaptedPoint["date_from"];
    delete adaptedPoint["date_to"];
    delete adaptedPoint["destination"];
    delete adaptedPoint["id"];
    delete adaptedPoint["offers"];
    delete adaptedPoint["type"];

    return adaptedPoint
  }
}




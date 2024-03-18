import { getPoint } from '../mock/point.js';

const COUNTOFPOINTS = 22;

export default class PointModel {
  // constructor() {
  //   #pointDescription = Array.from({ length: COUNTOFPOINTS }, () => getPoint());
  // }

 #pointDescription = Array.from({ length: COUNTOFPOINTS }, getPoint);

  get point() {
    return this.#pointDescription;
  }
}
  // getPoint() {
  //   return getRandomArrayElement(PointDescription);
  // }



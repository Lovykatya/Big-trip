import ApiService from "../framework/api-service";

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
}
export default class PointApiService extends ApiService {
  get points () {
    return this._load({url: 'points'})
     .then(ApiService.parseResponse)
  }

  async updatePoint(point) {
    const response = await this._load (
      {
        url: `points/${point.id}`,
        method: Method.PUT,
        body: JSON.stringify(this.#adaptToServer(point)),
        headers: new Headers({'Content-Type': 'application/json'}),
      }
    )

    const parseResponse = await ApiService.parseResponse(response);

    return parseResponse
  }

  async addPoint(point) {
    const response = await this._load(
      {
        url: `points`,
        method: Method.POST,
        body: JSON.stringify(this.#adaptToServer(point)),
        headers: new Headers({'Content-Type': 'application/json'}),
      }
    )

    const parseResponse = await ApiService.parseResponse(response);

    return parseResponse
  }

  async deletePoint(point) {
    const response = await this._load(
      {
        url: `points/${point.id}`,
        method: Method.DELETE,
      }
    )

    return response
  }

  destinations() {
    const response = this._load(
      {
        url: `destinations`
      }
    )
    const parseResponse = ApiService.parseResponse(response);

    return parseResponse
  }

  offers() {
    const response = this._load(
      {
        url: `offers`
      }
    )
    const parseResponse = ApiService.parseResponse(response);

    return parseResponse
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      "base_price": point.basePrice,
      "date_from": point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      "date_to": point.dateTo  instanceof Date ? point.dateTo.toISOString() : null,
      "destination": point.destination,
      "id": point.id,
      "offers": point.offers,
      "type": point.type
    }

    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.destination;
    delete adaptedPoint.id;
    delete adaptedPoint.offers;
    delete adaptedPoint.type;

    return adaptedPoint
  }
}

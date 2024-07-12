const SortType = {
  DEFAULT: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const DISABLED_SORT_TYPE = ['event', 'time', 'offer'];

const UserAction = {
  UPDATE_POINT: 'UPDATE_TASK',
  ADD_POINT: 'ADD_TASK',
  DELETE_POINT: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export {SortType, DISABLED_SORT_TYPE, UserAction, UpdateType}

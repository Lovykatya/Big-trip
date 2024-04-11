import dayjs from "dayjs";

const TIME_FORMAT = 'HH:mm';
const DATE_FORMAT = 'MMM DD';
const DATE_FORM_FORMAT = 'DD/MM/YY HH:mm';

const formatTimePoint = (datePoint) => {
  return datePoint ? dayjs(datePoint).format(TIME_FORMAT) : '';
}

const formatDatePoint = (datePoint) => {
  return datePoint ? dayjs(datePoint).format(DATE_FORMAT) : '';
}

const formatDateForm = (datePoint) => {
  return datePoint ? dayjs(datePoint).format(DATE_FORM_FORMAT) : '';
}

function compare(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}


function SortDate(pointA, pointB) {
  const weight = compare(pointA.dateFrom, pointB.dateFrom);
  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function SortDateDown(pointA, pointB) {
  const weight = compare(pointA.dateFrom, pointB.dateFrom);
  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}

function SortPriceUp(pointA, pointB) {
  const weight = compare(pointA.basePrice, pointB.basePrice);
  return weight ?? (pointA.basePrice - pointB.basePrice);
}

function SortPriceDown(pointA, pointB) {
  const weight = compare(pointA.basePrice, pointB.basePrice);
  return weight ?? (pointB.basePrice - pointA.basePrice);
}

export { formatTimePoint, formatDatePoint, formatDateForm, SortDate, SortPriceUp, SortPriceDown, SortDateDown}

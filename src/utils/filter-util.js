import dayjs from "dayjs";

const filterType = {
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE'
}

const filters = [
  {
    name: filterType.EVERYTHING
  },
  {
    name: filterType.FUTURE
  }
];

const filter = {
  [filterType.EVERYTHING]: (points) => points,
  [filterType.FUTURE]: (points) => {
    const currentDate = dayjs();
    return points.filter((point) => dayjs(point.dateFrom).isAfter(currentDate));
  }
}

export { filterType, filters, filter };


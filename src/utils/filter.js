import dayjs from "dayjs";

const filterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future'
}

const filter = {
  [filterType.EVERYTHING]: (points) => points,
  [filterType.FUTURE]: (points) => {
    const currentDate = dayjs();
    return points.filter((point) => dayjs(point.dateFrom).isAfter(currentDate));
  }
}

export {filter}

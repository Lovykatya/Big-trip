// import flatpickr from 'flatpickr';
import { nanoid } from 'nanoid';
import { getRandomPositiveInteger} from '../utils/common.js';

let type = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant']; //взять названия в скобки

let cities  = ['Amsterdam', 'Chamonix', 'Geneva'];

const PRICES = [100, 500, 700, 1100, 1500, 2000];
const DATES_FROM = [
  '2019-07-10T22:55:56.845Z',
  '2019-07-12T22:55:56.845Z',
  '2019-07-14T22:55:56.845Z',
  '2019-07-16T22:55:56.845Z',
  '2019-07-18T22:55:56.845Z'
];
// let events = ['Taxi Amsterdam', 'Drive Chamonix', 'Check-in Chamonix', 'Sightseeing Chamonix', 'Drive Geneva', 'Flight Geneva'];

let price = {
  min: 20,
  max: 2000,
};

// let time = {
//   // dateFrom: flatpickr('#event-start-time-1'),
//   // dateTo: flatpickr('#event-end-time-1')
// }

const offers = [
  {
    title: 'No additional offers',
    id: 1,
    price: 0
  },
  {
    title: 'Book tickets',
    id: 2,
    price: 40
  },
  {
    title: 'Lunch in city',
    id: 3,
    price: 30
  },
  {
    title: 'Rent a car',
    id: 4,
    price: 200
  },
  {
    title: 'Add breakfast',
    id: 5,
    price: 50
  }
];

let offersByType = [
  {
    type: 'taxi',
    offers: [5, 3]
  }
]

let descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.']

let destination = [
  {
    id: 1,
    description: descriptions[getRandomPositiveInteger(0, descriptions.length-1)],
    name: cities[getRandomPositiveInteger(0, cities.length-1)],
    picture: `https://loremflickr.com/248/152?random=1`
    // [
      // {
      //   description: descriptions[getRandomPositiveInteger(0, descriptions.length-1)],
      //   picture: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`
      // },
      // {
      //   description: descriptions[getRandomPositiveInteger(0, descriptions.length-1)],
      //   picture: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`
      // },  {
      //   description: descriptions[getRandomPositiveInteger(0, descriptions.length-1)],
      //   picture: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`
      // },  {
      //   description: descriptions[getRandomPositiveInteger(0, descriptions.length-1)],
      //   picture: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`
      // },  {
      //   description: descriptions[getRandomPositiveInteger(0, descriptions.length-1)],
      //   picture: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`
      // }
    // ]
  }
]

// const mockPoint = (index) => ({
const point = {
  dateTo: "2019-07-11T11:22:13.375Z",
  destination: destination[0],
  // id: 0,
  offers: offers.filter((offer) => offersByType.find((item) => item.type === type[0]).offers.includes(offer.id)),
  type: type[getRandomPositiveInteger(0, type.length-1)]
}
//   id: 0,
//   dateFrom: ('2019-07-10T22:55:56.845Z'),
//   dateTo: '2019-07-11T11:22:13.375Z',
//   // dateFrom: time.dateFrom.value,
//   // dateTo: time.dateTo.value,
//   base_price: getRandomPositiveInteger(price.min, price.max),
//   offers: offers[getRandomPositiveInteger(0, offers.length-1)],
//   destination: destination[getRandomPositiveInteger(0, destination.length-1)],
//   type: type[getRandomPositiveInteger(0, type.length-1)]
// };

function getPoint() {
  return {
    id: nanoid(),
    basePrice: getRandomPositiveInteger(PRICES),
    dateFrom: getRandomPositiveInteger(DATES_FROM),
    ...point
  }
}
// let PointDescription = Array.from({length: COUNTOFPOINTS}, (_, index) => mockPoint(index + 1));

// function getRandomPoint() {
//   return getRandomArrayElement(PointDescription);
// }
export {getPoint};


// // import flatpickr from 'flatpickr';
// import { nanoid } from 'nanoid';
// import { getRandomPositiveInteger, getRandomArrayElement} from '../utils/common.js';

// let alltypes = ['taxi', 'ship', 'drive']; //взять названия в скобки

// // let cities  = ['Amsterdam', 'Chamonix', 'Geneva'];

// const PRICES = [100, 500, 700, 1100, 1500, 2000];
// const DATES_FROM = [
//   '2019-07-10T22:55:56.845Z',
//   '2019-07-12T22:55:56.845Z',
//   '2019-07-14T22:55:56.845Z',
//   '2019-07-16T22:55:56.845Z',
//   '2019-07-18T22:55:56.845Z'
// ];

// // let time = {
// //   // dateFrom: flatpickr('#event-start-time-1'),
// //   // dateTo: flatpickr('#event-end-time-1')
// // }

// const offers = [
//   {
//     title: 'No additional offers',
//     id: 1,
//     price: 0
//   },
//   {
//     title: 'Book tickets',
//     id: 2,
//     price: 40
//   },
//   {
//     title: 'Lunch in city',
//     id: 3,
//     price: 30
//   },
//   {
//     title: 'Rent a car',
//     id: 4,
//     price: 200
//   },
//   {
//     title: 'Add breakfast',
//     id: 5,
//     price: 50
//   }
// ];

// let mockOffersByType = [
//   {
//     type: 'taxi',
//     offers: [5, 3]
//   },
//   {
//     type: 'ship',
//     offers: [1, 3]
//   },
//   {
//     type: 'drive',
//     offers: [2, 4]
//   }
// ]

// // let descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.']

// // let destination = [
// //   {
// //     id: 1,
// //     description: descriptions[getRandomPositiveInteger(0, descriptions.length-1)],
// //     name: cities[getRandomPositiveInteger(0, cities.length-1)],
// //     picture: `https://loremflickr.com/248/152?random=1`
//     // [
//       // {
//       //   description: descriptions[getRandomPositiveInteger(0, descriptions.length-1)],
//       //   picture: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`
//       // },
//       // {
//       //   description: descriptions[getRandomPositiveInteger(0, descriptions.length-1)],
//       //   picture: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`
//       // },  {
//       //   description: descriptions[getRandomPositiveInteger(0, descriptions.length-1)],
//       //   picture: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`
//       // },  {
//       //   description: descriptions[getRandomPositiveInteger(0, descriptions.length-1)],
//       //   picture: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`
//       // },  {
//       //   description: descriptions[getRandomPositiveInteger(0, descriptions.length-1)],
//       //   picture: `https://loremflickr.com/248/152?random=${getRandomPositiveInteger(0, 10)}`
//       // }
//     // ]
// //   }
// // ]

// const allDestinations = [
//   {
//     id: 1,
//     description: 'Chamonix description',
//     city: 'Chamonix',
//     pictures: [
//       { src: 'https://loremflickr.com/248/152?random=1', altDescription: 'Chamonix description' },
//       { src: 'https://loremflickr.com/248/152?random=2', altDescription: 'Chamonix description' }
//     ]
//   },
//   {
//     id: 2,
//     description: 'Geneva description',
//     city: 'Geneva',
//     pictures: [
//       { src: 'https://loremflickr.com/248/152?random=1', altDescription: 'Geneva description' },
//       { src: 'https://loremflickr.com/248/152?random=2', altDescription: 'Geneva description' }
//     ]

//   },
//   {
//     id: 3,
//     description: 'Amsterdam description',
//     city: 'Amsterdam',
//     pictures: [
//       { src: 'https://loremflickr.com/248/152?random=1', altDescription: 'Amsterdam description' },
//       { src: 'https://loremflickr.com/248/152?random=2', altDescription: 'Amsterdam description' }
//     ]
//   },
// ];

// function offersByType(point) {
//   return offers.filter((offer) => mockOffersByType.find((item) => item.type === point.type).offers.includes(offer.id));
// }

// const point = {
//   dateTo: "2019-07-11T11:22:13.375Z",
//   destination: allDestinations[0],
//   type: alltypes[0]
// };

// // point.offers = offersByType(point);

// function getPoint() {
//   return {
//     id: nanoid(),
//     basePrice: getRandomArrayElement(PRICES),
//     dateFrom: getRandomArrayElement(DATES_FROM),
//     offers: offersByType(point),
//     ...point
//   }
// }

// function findDestination(destination) {
//   return allDestinations.find((item) => item.city === destination.city);
// }

// export {getPoint, alltypes, offersByType, allDestinations,findDestination};


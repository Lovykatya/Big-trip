// import FilterView from '../view/filter.js';


// export default class FilterPresenter {
//   #tripComponents = new PointsListView();
//   #pointModel = null;
//   #boardPoint = [];
//   #filters = null;
//   #filterComponent = new FilterView ({ filters: this.#pointModel});

//   constructor({}) {
// }
//   init() {

//   }

//   #filterView () {

//     const pointComponent = new PointView({
//       point,
//       onEditClick: () => {
//         replaceCardToForm.call(this);
//         document.addEventListener('keydown', escKeyDownHandler);
//       }

//       const filterComponent = new FilterView({
//         filters: this.#pointModel.point,
//         acceptFilterClick: () => {
//           render(this.#filterView, this.#tripComponents.element, RenderPosition.AFTERBEGIN)
//         }
//     })

//     const currentFilterType = 'EVERYTHING';
//      this.#filterComponent = new FilterView ({
//       filters: generateFilter(this.#boardPoint),
//       currentFilterType: currentFilterType,
//       acceptFilterClick: acceptFilterClick
//       acceptFilterClick: () => {
//         replaceCard.call(this);
//         render(this.#filterComponent, this.#tripComponents.element, RenderPosition.AFTERBEGIN)
//       }
//     })

//     const replaceCard = () => {
//       render(this.#filterComponent, this.#tripComponents.element)
//     }
//   })

//   this.#filterView();
// }

// }

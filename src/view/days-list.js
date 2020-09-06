import Abstract from "./abstract.js";

const tripDaysListTemplate = () => {
  return `<ul class="trip-days"></ul>`;
};

export default class DaysList extends Abstract {
  constructor() {
    super();
  }

  getTemplate() {
    return tripDaysListTemplate();
  }

}

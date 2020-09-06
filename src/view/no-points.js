import Abstract from "./abstract.js";

const noPointsTemplate = () => {
  return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
};

export default class NoPoints extends Abstract {
  constructor() {
    super();
  }

  getTemplate() {
    return noPointsTemplate();
  }

}

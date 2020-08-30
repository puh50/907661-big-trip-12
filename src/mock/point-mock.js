import {getRandomInteger} from "../util.js";

const pointTypes = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
const randomPointType = pointTypes[getRandomInteger(0, pointTypes.length - 1)];
const type = randomPointType;

export const cities = [`Saint Petersburg`, `Amsterdam`, `Geneva`, `Chamonix`];
const randomCity = cities[getRandomInteger(0, cities.length - 1)];
const city = randomCity;

const offers = [
  {
    type: `luggage`,
    name: `Add luggage`,
    price: `20`,
    isSelected: Boolean(getRandomInteger(0, 1)),
  },
  {
    type: `meal`,
    name: `Add meal`,
    price: `50`,
    isSelected: Boolean(getRandomInteger(0, 1)),
  },
  {
    type: `seats`,
    name: `Choose seats`,
    price: `5`,
    isSelected: Boolean(getRandomInteger(0, 1)),
  },
  {
    type: `comfort`,
    name: `Switch to comfort class`,
    price: `100`,
    isSelected: Boolean(getRandomInteger(0, 1)),
  },
  {
    type: `train`,
    name: `Travel by train`,
    price: `10`,
    isSelected: Boolean(getRandomInteger(0, 1)),
  },
];

export const generateDate = () => {

  const gap = 15;
  const daysGap = getRandomInteger(-gap, gap);
  const currentDate = new Date();
  const randomHours = getRandomInteger(0, 24);
  const randomMinutes = getRandomInteger(0, 59);
  const randomSeconds = getRandomInteger(0, 59);
  currentDate.setHours(randomHours, randomMinutes, randomSeconds);
  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const from = generateDate();
const to = generateDate();


const destinations = [
  {
    name: `Geneva`,
    description: `Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.`,
    photos: [`http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`],
  },
  {
    name: `Saint Petersburg`,
    description: `Saint Petersburg is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.`,
    photos: [`http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`],
  },
  {
    name: `Amsterdam`,
    description: `Amsterdam is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.`,
    photos: [`http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`],
  },
  {
    name: `Chamonix`,
    description: `Chamonix is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.`,
    photos: [`http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`],
  },
];

const destination = () => {
  for (let item of destinations) {
    if (item.name === city) {
      return item;
    }
  }
  return ``;
};

const photos = destination().photos;
const description = destination().description;

export const generatePoint = () => {
  return {
    type,
    city,
    offers,
    price: getRandomInteger(0, 10000),
    from,
    to,
    photos,
    description,
  };
};

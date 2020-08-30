import {generatePoint} from "../mock/point-mock.js";

export const tripDayTemplate = (day, dayDate) => {

  const options = {
    // era: `long`,
    // year: `2-digit`,
    month: `short`,
    // day: `2-digit`,
    // weekday: `long`,
    // timezone: `UTC`,
    // hour: `numeric`,
    // minute: `numeric`,
    // second: `numeric`,
  };

  const generatedDate = generatePoint().from;
  const dateTime = new Intl.DateTimeFormat(`en-US`, options);
  dayDate = dateTime.format(generatedDate);
  const dayDatePlussed = generatedDate.getDate() + (day - 1);

  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${day}</span>
      <time class="day__date" datetime="2019-03-18">${dayDate} ${dayDatePlussed}</time>
    </div>
    </li>`
  );
};

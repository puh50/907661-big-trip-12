export const tripDayTemplate = (day, dayDate, points) => {
  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${day}</span>
      <time class="day__date" datetime="2019-03-18">${dayDate}</time>
    </div>
    <ul class="trip-days">${points}</ul>
    </li>`
  );
};

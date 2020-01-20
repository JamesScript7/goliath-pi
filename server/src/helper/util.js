export function kelvinToFahrenheit(kelvin) {
  const absoluteZeroInFahrenheit = 459.67;
  return Math.round((kelvin * (9 / 5)) - absoluteZeroInFahrenheit);
}

// NOTE: Brought this over from older code, could use refactoring :p
export function forecastEngine(forecast) {
  const result = [];
  const obj = {};
  let current = '';

  forecast.list.forEach((el, i) => {
    const t = new Date(el.dt * 1000).toString().split(' ')[0];

    function initializeKey() {
      current = t;
      obj[t] = {};
      obj[t].temp = [];
    }
    function updateObj() {
      obj[t].day = t;
      obj[t].temp.push(kelvinToFahrenheit(el.main.temp));
      obj[t].description = el.weather[0].description;
      obj[t].icon = `https://openweathermap.org/img/w/${el.weather[0].icon}.png`;
    }

    if (i === forecast.list.length - 1) {
      // Push current at end of the array.
      updateObj();
      obj[current].min = kelvinToFahrenheit(Math.min(...obj[current].temp));
      obj[current].max = kelvinToFahrenheit(Math.max(...obj[current].temp));

      result.push(obj[current]);
    } else if (i !== 0 && t === current) {
      // Continue to update temp array.
      updateObj();
    } else if (i !== 0 && t !== current) {
      // push to result because this means
      // we are on to the next day.
      obj[current].min = kelvinToFahrenheit(Math.min(...obj[current].temp));
      obj[current].max = kelvinToFahrenheit(Math.max(...obj[current].temp));

      result.push(obj[current]);
      initializeKey();
      updateObj();
    } else {
      // i === 0
      initializeKey();
      updateObj();
    }
  });

  return result;
}

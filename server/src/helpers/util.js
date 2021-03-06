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
    function updateObj(param) {
      obj[t].day = t;
      obj[t].temp.push(kelvinToFahrenheit(el.main.temp));
      obj[t].description = el.weather[0].description;
      obj[t].icon = `https://openweathermap.org/img/w/${el.weather[0].icon}.png`;

      if (!param) {
        // force day icon
        obj[t].icon = `https://openweathermap.org/img/w/${el.weather[0].icon.replace('n', 'd')}.png`;
      }
    }

    if (i === forecast.list.length - 1) {
      // Push current at end of the array.
      updateObj(true);
      obj[current].min = Math.min(...obj[current].temp);
      obj[current].max = Math.max(...obj[current].temp);

      result.push(obj[current]);
    } else if (i !== 0 && t === current) {
      // Continue to update temp array.
      updateObj();
    } else if (i !== 0 && t !== current) {
      // push to result because this means
      // we are on to the next day.
      obj[current].min = Math.min(...obj[current].temp);
      obj[current].max = Math.max(...obj[current].temp);

      result.push(obj[current]);
      initializeKey();
      updateObj();
    } else {
      // i === 0
      initializeKey();
      updateObj();
    }
  });

  result.shift();

  return result;
}

export function parseSnippet(str) {
  const res = str.split(' ');
  // NOTE: because snippet doesn't return last num
  const resLength = res.length - 1;
  const snippetObject = {};

  res.forEach((item, i) => {
    if (item.includes('num') && i !== resLength) {
      const word = item.split('_');
      snippetObject[`${word[1]}_${word[2]}`] = `${res[i + 1]}`;
    }
  });

  return snippetObject;
}

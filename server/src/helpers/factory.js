// WEATHER REPORT
export const mockCurrentData = {
  temp: 28,
  temp_min: 23,
  temp_max: 31,
  description: 'clear sky',
  icon: 'https://openweathermap.org/img/w/01n.png',
};

export const mockForecastData = [{
  temp: [
    27,
    28,
    29,
    30,
    32,
    36,
    37,
    36,
  ],
  day: 'Wed',
  description: 'clear sky',
  icon: 'https://openweathermap.org/img/w/01d.png',
  min: 27,
  max: 37,
},
{
  temp: [
    35,
    34,
    34,
    35,
    38,
    40,
    39,
    38,
  ],
  day: 'Thu',
  description: 'overcast clouds',
  icon: 'https://openweathermap.org/img/w/04d.png',
  min: 34,
  max: 40,
},
{
  temp: [
    38,
    38,
    38,
    38,
    40,
    41,
    42,
    42,
  ],
  day: 'Fri',
  description: 'scattered clouds',
  icon: 'https://openweathermap.org/img/w/03d.png',
  min: 38,
  max: 42,
},
{
  temp: [
    41,
    42,
    43,
    43,
    45,
    47,
    47,
    43,
  ],
  day: 'Sat',
  description: 'scattered clouds',
  icon: 'https://openweathermap.org/img/w/03d.png',
  min: 41,
  max: 47,
},
{
  temp: [
    42,
    41,
    40,
    40,
    43,
    41,
    39,
  ],
  day: 'Sun',
  description: 'broken clouds',
  icon: 'https://openweathermap.org/img/w/04n.png',
  min: 39,
  max: 43,
}];

// JOKE OF THE DAY
export const mockJoke = {
  success: {
    total: 1,
  },
  contents: {
    jokes: [{
      description: 'Joke of the day ',
      language: 'en',
      background: '',
      category: 'jod',
      date: '2020-01-23',
      joke: {
        title: 'Knock Knock - Cozy who?',
        lang: 'en',
        length: '69',
        clean: '1',
        racial: '0',
        date: '2020-01-23',
        id: 'r6Bddl1Y2RXcVy0Lr2bDBAeF',
        text: 'I ate a clock yesterday, it was very time-consuming.',
      },
    }],
    copyright: '2019-20 https://jokes.one',
  },
};

// TOP DAILY REPORT
export const mockSnippet = 'Top Daily Metrics ----------------- num_active_users_1d 122803 num_new_users_1d 169 num_messages_total_1d 9560 num_messages_urgent_total_1d 1467 num_messages_pager_total_1d 9521 num_threads_total_1d';

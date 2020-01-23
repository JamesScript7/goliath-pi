/* eslint-disable */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'file-system';
import readline from 'readline';
import googleapis from 'googleapis';
import Unsplash from 'unsplash-js';

import {
  parseSnippet,
  forecastEngine,
  kelvinToFahrenheit,
} from './helpers/util.js';

import {
  mockJoke,
  mockSnippet,
  mockCurrentData,
  mockForecastData,
} from './helpers/factory.js';

const { google } = googleapis;

dotenv.config();
global.fetch = fetch;

const app = express();
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('X-JokesOne-Api-Secret', process.env.JOKE_API_KEY);
  next();
};
app.use(allowCrossDomain);

const unsplash = new Unsplash.default({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  secret: process.env.UNSPLASH_SECRET_KEY,
});

// GMAIL API
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0],
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hey ;)');
});

app.get('/joke', (req, res) => {
  fetch('https://api.jokes.one/jod')
    .then(result => result.text())
    .then((currentBody) => {
      res.send(currentBody);
    }).catch((err) => {
      console.log('Joke API returned an error:', err);

      // fallback
      res.send(mockJoke);
    });

  // NOTE: for testing with mock data
  res.send(mockJoke);
});

app.get('/random-photo', (req, res) => {
  const FALLBACK_URL_FOR_RANDOM_PHOTO = 'https://source.unsplash.com/random/2048x1536';
  const query = {
    query: 'nature',
  };

  unsplash.photos.getRandomPhoto(query)
    .then(Unsplash.toJson).then((json) => {
      res.send(json);
    }).catch((err) => {
      console.log('Unsplash API returned an error:', err);

      // fallback
      res.send({
        alt_description: 'alt description example',
        description: 'description example',
        urls: { full: FALLBACK_URL_FOR_RANDOM_PHOTO },
      });
  });

  // NOTE: for testing with mock data
  // res.send({
  //   alt_description: 'alt description example',
  //   description: 'description example',
  //   urls: { full: FALLBACK_URL_FOR_RANDOM_PHOTO },
  // });
});

app.get('/top-daily-report', (req, res) => {
  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), getRecentEmail);
  });

  /**
   * Get the recent email from your Gmail account
   *
   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
   */
  function getRecentEmail(auth) {
    const gmail = google.gmail({ version: 'v1', auth });
    const date = new Date();
    // Ex: Jan
    const month = date.toLocaleString('default', { month: 'short' });

    gmail.users.messages.list({
      userId: 'me',
      maxResults: 1,
      q: `Top Daily Reports For ${month}`,
    }, function(err, response) {
        if (err) {
            console.log('Gmail API returned an error: ' + err);

            // fallback
            res.send(parseSnippet(mockSnippet));
            return;
        }

      // Get the message id which we will need to retreive tha actual message next.
      var message_id = response['data']['messages'][0]['id'];

      // Retreive the actual message using the message id
      gmail.users.messages.get({auth: auth, userId: 'me', 'id': message_id}, function(err, response) {
          if (err) {
              console.log('The API returned an error: ' + err);
              return;
          }

        // console.log(response['data']);
        res.send(parseSnippet(response['data'].snippet));
      });
    });
  }

  // NOTE: for testing with mock data
  // res.send(parseSnippet(mockSnippet));
});

app.get('/weather-report', (req, res) => {
  const zipCode = '10013';
  const key = process.env.WEATHER_API_KEY;
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${key}`;
  const FiveDayforcastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&APPID=${key}`;
  const currentData = {};

  fetch(currentWeatherUrl)
    .then(result => result.text())
    .then((currentBody) => {
      const current = JSON.parse(currentBody);

      currentData.temp = kelvinToFahrenheit(current.main.temp);
      currentData.temp_min = kelvinToFahrenheit(current.main.temp_min);
      currentData.temp_max = kelvinToFahrenheit(current.main.temp_max);
      currentData.description = current.weather[0].description;
      currentData.icon = `https://openweathermap.org/img/w/${current.weather[0].icon}.png`;

      fetch(FiveDayforcastWeatherUrl)
        .then(result => result.text())
        .then((forecastBody) => {
          const forecast = JSON.parse(forecastBody);
          const forecastData = forecastEngine(forecast);

          res.send({ currentData, forecastData });
        });
    }).catch((err) => {
      console.log('Openweathermap returned an error:', err);

      // fallback
      res.send({
        currentData: mockCurrentData,
        forecastData: mockForecastData,
      });
    });

    // NOTE: for testing with mock data
    // res.send({
    //   currentData: mockCurrentData,
    //   forecastData: mockForecastData,
    // });
});

app.listen(4000, () => {
  console.log('Cureatr Dashboard Listening!');
});

// NOTE:
// think about throttling so I don't hit my daily pull limit?
// websockets so that all connected monitors see the same image
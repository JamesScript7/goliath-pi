/* eslint-disable import/extensions, camelcase, prefer-template, prefer-destructuring, no-shadow, no-use-before-define, consistent-return */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import fs from 'file-system';
import readline from 'readline';
import googleapis from 'googleapis';
// import Unsplash from 'unsplash-js';

// NOTE: for testing with mock data
import {
  currentData,
  forecastData,
} from './helpers/factory.js';

// import {
//   forecastEngine,
//   kelvinToFahrenheit,
// } from './helpers/util.js';

const { google } = googleapis;

dotenv.config();
global.fetch = fetch;

const app = express();
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);

// const unsplash = new Unsplash.default({
//   accessKey: process.env.UNSPLASH_ACCESS_KEY,
//   secret: process.env.UNSPLASH_SECRET_KEY,
// });

// GMAIL API
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), listLabels);
});

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

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
}

// NOTE:
// think about throttling so I don't hit my daily pull limit
// websockets so that all connected monitors see the same image
// some error handling would be nice

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/random-photo', (req, res) => {
  // const query = {
  //   query: 'nature',
  // };

  // unsplash.photos.getRandomPhoto(query)
  //   .then(Unsplash.toJson).then((json) => {
  //     res.send(json);
  //   }).catch((err) => {
  //     res.send(err);
  //   });

  // NOTE: for testing with mock data
  const TEST_URL_FOR_RANDOM_PHOTO = 'https://source.unsplash.com/random/2048x1536';
  res.send({
    alt_description: 'alt description example',
    description: 'description example',
    urls: { full: TEST_URL_FOR_RANDOM_PHOTO },
  });
});

app.get('/top-daily-report', (req, res) => {
  // TODO: Grab 'Top Daily Report...' from connected gmail
  res.send(req);
});

app.get('/weather-report', (req, res) => {
  // const zipCode = '10013';
  // const key = process.env.WEATHER_API_KEY;
  // const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${key}`;
  // const FiveDayforcastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipCode},us&APPID=${key}`;
  // const currentData = {};

  // fetch(currentWeatherUrl)
  //   .then(result => result.text())
  //   .then((currentBody) => {
  //     const current = JSON.parse(currentBody);

  //     currentData.temp = kelvinToFahrenheit(current.main.temp);
  //     currentData.temp_min = kelvinToFahrenheit(current.main.temp_min);
  //     currentData.temp_max = kelvinToFahrenheit(current.main.temp_max);
  //     currentData.description = current.weather[0].description;
  //     currentData.icon = `https://openweathermap.org/img/w/${current.weather[0].icon}.png`;

  //     fetch(FiveDayforcastWeatherUrl)
  //       .then(result => result.text())
  //       .then((forecastBody) => {
  //         const forecast = JSON.parse(forecastBody);
  //         const forecastData = forecastEngine(forecast);

  //         res.send({ currentData, forecastData });
  //       });
  //   });

  // NOTE: for testing with mock data
  res.send({ currentData, forecastData });
});

app.listen(4000, () => {
  console.log('Example app listening!');
});

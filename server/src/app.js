import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// gmail
import Unsplash from 'unsplash-js';
// weather

const app = express();
dotenv.config();
global.fetch = fetch;

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);

const unsplash = new Unsplash.default({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  secret: process.env.UNSPLASH_SECRET_KEY,
});

// TODO:
// [] gmail API
// [x] unsplash API
// [] weather API

// NOTE:
// think about throttling so I don't hit my daily pull limit
// websockets so that all connected monitors see the same image
// some error handling would be nice

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/random-photo', (req, res) => {
  // unsplash.photos.getRandomPhoto()
  //   .then(Unsplash.toJson).then((json) => {
  //     console.log('req', req);
  //     // NOTE: Do I need to prep the JSON in any way?
  //     res.send(json);
  //   }).catch((err) => {
  //     // NOTE: Does this work?
  //     res.send(err);
  //   });

  const TEST_URL_FOR_RANDOM_PHOTO = 'https://source.unsplash.com/random/2048x1536';
  res.send({
    urls: { full: TEST_URL_FOR_RANDOM_PHOTO },
  });
});

app.get('/top-daily-report', (req, res) => {
  // TODO: Grab 'Top Daily Report...' from connected gmail
  res.send(req);
});

app.get('/weather-report', (req, res) => {
  // TODO: weather report
  res.send(req);
});

app.listen(4000, () => {
  console.log('Example app listening!');
});

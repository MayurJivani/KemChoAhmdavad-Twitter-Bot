<div align="center">

# Kem Cho Ahmdavad

**A Twitter bot for Ahmedabad. Weather, top news and fuel rates, on a schedule.**

[Futile Studio](https://futile.studio)

![Node.js](https://img.shields.io/badge/Node.js-CommonJS-0b0b0b?style=flat-square&logo=nodedotjs&labelColor=0b0b0b)
![Twitter API v2](https://img.shields.io/badge/Twitter%20API-v2-0b0b0b?style=flat-square&logo=x&labelColor=0b0b0b)
![cron](https://img.shields.io/badge/schedule-cron-0b0b0b?style=flat-square&labelColor=0b0b0b)
![Last commit](https://img.shields.io/github/last-commit/MayurJivani/KemChoAhmdavad-Twitter-Bot?style=flat-square&labelColor=0b0b0b&color=c6ff00)

</div>

> **Archive** · Twitter bot for Ahmedabad, started May 2023 · no live site

## Overview

Kem Cho Ahmdavad is a small Node.js bot that posts to one Twitter account. It runs four cron jobs each day: two weather posts, one news post and one rates post.

I started it in May 2023. It only posts. It never reads replies or mentions.

## What it posts

- **07:30 and 18:00**: the Ahmedabad forecast from WeatherAPI. Each tweet has the condition, average, max and min temperature, and a PM2.5 reading (the tweet labels it AQI).
- **09:00**: the newest English article for "Ahmedabad" from NewsAPI, limited to indiatimes.com, google.com, indianexpress.com and hindustantimes.com. The tweet is the title and the link.
- **10:00**: petrol and diesel prices for one city ID (10097) from a RapidAPI fuel price feed, plus the USD to INR rate from API Ninjas.

Times follow the server's local timezone, because the code does not set one. Nothing posts when the process starts. Each job posts only at its time.

The old README mentioned Eventbrite events. The code does not fetch events. The Eventbrite packages are in package.json but are never called.

## Stack

- Node.js, CommonJS, no build step
- twitter-api-v2 for posting
- cron for the schedules
- express for a listener on `PORT`
- request, newsapi and dotenv
- External APIs: WeatherAPI, NewsAPI, RapidAPI (fuel prices), API Ninjas (exchange rate)

## Running it locally

```bash
npm install
node index.js
```

Create a `.env` file in the repo root with the Twitter variables listed below. The repo has no `.env.example` yet.

The weather, news and rate jobs need real keys. Replace the `API_KEY_HERE` placeholders in index.js with your keys. The code does not read those keys from `.env` yet.

Running the bot posts for real at the scheduled times, so use an account you are happy to tweet from. `npm test` is the default placeholder. There are no tests.

## Configuration

twitterClient.js reads these from the environment. index.js loads them from `.env` with dotenv:

- `API_KEY`: Twitter app key (consumer key)
- `API_SECRET`: Twitter app secret
- `ACCESS_TOKEN`: access token for the bot account
- `ACCESS_SECRET`: access token secret
- `BEARER_TOKEN`: read-only bearer token. index.js does not use it.
- `PORT`: port for the Express listener. Default 4000. The listener has no routes.

Placeholders in index.js, not read from env yet:

- WeatherAPI key (the `API_KEY` constant, not the Twitter `API_KEY`)
- NewsAPI key (passed to `new NewsAPI`)
- RapidAPI key (`X-RapidAPI-Key` header)
- API Ninjas key (`X-Api-Key` header)

## Project structure

```
index.js           cron jobs, weather, news and rate posts, Express listener
twitterClient.js   Twitter client built from the environment variables
package.json       dependencies
```

## Licence

No licence file yet, all rights reserved.

---

<p align="center"><sub>Built by <a href="https://github.com/MayurJivani">Mayur Jivani</a> at <a href="https://futile.studio">Futile Studio</a>. Everything is futile. Do it anyway.</sub></p>

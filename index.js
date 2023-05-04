require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js")
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const CronJob = require("cron").CronJob;
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI("25a585aa9a2b47a2bdd63b5ea440f6a7");
const request = require('request');
const API_KEY = '2f02bdb06a904f64a50192932231504';
const API_ENDPOINT = 'http://api.weatherapi.com/v1/forecast.json';
const CITY = 'Ahmedabad';
const DAYS = 1;


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

function tweet(Twt) {
  try {
    twitterClient.v2.tweet(Twt)
      .then(() => {
        console.log("Tweeted successfully!")
      })
      .catch((error) => {
        console.error("Error while tweeting:", error)
      })
  } catch (e) {
    console.error("Error while tweeting:", e)
  }
}

const Weatherjob = new CronJob("30 7 * * *", async () => {
  request(`${API_ENDPOINT}?key=${API_KEY}&q=${CITY}&days=${DAYS}&aqi=yes`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    body.forecast.forecastday.forEach(day => {
      let ToTweet=`${CITY} Weather for Date: ${day.date} will be ${day.day.condition.text} \n Avg Temp: ${day.day.avgtemp_c}°C\nMax Temp: ${day.day.maxtemp_c}°C\nMin Temp: ${day.day.mintemp_c}°C\nAQI: ${body.current.air_quality.pm2_5}`
      tweet(ToTweet);
    });
  });
 
});

const EWeatherjob = new CronJob("0 18 * * *", async () => {
  request(`${API_ENDPOINT}?key=${API_KEY}&q=${CITY}&days=${DAYS}&aqi=yes`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    body.forecast.forecastday.forEach(day => {
      let ToTweet=`${CITY} Weather for Date: ${day.date} will be ${day.day.condition.text} \n Avg Temp: ${day.day.avgtemp_c}°C\nMax Temp: ${day.day.maxtemp_c}°C\nMin Temp: ${day.day.mintemp_c}°C\nAQI: ${body.current.air_quality.pm2_5}`
      tweet(ToTweet);
    });
  });
 
});
const Newsjob = new CronJob("0 9 * * *", async () => {
  const news = await newsapi.v2.everything({
    q: CITY,
    sortBy: 'publishedAt',
    language: 'en',
    pageSize: 1,
    domains: 'indiatimes.com,google.com,indianexpress.com,hindustantimes.com'
  });
  const { title, url } = news.articles[0];
  console.log(`Title: ${title}, URL: ${url}`);
  let ToTweet=`${title}\n${url}`;
  tweet(ToTweet);
});

const Ratejob = new CronJob("0 10 * * *", async () => {
  const Fueloptions = {
    method: 'GET',
    url: 'https://daily-fuel-prices-update-india.p.rapidapi.com/car/v2/fuel/prices',
    qs: {cityId: '10097'},
    headers: {
      src: 'android-app',
      appVersion: '1.0',
      deviceId: 'abcd',
      'X-RapidAPI-Key': 'a47c4545e1msh200a26be1673c5fp1533aajsnae905e7d35bf',
      'X-RapidAPI-Host': 'daily-fuel-prices-update-india.p.rapidapi.com'
    }
  };

  request(Fueloptions, function (error, response, body) {
    if (error) throw new Error(error);
    const data = JSON.parse(body);
    let petrolPrice = data.data.fuelPrice.petrol;
    let dieselPrice = data.data.fuelPrice.diesel;
    const rateDate = data.data.fuelPrice.date;
    request.get({
      url: 'https://api.api-ninjas.com/v1/exchangerate?pair=USD_INR',
      headers: {
        'X-Api-Key': 'B41JKwYhR96EZF7MWYaaKA==PzVWybPEKzK8OKCF'
      },
    }, function(error, response, body) {
      const data = JSON.parse(body);
      if(error) return console.error('Request failed:', error);
      else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
      
      else{
        let ToTweet=`General Rates for Date: ${rateDate} \n USD To INR: ₹${data.exchange_rate}\n----------\nFuel Rates: \nPetrol: ₹${petrolPrice}\nDiesel: ₹${dieselPrice}`
        tweet(ToTweet);
      }
        
    });
  
    
  });
  
});

  

Weatherjob.start();
EWeatherjob.start();
Newsjob.start();
Ratejob.start();
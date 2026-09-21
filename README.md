# Kem Cho Ahmdavad

![Node](https://img.shields.io/badge/Node-bot-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)
![Twitter API](https://img.shields.io/badge/Twitter-API%20v2-1DA1F2?style=flat-square&logo=x&logoColor=white)
![cron](https://img.shields.io/badge/schedule-cron-informational?style=flat-square)

A Twitter bot for Ahmedabad. It wakes on a cron schedule, pulls the city's news
from NewsAPI and upcoming events from Eventbrite, and posts them through the
Twitter API v2.

```bash
npm install
cp .env.example .env   # Twitter, NewsAPI and Eventbrite keys
node index.js
```

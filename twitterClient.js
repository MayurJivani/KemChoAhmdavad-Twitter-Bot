const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: "rtuEgAhtKoDctzu0MUEuyUUm1",
  appSecret: "R7BYmYVWLbuTMJdFkbceap9IG7pZz0g5G7veTLtyfXZNke9C2J",
  accessToken: "852855729425985536-fKk5kuQ6MZQQdQipypadCmlbC7r5KLo",
  accessSecret: "zW1izq2MRZtCpCvjdh6z6njGoktqSVRdNgQ8f7CvAKOVw",
});

const twitterClient = client.readWrite;
module.exports = {twitterClient};
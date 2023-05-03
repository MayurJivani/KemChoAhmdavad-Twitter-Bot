const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: NODE_ENV.API_KEY,
  appSecret: NODE_ENV.API_SECRET,
  accessToken: NODE_ENV.ACCESS_TOKEN,
  accessSecret: NODE_ENV.ACCESS_SECRET,
});

const bearer = new TwitterApi(NODE_ENV.BEARER_TOKEN);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

module.exports = { twitterClient, twitterBearer };
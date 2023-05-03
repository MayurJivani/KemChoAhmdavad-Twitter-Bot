const request = require('request');

request.get({
  url: 'https://api.api-ninjas.com/v1/exchangerate?pair=USD_INR',
  headers: {
    'X-Api-Key': 'B41JKwYhR96EZF7MWYaaKA==PzVWybPEKzK8OKCF'
  },
}, function(error, response, body) {
  const data = JSON.parse(body);
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  
  else console.log(data.exchange_rate)
});

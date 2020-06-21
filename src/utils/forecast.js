const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=567960872c9246aabcf70810202106&q=india' + latitude + ',' + longitude
   
  request({ url, json: true }, (error, { body }) => {
        if (error) {

            callback('unable to connect',undefined)
        } 
        else if (body.error) {
            callback('unable to find location',undefined)
        } 
        else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast
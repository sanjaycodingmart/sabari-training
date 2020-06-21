const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=567960872c9246aabcf70810202106&q='+address;
request({ url, json: true }, (error, { body }) => {
        if (error) {

        callback('Unable to connect',undefined)
        } else if (body.features.length === 0) {
            callback('Try another search.', undefined)
        } else {
            callback(undefined, {
               // latitude: body.features[0].center[1],
                //longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
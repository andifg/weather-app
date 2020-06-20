const request = require('request')


const forecast = (latidude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/d4c59549029b4e246c34a7357fa19a0d/' + encodeURIComponent(latidude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=de'

    // Test case, to see the url for the request to darksky api
    // console.log(url)

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)

        } else if (body.error) {
            callback('Server sended error ' + body.error, undefined)

        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }

    })

}

module.exports = {
    forecast: forecast

}
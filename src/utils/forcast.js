const request = require('request')


const forecast = (latidude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/d4c59549029b4e246c34a7357fa19a0d/' + encodeURIComponent(latidude) + ',' + encodeURIComponent(longitude) + '?units=si&lang=de'

    // Test case, to see the url for the request to darksky api
    console.log(url)

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)

        } else if (body.error) {
            callback('Server sended error ' + body.error, undefined)

        } else {
         var datehigh = new Date(body.daily.data[0].temperatureHighTime*1000+ body.offset*3600000)
         var timehigh = datehigh.getUTCHours()+ ':' + addZero(datehigh.getUTCMinutes())
         var datelow = new Date(body.daily.data[0].temperatureLowTime*1000 + body.offset*3600000)
         var timelow = datelow.getUTCHours()+':'+ addZero(datelow.getUTCMinutes())

         function addZero(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
          }
            callback(undefined,'Aktuell '+ body.currently.summary + '.'+ body.daily.data[0].summary + ' Die Temperatur beträgt aktuell ' + body.currently.temperature + ' Grad. Es ist eine ' + body.currently.precipProbability + '% Chance, dass es heute regnet.'+'Die maximale Temperatur tritt um ' + timehigh+ ' Uhr auf und beträgt '+ body.daily.data[0].temperatureHigh + ' Grad. Die minimale Temperatur tritt um '+ timelow + ' Uhr auf und beträgt ' + body.daily.data[0].temperatureLow + ' Grad.')
        }

    })

}

module.exports = {
    forecast: forecast

}
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

// Sets up express 
const app = express()
// Access environment variables
const port = process.env.PORT || 3000



// Define the path for static content
const publicdirPath = path.join(__dirname, '../public')

// Sets up the public directory a public directory for the server
app.use(express.static(publicdirPath))

// Connects express to handlebar framework
app.set('view engine', 'hbs')

// Set a new folder for the template folder
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

// Set up the partials path 
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)



app.get('', (req, res) => {

    // Res.render allows to render a view 
    res.render('index', {
        title: 'Weather App',
        name: 'Andreas Güntner'
    })
})
// Match anything that's not possible to render with the other methods


app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help section',
        message: 'No help provided',
        name:'Andreas Güntner'

    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'Who did this crap?',
        name: 'Andreas Güntner',
        Age: 26
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'Please select an adress'
        })
    }

    geocode.georequest(req.query.adress, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        
        forcast.forecast(latitude, longitude, (error, Forecastdata) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: Forecastdata,
                location,
                adress: req.query.adress

            })
        })



    })

})



app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        }

        )
    }
    res.send({

        products: []

    })



})


app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Andreas Güntner',
        errorMessage: 'Help page not found.'



    })

})

app.get('*', (req, res) => {
    // Res.render to render a handlebar type Res.send to send a created object
    res.render('404', {
        title: '404',
        name: 'Andreas Güntner',
        errorMessage: 'Page not found.'



    })

})



app.listen(port, () => {

    console.log('Server is up on port' + port)

})
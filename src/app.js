import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sasha Zabavskiy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sasha Zabavskiy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is the help page.',
        title: 'Help',
        name: 'Sasha Zabavskiy'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    const address = req.query.address

    geocode(address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
        return res.send({ error })
       }
    
       forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
               return res.send({ error })
           }
       
           res.send({
            forecast: forecastData,
            location: location,
            address: address
           })
       })
   })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sasha Zabavskiy',
        errorMsg: 'Help article not found.'
    }) 
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sasha Zabavskiy',
        errorMsg: 'Page not found.'
    }) 
})

app.listen(port, () => {
    console.log('ur server is up on port ' + port)
})

import request from "request"

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=200e6992594d63ef493023106015b43f&query=' + lat + ',' + long

    request({ url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather api.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            const {weather_descriptions, temperature, feelslike} = body.current
            callback(undefined, weather_descriptions + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.')
        }
    })
}


export default forecast
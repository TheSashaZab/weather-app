import request from "request"

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=e655068533f12cafc7829d574a2ffb91&limit=1&query=' + encodeURIComponent(address)
    

    if (!address) {
        return console.log('Please provide an address.')
    }

    request({ url, json: true }, (error, {body} = {}) => {

        if (error) {
            callback('Unable to connect to location api.', undefined)
        } else if (body.data === undefined || body.data.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            const { latitude, longitude, label: location } = body.data[0]
            callback(undefined, {
                latitude,
                longitude,
                location,
            })
        }
    })
}

export default geocode
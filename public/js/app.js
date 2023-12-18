console.log('javascript loaded haha')

const weatherForm  = document.querySelector('form')
const search = document.querySelector('input')
const errorMsg = document.querySelector('#errorMsg')
const successMsg = document.querySelector('#successMsg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    errorMsg.textContent = 'Loading...'
    successMsg.textContent = ''
    fetch('http://localhost:3000/weather?address=' + search.value).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            errorMsg.textContent = data.error
        } else {
            errorMsg.textContent = data.location
            successMsg.textContent = data.forecast
        }
    })
})
})
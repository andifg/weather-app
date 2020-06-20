console.log('Client side javascript file loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// Reference to an ID is done by # 
const messageone = document.querySelector('#message-one')
const messagetwo = document.querySelector('#message-two')

// messageone.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    // e.preventDefault prevents page from constantly reloading after something is submitted into the input field
    e.preventDefault()
    const location = search.value

    messageone.textContent = 'Loading ...'
    messagetwo.textContent = ''



    fetch('/weather?adress=' + location).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                messageone.textContent = data.error
                messagetwo.textContent = ''
            } else {
                messageone.textContent = data.location
                messagetwo.textContent = data.forecast
            }
        })

    })





})
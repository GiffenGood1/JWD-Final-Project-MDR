let validate = (event) => {
    event.preventDefault()
    if (document.querySelector('#task-name').value.length < 3) {
        document.querySelector('#task-name').classList.add('is-invalid')
        document.querySelector('#task-name').classList.remove('is-valid')
        console.log(event)
    } else if (document.querySelector('#assigned').value.length < 3) {
        document.querySelector('#task-name').classList.add('is-valid')
        document.querySelector('#task-name').classList.remove('is-invalid')
        document.querySelector('#assigned').classList.add('is-invalid')
        document.querySelector('#assigned').classList.remove('is-valid')
    } else if (document.querySelector('select').value === undefined) {
        document.querySelector('#task-name').classList.add('is-valid')
        document.querySelector('#task-name').classList.remove('is-invalid')  
        document.querySelector('#assigned').classList.add('is-valid')
        document.querySelector('#assigned').classList.remove('is-invalid')
        document.querySelector('select').classList.add('is-invalid')
        document.querySelector('select').classList.remove('is-valid')
    } else if (document.querySelector('#date').value === undefined) {
        document.querySelector('#task-name').classList.add('is-valid')
        document.querySelector('#task-name').classList.remove('is-invalid')  
        document.querySelector('#assigned').classList.add('is-valid')
        document.querySelector('#assigned').classList.remove('is-invalid')
        document.querySelector('select').classList.add('is-valid')
        document.querySelector('select').classList.remove('is-invalid')
        document.querySelector('#date').classList.add('is-invalid')
        document.querySelector('#date').classList.add('is-valid')
    } else if (document.querySelector('#exampleFormControlTextarea1').value.length > 2) {

    } else {

    }
    console.log(event)
}

document.querySelector('#form-validate').addEventListener('submit', validate)


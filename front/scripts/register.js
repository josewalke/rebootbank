(function authenticated () {
  if (window.localStorage.getItem('token')) {
    console.log('user authenticated')
  } else {
    console.log('user not authenticated')
  }
})()

const api = axios.create({
  baseURL: 'http://localhost:2222/api/',
  timeout: 1000
})

document.getElementById('btn-signup').addEventListener('click', (event) => {
  const newUser = {
    user_name: document.getElementById('user_name').value,
    user_email: document.getElementById('user_email').value,
    user_password: document.getElementById('user_password').value
  }

  api
    .post('auth/signup', newUser, {
      headers: {
        token: window.localStorage.getItem('token')
      }
    })
    .then(function (response) {
      window.localStorage.setItem('token', response.data.token)
      window.localStorage.setItem('name', response.data.name)
      window.localStorage.setItem('email', response.data.email)
    })
    .catch(function (error) {
      console.log(error.response)
    })
    setTimeout("location.href='./register.html'")
})
document.getElementById('close').addEventListener('click', (event) => {
  setTimeout("location.href='./login.html'")
})
(function authenticated () {
  if (window.localStorage.getItem('rol') === 'Admin') {
    console.log(window.localStorage.getItem('rol'))
  } else {
    window.location.href = 'https://ichef.bbci.co.uk/news/ws/660/amz/worldservice/live/assets/images/2015/04/17/150417194023_einstein-lengua.jpg'
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
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('name')
  window.localStorage.removeItem('email')
  window.localStorage.removeItem('rol')
  window.localStorage.removeItem('lenght')
  window.location.assign('./login.html')
})

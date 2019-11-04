(function authenticated () {
  if (localStorage.getItem('token')) {
    console.log('user authenticated')
  } else {
    console.log('user not authenticated')
  }
})()

const api = axios.create({
  baseURL: 'http://localhost:2222/api/',
  timeout: 1000
})

document.getElementById('btn-escanerqr').addEventListener('click', (event) => {
  // console.log('codigoQR')
  setTimeout("location.href='./codigoQR.html'")
})
document.getElementById('btn-correo').addEventListener('click', (event) => {
  // console.log('correo')
  setTimeout("location.href='./correo.html'")
})

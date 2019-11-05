(function authenticated() {
  if (window.localStorage.getItem('rol') === 'Empleado') {
    console.log(window.localStorage.getItem('rol'))
  } else {
    window.location.href = 'https://ichef.bbci.co.uk/news/ws/660/amz/worldservice/live/assets/images/2015/04/17/150417194023_einstein-lengua.jpg'
  }
})()
var verTicket = document.getElementById('num_ticket')

api.mostrarTicket(verTicket)
  .then(response => {
    console.log(response)
  })

document.getElementById('btn-siguiente').addEventListener('click', (event) => {
  api.next()
    .then(response => {
      console.log(response)
    })
})

document.getElementById('btn-volver').addEventListener('click', (event) => {
  api.before()
    .then(response => {
      console.log(response)
    })
})

document.getElementById('close').addEventListener('click', (event) => {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('name')
  window.localStorage.removeItem('email')
  window.localStorage.removeItem('rol')
  window.localStorage.removeItem('lenght')
  window.location.assign('./login.html')
  setTimeout("location.href='./login.html'")
})

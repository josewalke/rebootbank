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
  setTimeout("location.href='./login.html'")
})

function obtenerValorParametro (sParametroNombre) {
  var sPaginaURL = window.location.search.substring(1)
  var sURLVariables = sPaginaURL.split('&')
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParametro = sURLVariables[i].split('=')
    if (sParametro[0] == sParametroNombre) {
      // console.log(sParametro[1])
      return sParametro[1]
    }
  }
  return null
}
var ticket = obtenerValorParametro('ticket')
document.getElementById('miTicketFinal').innerHTML = ticket

var mode = obtenerValorParametro('mode')

api
  .insertqr(ticket)
  .then(response => {
    console.log(response)
  })

var verTicket = document.getElementById('miTicket')
var verCola = document.getElementById('cola')

api
  .numero(ticket)
  .then(response => {
    console.log(response)
  })

function updatePendingClients () {
  api
    .delante(ticket)
    .then(response => {
      // console.log(response)
    })
}
updatePendingClients()

setInterval(() => {
  updatePendingClients()
}, 2000)
function updateFinal () {
  api.final(ticket)
    .then(response => {
      if (response === 'proceso') {
        document.getElementById('turno').style.display = 'none'
        document.getElementById('final').style.display = 'inherit'
      }
    })
}

setInterval(() => {
  updateFinal()
}, 2000)

document.getElementById('btn-enviar')
  .addEventListener('click', event => {
    const email = document.getElementById('remitente').value
    const datos = {
      email: email,
      ticket: ticket
    }
    // console.log(datos.email)
    api.actualizar(datos)
      .then(response => {
        console.log(response)
      })
      .catch(err => new Error(err))
    document.getElementById('correo').style.display = 'none'
    document.getElementById('turno').style.display = 'inherit'
  })

document.getElementById('btn-enviar')
  .addEventListener('click', event => {
    const email = document.getElementById('remitente').value
    api
      .addClient(email)
      .then(client => {
        console.log(client)
        // window.location.href = './inicio.html'
      })
  })
function codigoqr () {
  api.qr()
    .then(response => {
      console.log(response)
    })
}
setInterval(() => {
  codigoqr()
}, 2000)

document.getElementById('btn-escanerqr').addEventListener('click', (event) => {
  // console.log('codigoQR')
  document.getElementById('inicio').style.display = 'none'
  document.getElementById('codigoqr').style.display = 'inherit'
})
document.getElementById('btn-correo').addEventListener('click', (event) => {
  // console.log('codigoQR')
  document.getElementById('inicio').style.display = 'none'
  document.getElementById('correo').style.display = 'inherit'
})

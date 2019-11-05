document.getElementById('btn-enviar')
  .addEventListener('click', event => {
    const email = document.getElementById('remitente').value
    api
      .addClient(email)
      .then(client => {
        console.log(client)
        // window.location.href = './inicio.html'
      })
    document.getElementById('inicio').style.display = 'inherit'
    document.getElementById('correo').style.display = 'none'
  })
function codigoqr () {
  api.qr()
    .then(response => {
      console.log(response)
    })
}

document.getElementById('btn-escanerqr').addEventListener('click', (event) => {
  // console.log('codigoQR')
  document.getElementById('inicio').style.display = 'none'
  document.getElementById('codigoqr').style.display = 'inherit'
  codigoqr()
})

document.getElementById('btn-correo').addEventListener('click', (event) => {
  // console.log('codigoQR')
  document.getElementById('inicio').style.display = 'none'
  document.getElementById('correo').style.display = 'inherit'
})

document.getElementById('close').addEventListener('click', (event) => {
  document.getElementById('inicio').style.display = 'inherit'
  document.getElementById('codigoqr').style.display = 'none'
})
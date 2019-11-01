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

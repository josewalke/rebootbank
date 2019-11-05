function API () {
  this.base_api = axios.create({
    baseURL: 'http://localhost:2222/api/',
    timeout: 1000
  })

  this.addClient = email => {
    return this.base_api
      .post('clientes', { email })
      .then(response => { return response.data })
      .catch(err => new Error(err))
  }
  this.qr = codigoqr => {
    return this.base_api
      .get('clientes/count')
      .then(data => {
        // console.log(data.data)
        var count = data.data
        document.getElementById('qrcode').innerHTML = ''
        var qrcode = new QRCode(document.getElementById('qrcode'), {
          width: 400,
          height: 400
        })
        qrcode.makeCode('http://localhost:8080//caja?ticket=' + count + '&mode=QR')
      })
      .catch(err => new Error(err))
  }
  this.mostrarTicket = verTicket => {
    return this.base_api
      .get('users', {
        headers: {
          token: window.localStorage.getItem("token")
        }})
      .then(data => {
        console.log(data.data)
        var nuevo = data.data.ticket
        return verTicket.innerHTML = nuevo
      })
  }
  this.next = procesar => {
    return this.base_api
      .get('users/next', {
        headers: {
          token: window.localStorage.getItem("token")
        }
      })
      .then(data => {
        console.log(data.data)
        var nuevo = data.data.ticket
        return verTicket.innerHTML = nuevo
      })
  }
  this.before = volver => {
    return this.base_api
      .get('users/before', {
        headers: {
          token: window.localStorage.getItem("token")
        }
      })
      .then(data => {
        console.log(data.data)
        var nuevo = data.data.ticket
        return verTicket.innerHTML = nuevo
      })
  }
  this.insertqr = ticket => {
    return this.base_api
      .post(`clientes/${ticket}`, {
        headers: {
          token: window.localStorage.getItem('token')
        }
      })
      .then(data => {
        console.log(data.data)
      })
  }
  this.numero = ticket => {
    return this.base_api
      .get(`clientes/${ticket}/numero`, {
        headers: {
          token: window.localStorage.getItem('token')
        }
      })
      .then(data => {
        console.log(data.data.status)
        var nuevo = data.data.ticket
        return verTicket.innerHTML = nuevo
      })
  }
  this.delante = ticket => {
    return this.base_api
      .get(`clientes/${ticket}/cola`, {
        headers: {
          token: window.localStorage.getItem('token')
        }
      })
      .then(data => {
        // console.log(data.data)
        var nuevo = data.data
        if (nuevo === 0) {
          document.getElementById('quitar').style.display = 'none'
          return verCola.innerHTML = 'Enseguida le atenderemos'
        } else {
          document.getElementById('quitar').style.display = 'inline'
          return verCola.innerHTML = nuevo
        }
      })
  }
  this.final = final => {
    return this.base_api
      .get(`clientes/${ticket}/final`)
      .then(data => {
        return data.data
        // console.log(status)
        // return status
      })
  }
  this.actualizar = datos => {
    return this.base_api
      .put(`clientes/${datos.ticket}/email`, datos)
      .then(response => {
        return response.data
      })
      .catch(err => new Error(err))
  }
}

const api = new API()

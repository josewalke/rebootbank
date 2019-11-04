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
        var qrcode = new QRCode(document.getElementById('qrcode'), {
          width: 500,
          height: 500
        })
        qrcode.makeCode('http://localhost:8080//cola?ticket=' + count + '&mode=QR')
      })
      .catch(err => new Error(err))
  }
}

const api = new API()

const api = axios.create({
  baseURL: 'http://localhost:2222/api/',
  timeout: 1000
})

api.get('clientes/count')
  .then(data => {
  // console.log(data.data)
    var count = data.data
    var span = document.getElementById('count')
    span.value = count
    var qrcode = new QRCode(document.getElementById('qrcode'), {
      width: 500,
      height: 500
    })
    span.innerHTML = count;
    qrcode.makeCode('http://localhost:8080//cola?ticket=' + count + '&mode=QR')
  })

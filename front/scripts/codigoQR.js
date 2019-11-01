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

api.get('cliente/count', {
  headers: {
    token: localStorage.getItem('token')
  }
}).then(data => {
  // console.log(data.data);
  var count = data.data
  var span = document.getElementById('count')
    span.value = count

    var qrcode = new QRCode(document.getElementById('qrcode'), {
    width: 500,
    height: 500
  })
    qrcode.makeCode('http://localhost:8080//cola?ticket=' + count.value + '&mode=QR')
})

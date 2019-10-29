(function authenticated() {
    if (localStorage.getItem('token')) {
        console.log('user authenticated')
    } else {
        console.log('user not authenticated')
    }
})()

const api = axios.create({
    baseURL: "http://localhost:2222/api/",
    timeout: 1000
});

document.getElementById('btn-enviar').addEventListener('click', (event) => {
    var remitente = document.getElementById('remitente');

    api.post(`correo/${remitente.value}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .then(data => {
            console.log(data.data);
            return data.data
        })

    console.log('enviar')
})
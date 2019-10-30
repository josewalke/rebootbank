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


function obtenerValorParametro(sParametroNombre) {
    var sPaginaURL = window.location.search.substring(1);
    var sURLVariables = sPaginaURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParametro = sURLVariables[i].split('=');
        if (sParametro[0] == sParametroNombre) {
            return sParametro[1];
        }
    }
    return null;
}
var ticket = obtenerValorParametro('ticket');
console.log(ticket);


document.getElementById('btn-enviar').addEventListener('click', (event) => {
    const correo = {
        remitente: document.getElementById("remitente").value
    };

    api.put(`cliente/${ticket}/email`, correo)
        .then(data => {
            console.log(data.data);
            return data.data
        })
    setTimeout(`location.href='./cola2?ticket=${ticket}'`);
})
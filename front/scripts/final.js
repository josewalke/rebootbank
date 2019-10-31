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
var ver_ticket = document.getElementById('miTicket')


api.get(`cliente/${ticket}/numero`, {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .then(data => {
        var nuevo = data.data
        return ver_ticket.innerHTML = nuevo;
    })
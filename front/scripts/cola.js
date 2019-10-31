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
            //console.log(sParametro[1])
            return sParametro[1];
        }
    }
    return null;
}
var ticket = obtenerValorParametro('ticket');

var mode = obtenerValorParametro('mode');

if (mode === 'QR') {
    document.getElementsByClassName('alerta')[0].style.display = "block";

}


api.post(`cliente/${ticket}`, {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .then(data => {
        console.log(data.data);
    })


var ver_ticket = document.getElementById('miTicket')
var ver_cola = document.getElementById('cola')


api.get(`cliente/${ticket}/numero`, {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .then(data => {
        console.log(data.data);
        var nuevo = data.data
        return ver_ticket.innerHTML = nuevo;
    })


function updatePendingClients() {
    api.get(`cliente/${ticket}/cola`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .then(data => {
            console.log(data.data);
            var nuevo = data.data
            if (nuevo === 0) {
                document.getElementById('quitar').style.display = "none";
                return ver_cola.innerHTML = 'Enseguida le atenderemos';
            } else {
                document.getElementById('quitar').style.display = "inline";
                return ver_cola.innerHTML =  nuevo ;
            }
        })
}

updatePendingClients();



setInterval(() => {
    updatePendingClients()
}, 2000);
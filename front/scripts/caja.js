(function authenticated() {
    if (localStorage.getItem('token')) {
        console.log('user authenticated')
    } else {
        console.log('user not authenticated')
        //location.href = 'https://ichef.bbci.co.uk/news/ws/660/amz/worldservice/live/assets/images/2015/04/17/150417194023_einstein-lengua.jpg'
    }
})()

const api = axios.create({
    baseURL: "http://localhost:2222/api/",
    timeout: 1000
});

var ver_ticket = document.getElementById('num_ticket')

api.get(`users`, {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    .then(data => {
        console.log(data.data);
        var nuevo = data.data.ticket
        return ver_ticket.innerHTML = nuevo;
    })

document.getElementById('btn-siguiente').addEventListener('click', (event) => {
    api.get(`users/next`, {
            headers: {
                token: localStorage.getItem("token")
            }
    })
    .then(data => {
        console.log(data.data);
        var nuevo = data.data.ticket
        return ver_ticket.innerHTML = nuevo;
    })
})

document.getElementById('btn-volver').addEventListener('click', (event) => {
    api.get(`users/before`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        .then(data => {
            console.log(data.data);
            var nuevo = data.data.ticket
            return ver_ticket.innerHTML = nuevo;
        })
})
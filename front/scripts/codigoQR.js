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

api.get('cliente/count', {
    headers: {
        token: localStorage.getItem("token")
    }
}).then(data => {
    //console.log(data.data);
    var count = data.data
    var span = document.getElementById('count');
    console.log(count)
    span.innerHTML = count;
    console.log(span.innerHTML)
})

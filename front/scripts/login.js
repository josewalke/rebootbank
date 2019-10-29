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

document.getElementById('btn-login').addEventListener('click', (event) => {
    console.log('loggggiinnnnn')

    const newUser = {
        user_email: document.getElementById("login_email").value,
        user_password: document.getElementById("login_password").value
    };

    api
        .post("auth/login", newUser)
        .then(function (response) {
            localStorage.setItem("token", response.data.token);
            //console.log(response.data.token);
            localStorage.setItem("name", response.data.name);
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("rol", response.data.rol);
            console.log(response.data);

            if (localStorage.rol === 'Empleado') {
                setTimeout("location.href='./caja.html'");
            }else if(localStorage.rol ==='Admin'){
                setTimeout("location.href='./register.html'");
            }
        })
        .catch(function (error) {
            console.log(error.response);
        });
})
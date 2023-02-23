let form = document.getElementById("login-form");
let email = document.getElementById("email");
let password = document.getElementById("password");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent page reload

    let data = {
        email: email.value,
        password: password.value
    }

    console.log(data);

    axios.post("https://expense-app-uldl.onrender.com/api/auth/login", data)
    .then(res => {
        console.log("This is data", res);
        
        const { token } = res.data;
        // we need to save the token to localstorage
        localStorage.setItem("token", token);
        // we will redirect to the home page
        window.location.href = "./home.html";
    }).catch(err => {
        console.log(err);
    })
})
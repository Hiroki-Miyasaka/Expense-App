const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("register-form");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    if(name.value === "" || email.value === "" || password.value === "") {
        alert("Please provide required information");
        return;
    }

    let data = {
        fullName: name.value,
        email: email.value,
        password: password.value
    };

    axios.post("https://expense-app-uldl.onrender.com/api/auth/register",data)
        .then(response => {
            console.log(response);
            window.location.href = "./login.html";
        }).catch(err => {
            console.log(err);
        })

})
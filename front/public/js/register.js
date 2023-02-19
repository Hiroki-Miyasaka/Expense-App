const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("register-form");

form.addEventListener("submit", (event) => {

    event.preventDefault();

    if(name.value === "" || email.value === "" || password.value === "") {
        alert("Please provide required information");
        return;
    }

    let data = {
        fullName: name.value,
        email: email.value,
        password: password.value
    };

    axios.post("http://localhost:3001/api/auth/register",data)
        .then(response => {
            window.location.href = "./login.html";
            console.log(response);
        }).catch(err => {
            console.log(err);
        })

})
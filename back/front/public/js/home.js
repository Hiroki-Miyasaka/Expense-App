// get user info
let userName = document.getElementById("userName");
let userBalance = document.getElementById("userBalance");
let userCashBack = document.getElementById("userCashBack");
let userIncome = document.getElementById("userIncome");
let userExpense = document.getElementById("userExpense");

// add new transaction


// logout
let logoutButton = document.getElementById("logout");

let token = localStorage.getItem("token");

if(token){
    axios.defaults.headers.common["Authorization"] = `${token}`;
}

getMe()

function getMe(){
    axios.get("http://localhost:3001/me").then(
        data => {
            console.log("data.data", data.data);
            const { fullName, income, transactions } = data.data.user;

            userName.innerText = fullName;
            userIncome.innerText = "$" + income;
            console.log("transactions", transactions);
            let deposit = 0;
            let expense = 0;
            let cashBack = 0;
            transactions.forEach(transaction => {
                const { amount, cashbackRate } = transaction;
                if(amount >= 0){
                    deposit += amount;
                } else{
                    expense += Math.abs(amount);
                    cashBack += calCashBack(Math.abs(amount), cashbackRate);
                }
            })
            let balance = deposit - expense;
            userBalance.innerText = "$" + balance;
            userCashBack.innerText = "$" + cashBack;
            userExpense.innerText = "$" + expense;
        }
    )
}

function calCashBack(price, cashbackRate){
    return price * (cashbackRate / 100);
}


logoutButton.addEventListener("click", () => {
    // we will call logout endpoint
    // then we will delete token from localstorage
    // then we will redirect to login page
    axios.post("http://localhost:3001/api/auth/logout").then(
        data => {
            localStorage.removeItem("token");
            window.location.href = "./login.html";
        }
    ).catch((err) => {
        console.log(err);
    });
})
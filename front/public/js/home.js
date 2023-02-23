// get user info
let userName = document.getElementById("userName");
let userBalance = document.getElementById("userBalance");
let userCashBack = document.getElementById("userCashBack");
let userIncome = document.getElementById("userIncome");
let userExpense = document.getElementById("userExpense");

// add new transaction
let transactionItem = document.getElementById("transaction-item");
let transactionAmount = document.getElementById("transaction-amount");
let transactionCashBackRate = document.getElementById("transaction-cashBackRate");
let transactionCreateButton = document.getElementById("transaction-create-button");

//update user info
let updateUserName = document.getElementById("user-name");
let updateUserEmail = document.getElementById("user-email");
let updateUserIncome = document.getElementById("user-income");
let updateUserButton = document.getElementById("user-update-button");

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
            const { fullName, income, transactions } = data.data.user;

            userName.innerText = fullName;
            userIncome.innerText = "$" + income;
            
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
            userCashBack.innerText = "$" + Math.floor(cashBack * 100) / 100;
            userExpense.innerText = "$" + expense;
        }
    )
}

function calCashBack(price, cashbackRate){
    return price * (cashbackRate / 100);
}


function updateUser(fullName, email, income){
    let data = {};

    if(fullName !== ""){
        data.fullName = fullName;
    }
    if(email !== ""){
        data.email = email;
    }
    if(income !== ""){
        data.income = income;
    }

    axios.put("http://localhost:3001/update", data)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
}

function createTransaction(){
    if(transactionItem.value === "" ||
    transactionAmount.value === ""){
        alert("Please fill required inputs");
        return;
    }

    let data = {
        title: transactionItem.value,
        amount: transactionAmount.value,
        cashbackRate: transactionCashBackRate.value
    };

    axios.post("http://localhost:3001/api/transaction/", data)
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
}


updateUserButton.addEventListener("click", () => {
    updateUser(updateUserName.value, updateUserEmail.value, updateUserIncome.value);
    window.location.reload();
})



transactionCreateButton.addEventListener("click", () => {
    createTransaction();
    getMe();
    window.location.reload();
})


logoutButton.addEventListener("click", () => {
    axios.post("http://localhost:3001/api/auth/logout").then(
        data => {
            localStorage.removeItem("token");
            window.location.href = "./login.html";
        }
    ).catch((err) => {
        console.log(err);
    });
})
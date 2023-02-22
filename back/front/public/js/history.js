// show history
let historyField = document.getElementById("history-field");


// logout
let logoutButton = document.getElementById("logout");


let token = localStorage.getItem("token");

if(token){
    axios.defaults.headers.common["Authorization"] = `${token}`;
}




getHistory();


function getHistory(){
    axios.get("http://localhost:3001/me").then(
        data => {
            // console.log(data);
            const { transactions } = data.data.user;
            // console.log(transactions);
            transactions.forEach(transaction => {
                // const { title, amount } = transaction;
                historyField.innerHTML += 
                `
                <div class="container border-top border-bottom border-dark mb-3 pt-3 pb-3 d-flex gap-5 align-items-center">
                <div class="d-flex gap-5 me-auto">
                    <h2 id="${transaction._id}-name">${transaction.title}</h2>
                    <h2 id="${transaction._id}-amount">${transaction.amount}</h2>
                </div>
                <div>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary btn-lg me-4" data-bs-toggle="modal" data-bs-target="#${transaction._id}Modal">
                        Modify History
                    </button>
                    
                    <!-- Modal -->
                    <div class="modal fade" id="${transaction._id}Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modify History</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="mb-3">
                                    <label for="modify-${transaction._id}Name" class="form-label">Item</label>
                                    <input type="text" class="form-control" id="modify-${transaction._id}Name" placeholder="ex. Book">
                                </div>
                                <div class="mb-3">
                                    <label for="modify-${transaction._id}amount" class="form-label">Amount</label>
                                    <input type="email" class="form-control" id="modify-${transaction._id}amount" placeholder="ex. 500">
                                </div>
                                <div class="mb-3">
                                    <label for="modify-${transaction._id}cashBackRate" class="form-label">Cash Back Rate</label>
                                    <input type="password" class="form-control" id="modify-${transaction._id}cashBackRate" placeholder="ex. 3(%)">
                                </div>
                            </div>
                            <div class="modal-footer">
                            <button id="modify-${transaction._id}history-button" type="button" class="btn btn-primary">Modify History</button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                        </div>
                    </div>
    
                    <!-- Button trigger modal -->
                    <button type="button" id="delete-${transaction._id}button" class="btn btn-secondary btn-lg" data-bs-toggle="modal" data-bs-target="#${transaction._id}deleteModal">
                        Delete History
                    </button>
                    
                    <!-- Modal -->
                    <div class="modal fade" id="${transaction._id}deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Delete History</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h4>Are you sure to you want to delete?</h4>
                            </div>
                            <div class="modal-footer">
                            <button id="delete-${transaction._id}history-button" type="button" class="btn btn-primary px-4 me-4">Yes</button>
                            <button type="button" class="btn btn-secondary px-3" data-bs-dismiss="modal">No</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
                `;
            })
        }
    )
}




// Event listener for modify history button
historyField.addEventListener("click", (event) => {
    console.log("event", event);
  if (event.target.id.startsWith("modify-")) {
    const transactionId = event.target.id.split("-")[1];
    // console.log("transactionId", transactionId);
    const nameInput = document.getElementById(`modify-${transactionId}Name`);
    const amountInput = document.getElementById(`modify-${transactionId}amount`);
    const cashBackRateInput = document.getElementById(`modify-${transactionId}cashBackRate`);
    
    const name = nameInput.value;
    const amount = amountInput.value;
    const cashBackRate = cashBackRateInput.value;

    axios.put(`http://localhost:3001/api/transaction/${transactionId}`, {
      title: name,
      amount: amount,
      cashBackRate: cashBackRate
    }).then(data => {
      console.log(data);
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });
  }
});

// Event listener for delete history button
historyField.addEventListener("click", (event) => {
    if (event.target.id.startsWith("delete-")) {
      const transactionId = event.target.id.split("-")[1];
      console.log("transactionId", transactionId);
      axios.delete(`http://localhost:3001/api/transaction/${transactionId}`).then(data => {
        console.log(data);
        window.location.reload();
      }).catch(err => {
        console.log(err);
      });
    }
});
  




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
let balance = 10000;
let depositAmount = document.getElementById("depositamount");
let depositBtn = document.getElementById("depositBtn");
let withdrawAmount = document.getElementById("Withdrawlamount");
let withdrawBtn = document.getElementById("withdrawBtn");
let newbalance = document.getElementById("newbalance");
let newbalance2 = document.getElementById("newbalance2");
let balanceDisplay = document.getElementById("balance");

balanceDisplay.innerText = balance;

depositBtn.onclick = function () {
    let amount = Number(depositAmount.value);

    if (amount > 0) {
        balance += amount;

        newbalance.textContent =
            `${amount} deposited in your account. Your new balance is: ${balance}`;

        balanceDisplay.innerText = balance;
    }
    depositp.style.display = "block";
};

withdrawBtn.onclick = function () {
    let amount = Number(withdrawAmount.value);

    if (amount > 0 && amount <= balance) {
        balance -= amount;

        newbalance2.textContent =
            `${amount} withdrawn successfully. Your remaining balance is: ${balance}`;

        balanceDisplay.innerText = balance;
        
    } else {
        newbalance2.textContent = "Insufficient Balance";
        
    }
    
};
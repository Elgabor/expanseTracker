import { formatCurrency } from "./utils.js";

export function renderTransactionList(transactions) {
    let showDiv = document.getElementById('transaction-list');
    showDiv.innerHTML = '';
    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium">${transaction.description}</p>
            <p class="text-sm text-gray-500">${transaction.category} · ${transaction.date}</p>
          </div>
          <div class="${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'} font-semibold">
            €${transaction.amount.toFixed(2)}
          </div>
        </div>
      `;
      showDiv.appendChild(li);
      })
}
  
  export function updateBalanceUI(transactions) {
    let totalIncome = 0;
    let totalExpense = 0;
    let balance = 0;
    let elementBalance = document.getElementById('balance');
    let elementIncome = document.getElementById('income-total');
    let elementExpense = document.getElementById('expense-total');

    transactions.forEach(transaction => {
      if(transaction.type === 'income'){
        totalIncome += transaction.amount;
      }else{
        totalExpense += transaction.amount;
      }
    })
    balance = totalIncome - totalExpense;

    elementBalance.textContent = formatCurrency(balance);
    elementIncome.textContent = formatCurrency(totalIncome);
    elementExpense.textContent = formatCurrency(totalExpense);
  }


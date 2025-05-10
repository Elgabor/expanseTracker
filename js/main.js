import { getTransactionsFromStorage, saveTransactionsToStorage } from "./storage.js";
import { renderTransactionList, updateBalanceUI } from "./ui.js";

// Variabile globale per le transazioni
let transactions = [];

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  transactions = getTransactionsFromStorage();

  renderTransactionList(transactions);

  updateBalanceUI(transactions);

  let addTransaction = document.getElementById('transaction-form');
  console.log(addTransaction);
  function addTransactionFunction(){
    addTransaction.addEventListener('submit', e =>{
      e.preventDefault();
      const type = document.getElementById('type').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const category = document.getElementById('category').value;
      const date = document.getElementById('date').value;
      const description = document.getElementById('description').value;

      const newTransaction = {
        id: Date.now(),
        type,
        amount,
        category,
        date,
        description
      }

      transactions.push(newTransaction);
      saveTransactionsToStorage(transactions);
      e.target.reset();
      //Update and render
      renderTransactionList(transactions);
      updateBalanceUI(transactions);
    })
  }

  addTransactionFunction()
}



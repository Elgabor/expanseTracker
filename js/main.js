import { getTransactionsFromStorage, saveTransactionsToStorage } from "./storage.js";
import { renderTransactionList, updateBalanceUI } from "./ui.js";

// Variabile globale per le transazioni
let transactions = [];

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {


  //filter and function filter
  const filterCategory = document.getElementById('filter-category');
  const filterDate = document.getElementById('filter-date');

  function filterFunction(){
    const filterCategory = document.getElementById('filter-category');
    const filterDate = document.getElementById('filter-date');
    const valueCategory = filterCategory.value;  
    const valueDate = filterDate.value;
    let filteredTransactions = [...transactions];
    console.log(filteredTransactions);
    console.log(valueCategory);
    console.log(valueDate);
     // Filtra per categoria se non è "tutte"
     if (valueCategory && valueCategory !== 'tutte') {
          filteredTransactions = filteredTransactions.filter(
              transaction => transaction.category === valueCategory
          );
      }
  
      // Filtra per data se è stata selezionata
      if (valueDate) {
          filteredTransactions = filteredTransactions.filter(
              transaction => transaction.date === valueDate
          );
      }
  
      // Aggiorna la UI con le transazioni filtrate
      renderTransactionList(filteredTransactions);
      updateBalanceUI(filteredTransactions);
  }
  
  filterCategory.addEventListener('change', filterFunction);
  filterDate.addEventListener('change', filterFunction);


  transactions = getTransactionsFromStorage();

  renderTransactionList(transactions);

  updateBalanceUI(transactions);

  let addTransaction = document.getElementById('transaction-form');
  function addTransactionFunction(){
    addTransaction.addEventListener('submit', e =>{
      e.preventDefault();
      const type = document.getElementById('type').value;
      if (type !== 'income' && type !== 'expense') {
        document.getElementById('error-message').textContent = "Tipo di transazione non valido";
        return;
      }
      const amount = parseFloat(document.getElementById('amount').value);
      if(isNaN(amount) || amount < 0){
        document.getElementById('error-message').textContent = "Tipo di importo non valido";
        return;
      }
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



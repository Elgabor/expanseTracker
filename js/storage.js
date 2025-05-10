export function getTransactionsFromStorage() {
      if(localStorage.getItem('transactions') === null){
        return [];
      }else{
        let data = localStorage.getItem('transactions')
        return JSON.parse(data)
      }
  }
  
export function saveTransactionsToStorage(transactions) {
    // TODO: salva in localStorage
    let transactionsJson = JSON.stringify(transactions);
    localStorage.setItem('transactions', transactionsJson);
  }
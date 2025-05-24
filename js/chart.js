// Chart.js is now available globally

function processTransactions(transactions) {
    // Filtra solo le spese
    const expenses = transactions.filter(transaction => transaction.type === 'expense');
    
    // Inizializza un oggetto per tracciare i totali per categoria
    const categoryTotals = {
        cibo: 0,
        trasporto: 0,
        allestimento: 0,
        altro: 0
    };

    // Calcola i totali per categoria
    expenses.forEach(transaction => {
        const category = transaction.category;
        if (categoryTotals.hasOwnProperty(category)) {
            categoryTotals[category] += transaction.amount;
        } else {
            categoryTotals.altro += transaction.amount;
        }
    });

    // Prepara i dati per Chart.js
    return {
        labels: Object.keys(categoryTotals),
        data: Object.values(categoryTotals),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
    };
}

function processIncome(transactions) {
    const filteredTransactions = transactions.filter(transaction => transaction.type === 'income');
    return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
}

function initChart(transactions) {
    // Distruggi i grafici esistenti se presenti
    if (window.categoryChart) {
        window.categoryChart.destroy();
    }
    if (window.summaryChart) {
        window.summaryChart.destroy();
    }

    // Verifica se ci sono dati
    if (!transactions || transactions.length === 0) {
        console.log('Nessuna transazione disponibile');
        return;
    }

    // Ottieni i canvas
    const canvas_one = document.getElementById('category-chart');
    const canvas_two = document.getElementById('summary-chart');

    if (!canvas_one || !canvas_two) {
        console.error('Canvas non trovati');
        return;
    }

    // Prepara i dati
    const categoryData = processTransactions(transactions);
    const totalIncome = processIncome(transactions);
    const totalExpense = categoryData.data.reduce((sum, amount) => sum + amount, 0);

    // Crea il grafico delle categorie
    window.categoryChart = new Chart(canvas_one, {
        type: 'pie',
        data: {
            labels: categoryData.labels,
            datasets: [{
                data: categoryData.data,
                backgroundColor: categoryData.backgroundColor
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Spese per Categoria'
                }
            }
        }
    });

    // Crea il grafico del riepilogo
    window.summaryChart = new Chart(canvas_two, {
        type: 'doughnut',
        data: {
            labels: ['Entrate', 'Spese'],
            datasets: [{
                data: [totalIncome, totalExpense],
                backgroundColor: ['#4BC0C0', '#FF6384']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Entrate vs Spese'
                }
            }
        }
    });
}

export { processTransactions, processIncome, initChart };
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');

let expenses = [];

// Function to add expense
function addExpense(description, amount) {
  const expense = {
    id: Date.now(),
    description,
    amount: parseFloat(amount)
  };

  expenses.push(expense);

  renderExpenses();
  updateTotal();
}

// Function to delete expense
function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  renderExpenses();
  updateTotal();
}

// Function to render expenses
function renderExpenses() {
  expenseList.innerHTML = '';
  expenses.forEach(expense => {
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.innerHTML = `
      <strong>${expense.description}</strong>: $${expense.amount.toFixed(2)}
      <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
    `;
    expenseList.appendChild(expenseItem);
  });
}

// Function to update total expenses
function updateTotal() {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  totalDisplay.textContent = total.toFixed(2);
}

// Event listener for form submission
expenseForm.addEventListener('submit', e => {
  e.preventDefault();
  const description = document.getElementById('text').value.trim();
  const amount = document.getElementById('amount').value.trim();

  if (description && amount) {
    addExpense(description, amount);
    expenseForm.reset();
  } else {
    alert('Please fill in both fields.');
  }
});

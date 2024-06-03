// src/pages/Expenses.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const Expenses = ({ slotId }) => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [paidBy, setPaidBy] = useState('');

  const fetchExpenses = async () => {
    const expensesCollection = collection(db, 'expenses');
    const q = query(expensesCollection, where('slotId', '==', slotId));
    const expenseSnapshot = await getDocs(q);
    const expenseList = expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setExpenses(expenseList);
  };

  useEffect(() => {
    fetchExpenses();
  }, [slotId]);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    const expensesCollection = collection(db, 'expenses');
    await addDoc(expensesCollection, {
      slotId,
      amount: parseFloat(amount),
      description,
      paidBy,
      date: new Date(),
    });
    setAmount('');
    setDescription('');
    setPaidBy('');
    fetchExpenses();
  };

  return (
    <div>
      <h2>Expenses</h2>
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <input
          type="text"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          placeholder="Paid By"
          required
        />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            {expense.description}: ${expense.amount} paid by {expense.paidBy}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;

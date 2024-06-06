// ExpenseForm.jsx
import React, { useState } from 'react';

const ExpenseForm = ({ group, addExpense, handleSubmit }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(description, amount, paidBy);
    setDescription('');
    setAmount('');
    setPaidBy('');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
      </div>
      <div className="mb-4">
        <label htmlFor="paidBy" className="block text-gray-700 text-sm font-bold mb-2">Paid By</label>
        <select id="paidBy" value={paidBy} onChange={(e) => setPaidBy(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select...</option>
          {group && group.members && group.members.map(member => (
            <option key={member.id} value={member.id}>{member.displayName}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;

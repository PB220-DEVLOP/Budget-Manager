import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState({});

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const docRef = doc(db, 'groups', groupId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGroup(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching group: ', error);
      }
    };

    fetchGroup();
  }, [groupId]);

  useEffect(() => {
    if (group && group.members) {
      const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
      const sharePerPerson = totalExpenses / group.members.length;

      const userExpenses = group.members.reduce((acc, member) => {
        const paid = expenses.filter(expense => expense.paidBy === member.id).reduce((total, expense) => total + expense.amount, 0);
        const share = paid - sharePerPerson;
        acc[member.id] = share;
        return acc;
      }, {});

      setBalances(userExpenses);
    }
  }, [group, expenses]);

  const addExpense = (description, amount, paidBy) => {
    const newExpense = { description, amount: parseFloat(amount), paidBy };
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{group?.groupName}</h2>
        <div>
          {/* Expense Form */}
          <ExpenseForm group={group} addExpense={addExpense} />
        </div>
        {/* Display transactions */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Transactions</h3>
          <ul>
            {expenses.map((expense, index) => (
              <li key={index} className="mb-2">
                {group.members.find(member => member.id === expense.paidBy)?.displayName || expense.paidBy} paid ${expense.amount.toFixed(2)} for {expense.description}
              </li>
            ))}
          </ul>
        </div>
        {/* Display balances */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Balances</h3>
          <ul>
            {Object.entries(balances).map(([userId, balance]) => (
              <li key={userId} className={`mb-2 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {group.members.find(member => member.id === userId)?.displayName || userId}: {balance > 0 ? `receives $${balance.toFixed(2)}` : `owes $${(-balance).toFixed(2)}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ExpenseForm = ({ group, addExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(description, amount, paidBy);
    setDescription('');
    setAmount('');
    setPaidBy('');
  };

  return (
    <form onSubmit={handleSubmit}>
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

export default GroupDetails;

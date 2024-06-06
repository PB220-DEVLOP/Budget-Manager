import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { format, startOfDay, startOfWeek, startOfMonth, subDays } from 'date-fns';

const HistoryOfExpenses = () => {
  const { groupId } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'day', 'week', 'month'

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expensesQuery = query(collection(db, 'groups', groupId, 'expenses'));
        const expensesSnapshot = await getDocs(expensesQuery);
        const expensesData = expensesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setExpenses(expensesData);
        setFilteredExpenses(expensesData);
      } catch (error) {
        console.error('Error fetching expenses: ', error);
      }
    };

    fetchExpenses();
  }, [groupId]);

  useEffect(() => {
    const now = new Date();
    let filtered = [];

    if (filter === 'day') {
      filtered = expenses.filter(expense => expense.createdAt.toDate() >= startOfDay(now));
    } else if (filter === 'week') {
      filtered = expenses.filter(expense => expense.createdAt.toDate() >= startOfWeek(now, { weekStartsOn: 1 }));
    } else if (filter === 'month') {
      filtered = expenses.filter(expense => expense.createdAt.toDate() >= startOfMonth(now));
    } else {
      filtered = expenses;
    }

    setFilteredExpenses(filtered);
  }, [filter, expenses]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">History of Expenses</h2>
        <div className="mb-4">
          <label htmlFor="filter" className="block text-gray-700 text-sm font-bold mb-2">Filter</label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="all">All</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Transactions</h3>
          <ul>
            {filteredExpenses.map((expense, index) => (
              <li key={index} className="mb-2">
                {expense.paidBy} paid ₹{expense.amount.toFixed(2)} for {expense.description} on {format(expense.createdAt.toDate(), 'dd/MM/yyyy')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HistoryOfExpenses;

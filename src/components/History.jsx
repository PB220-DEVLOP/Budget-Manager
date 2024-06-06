// History.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

const History = () => {
  const { groupId } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('day'); // Default filter is by day

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactionsCollection = collection(db, 'transactions');
        const q = query(transactionsCollection, where('groupId', '==', groupId), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const transactionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTransactions(transactionsData);
      } catch (error) {
        console.error('Error fetching transactions: ', error);
      }
    };

    fetchTransactions();
  }, [groupId]);

  // Function to filter transactions by day, week, or month
  const handleFilterChange = async (newFilter) => {
    setFilter(newFilter);
    const transactionsCollection = collection(db, 'transactions');
    let start, end;

    switch (newFilter) {
      case 'day':
        start = new Date();
        end = new Date();
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case 'week':
        start = new Date();
        start.setHours(0, 0, 0, 0);
        const dayOfWeek = start.getDay();
        start.setDate(start.getDate() - dayOfWeek);
        end = new Date(start);
        end.setDate(end.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        break;
      case 'month':
        start = new Date();
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end = new Date(start);
        end.setMonth(end.getMonth() + 1);
        end.setDate(0);
        end.setHours(23, 59, 59, 999);
        break;
      default:
        return;
    }

    const q = query(transactionsCollection, where('groupId', '==', groupId), where('date', '>=', start), where('date', '<=', end), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    const transactionsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setTransactions(transactionsData);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">History of Transactions</h2>
        <div className="mb-4">
          <select
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
        <div>
          {/* Display transactions based on filter */}
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.id}>
                {/* Display transaction details */}
                <p>{transaction.amount} - {transaction.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default History;

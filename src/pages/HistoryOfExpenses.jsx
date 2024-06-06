import React, { useState, useEffect } from 'react';
import { db, auth } from "../firebase";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { format, startOfDay, startOfWeek, startOfMonth, subDays } from 'date-fns';

const HistoryOfExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState('day');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchExpenses(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchExpenses = async (currentUser) => {
    try {
      const expensesCollection = collection(db, "expenses");
      const q = query(expensesCollection, where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      const expensesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setExpenses(expensesData);
    } catch (error) {
      console.error("Error fetching expenses: ", error);
    }
  };

  const filterExpenses = () => {
    const now = new Date();
    switch (filter) {
      case 'day':
        return expenses.filter(expense => 
          expense.date.toDate() > startOfDay(subDays(now, 1))
        );
      case 'week':
        return expenses.filter(expense => 
          expense.date.toDate() > startOfWeek(subDays(now, 1))
        );
      case 'month':
        return expenses.filter(expense => 
          expense.date.toDate() > startOfMonth(subDays(now, 1))
        );
      default:
        return expenses;
    }
  };

  const searchedExpenses = filterExpenses().filter(expense =>
    expense.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return <div>Please log in to view your expenses.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">History of Expenses</h2>
        
        {/* Search input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filter">
            Filter by:
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="all">All</option>
          </select>
        </div>

        <ul>
          {searchedExpenses.map(expense => (
            <li key={expense.id} className="mb-4 p-4 bg-gray-200 rounded">
              <div className="font-bold">{expense.description}</div>
              <div>Amount: ₹{expense.amount}</div>
              <div>Date: {format(expense.date.toDate(), 'MM/dd/yyyy')}</div>
              <div>Paid By: {expense.paidBy}</div>
              {/* Fetch and display transaction data here */}
              <TransactionDetails expenseId={expense.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TransactionDetails = ({ expenseId }) => {
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const transactionDocRef = doc(db, 'groups', 'D6rMM9JNOY8wQX811Aof', 'expenses', expenseId);
        const transactionDoc = await getDoc(transactionDocRef);
        if (transactionDoc.exists()) {
          setTransaction(transactionDoc.data());
        } else {
          console.log('No such transaction document!');
        }
      } catch (error) {
        console.error('Error fetching transaction: ', error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchTransaction();
  }, [expenseId]);

  if (loading) {
    return <div>Loading transaction...</div>;
  }

  if (!transaction) {
    return <div>No transaction found</div>;
  }

  return (
    <div>
      <div>Transaction Description: {transaction.description}</div>
      <div>Transaction Amount: ₹{transaction.amount}</div>
      <div>Transaction Date: {format(transaction.date.toDate(), 'MM/dd/yyyy')}</div>
      <div>Transaction Paid By: {transaction.paidBy}</div>
      {/* Add more transaction details as needed */}
    </div>
  );
};

export default HistoryOfExpenses;

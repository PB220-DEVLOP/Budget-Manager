import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs, query } from 'firebase/firestore';

const HistoryOfExpenses = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const docRef = doc(db, 'groups', groupId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGroup(docSnap.data());
        } else {
          setError('No such group!');
        }
      } catch (error) {
        setError('Error fetching group: ' + error.message);
      }
    };

    fetchGroup();
  }, [groupId]);

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
      } catch (error) {
        setError('Error fetching expenses: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [groupId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!group) {
    return <div>No group data available.</div>;
  }

  if (!group.members) {
    return <div>No group members available.</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{group.groupName}</h2>
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Transactions</h3>
          <ul>
            {expenses.map((expense, index) => (
              <li key={index} className="mb-2">
                {group.members.find(member => member.id === expense.paidBy)?.displayName || expense.paidBy} paid ₹{expense.amount.toFixed(2)} for {expense.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HistoryOfExpenses;

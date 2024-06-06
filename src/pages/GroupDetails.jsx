
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import ExpenseForm from '../components/ExpenseForm';

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

  const addExpense = async (description, amount, paidBy) => {
    const newExpense = { description, amount: parseFloat(amount), paidBy };
    setExpenses([...expenses, newExpense]);
    // Save transaction data to Firestore
    try {
      const groupDocRef = doc(db, 'groups', groupId);
      await updateDoc(groupDocRef, {
        transactions: arrayUnion(newExpense)
      });
    } catch (error) {
      console.error('Error adding expense to Firestore: ', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{group?.groupName}</h2>
        <div>
          <ExpenseForm group={group} addExpense={addExpense} handleSubmit={addExpense} />
        </div>
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
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Balances</h3>
          <ul>
            {Object.entries(balances).map(([userId, balance]) => (
              <li key={userId} className={`mb-2 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {group.members.find(member => member.id === userId)?.displayName || userId}: {balance > 0 ? `receives ₹${balance.toFixed(2)}` : `owes ₹${(-balance).toFixed(2)}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;

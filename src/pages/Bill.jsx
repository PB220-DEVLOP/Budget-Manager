// src/pages/Bill.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Bill = ({ slotId }) => {
  const [bills, setBills] = useState([]);

  const calculateBill = async () => {
    const expensesCollection = collection(db, 'expenses');
    const q = query(expensesCollection, where('slotId', '==', slotId));
    const expenseSnapshot = await getDocs(q);
    const expenseList = expenseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const membersCollection = collection(db, 'members');
    const m = query(membersCollection, where('slotId', '==', slotId));
    const memberSnapshot = await getDocs(m);
    const memberList = memberSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const totalExpenses = expenseList.reduce((acc, expense) => acc + expense.amount, 0);
    const perMemberShare = totalExpenses / memberList.length;

    const memberExpenses = memberList.reduce((acc, member) => {
      acc[member.name] = expenseList
        .filter(expense => expense.paidBy === member.name)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return acc;
    }, {});

    const bill = memberList.map(member => ({
      name: member.name,
      owes: perMemberShare - memberExpenses[member.name],
    }));

    setBills(bill);
  };

  useEffect(() => {
    calculateBill();
  }, [slotId]);

  return (
    <div>
      <h2>Bill</h2>
      <ul>
        {bills.map(bill => (
          <li key={bill.name}>
            {bill.name} {bill.owes >= 0 ? 'owes' : 'should be reimbursed'} ${Math.abs(bill.owes).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bill;

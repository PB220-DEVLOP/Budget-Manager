import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [bills, setBills] = useState({});
  const [totalBill, setTotalBill] = useState(0);
  const [splitAmounts, setSplitAmounts] = useState({});

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

  const handleBillChange = (userId, index, amount) => {
    setBills((prevBills) => ({
      ...prevBills,
      [userId]: { ...(prevBills[userId] || {}), [index]: parseFloat(amount) }
    }));
  };

  const handleBillSplit = () => {
    if (group && group.members) {
      const totalBill = Object.values(bills).reduce((acc, val) => acc + Object.values(val).reduce((a, b) => a + b, 0), 0);
      const amountPerPerson = totalBill / group.members.length;

      const splitAmounts = group.members.reduce((acc, memberId) => {
        const amountPaid = Object.values(bills[memberId] || {}).reduce((a, b) => a + b, 0);
        const amountOwed = amountPaid - amountPerPerson;
        return { ...acc, [memberId]: amountOwed };
      }, {});

      setTotalBill(totalBill);
      setSplitAmounts(splitAmounts);
    }
  };

  const addAmount = (userId) => {
    setBills((prevBills) => ({
      ...prevBills,
      [userId]: { ...(prevBills[userId] || {}), [Object.keys(prevBills[userId] || {}).length]: '' }
    }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">{group?.groupName}</h2>
        <div>
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Email</th>
                {group && group.members && group.members.map((member) => (
                  <th key={member.id} className="border px-4 py-2">{member.email}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Add Amount</td>
                {group && group.members && group.members.map((member) => (
                  <td key={member.id} className="border px-4 py-2">
                    <button onClick={() => addAmount(member.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">+</button>
                  </td>
                ))}
              </tr>
              {group && group.members && (
                Array.from({ length: Math.max(...group.members.map(member => Object.keys(bills[member.id] || {}).length)), }).map((_, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2"></td>
                    {group.members.map((member) => (
                      <td key={member.id} className="border px-4 py-2">
                        <input
                          type="number"
                          value={bills[member.id]?.[index] || ''}
                          onChange={(e) => handleBillChange(member.id, index, e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <button
            onClick={handleBillSplit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Split Bill
          </button>
          {Object.keys(splitAmounts).length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Total Bill: ${totalBill.toFixed(2)}</h3>
              <h3 className="text-xl font-bold mb-2">Split Amounts</h3>
              <ul>
                {Object.entries(splitAmounts).map(([memberId, amount]) => (
                  <li key={memberId} className="mb-2">
                    {group.members.find((member) => member.id === memberId)?.email || memberId}{' '}
                    {amount < 0
                      ? `owes $${(-amount).toFixed(2)}`
                      : `is owed $${amount.toFixed(2)}`}
                  </li>
                ))}
              </ul>
              <h3 className="text-xl font-bold mb-2">Who Owes Whom</h3>
              <ul>
                {Object.entries(splitAmounts).flatMap(([payerId, payerAmount]) =>
                  Object.entries(splitAmounts).map(([payeeId, payeeAmount]) => {
                    if (payerId !== payeeId && payerAmount < 0 && payeeAmount > 0) {
                      const amount = Math.min(-payerAmount, payeeAmount);
                      return (
                        <li key={`${payerId}->${payeeId}`} className="mb-2">
                          {group.members.find((member) => member.id === payerId)?.email || payerId} owes{' '}
                          {group.members.find((member) => member.id === payeeId)?.email || payeeId}{' '}
                          ${amount.toFixed(2)}
                        </li>
                      );
                    }
                    return null;
                  })
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;

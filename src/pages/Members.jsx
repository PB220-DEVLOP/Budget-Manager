// src/pages/Members.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const Members = ({ slotId }) => {
  const [members, setMembers] = useState([]);
  const [memberName, setMemberName] = useState('');

  const fetchMembers = async () => {
    const membersCollection = collection(db, 'members');
    const q = query(membersCollection, where('slotId', '==', slotId));
    const memberSnapshot = await getDocs(q);
    const memberList = memberSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMembers(memberList);
  };

  useEffect(() => {
    fetchMembers();
  }, [slotId]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    const membersCollection = collection(db, 'members');
    await addDoc(membersCollection, { name: memberName, slotId });
    setMemberName('');
    fetchMembers();
  };

  return (
    <div>
      <h2>Members</h2>
      <form onSubmit={handleAddMember}>
        <input
          type="text"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          placeholder="Member Name"
          required
        />
        <button type="submit">Add Member</button>
      </form>
      <ul>
        {members.map(member => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Members;

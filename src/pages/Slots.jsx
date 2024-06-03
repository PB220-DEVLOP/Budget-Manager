// src/pages/Slots.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Slots = () => {
  const [slots, setSlots] = useState([]);
  const [slotName, setSlotName] = useState('');

  const fetchSlots = async () => {
    const slotsCollection = collection(db, 'slots');
    const slotSnapshot = await getDocs(slotsCollection);
    const slotList = slotSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSlots(slotList);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleCreateSlot = async (e) => {
    e.preventDefault();
    const slotsCollection = collection(db, 'slots');
    await addDoc(slotsCollection, { name: slotName });
    setSlotName('');
    fetchSlots();
  };

  return (
    <div>
      <h2>Slots</h2>
      <form onSubmit={handleCreateSlot}>
        <input
          type="text"
          value={slotName}
          onChange={(e) => setSlotName(e.target.value)}
          placeholder="Slot Name"
          required
        />
        <button type="submit">Create Slot</button>
      </form>
      <ul>
        {slots.map(slot => (
          <li key={slot.id}>{slot.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Slots;

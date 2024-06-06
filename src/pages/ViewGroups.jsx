// src/pages/ViewGroups.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ViewGroups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      const groupsCollection = collection(db, 'groups');
      const groupsSnapshot = await getDocs(groupsCollection);
      const groupsList = groupsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setGroups(groupsList);
    };

    fetchGroups();
  }, []);

  const goToGroupDetails = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Groups</h2>
        <ul>
          {groups.map(group => (
            <li
              key={group.id}
              className="mb-4 p-4 bg-gray-200 rounded cursor-pointer"
              onClick={() => goToGroupDetails(group.id)}
            >
              <div className="font-bold">{group.groupName}</div>
              <div>{group.groupImageURL && <img src={group.groupImageURL} alt={group.groupName} className="w-16 h-16 object-cover rounded-full" />}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewGroups;

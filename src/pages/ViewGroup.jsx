import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const ViewGroups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsCollection = collection(db, 'groups');
        const groupsSnapshot = await getDocs(groupsCollection);
        const groupsData = groupsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Fetched Groups:', groupsData); // Debugging log
        setGroups(groupsData);
      } catch (error) {
        console.error('Error fetching groups: ', error);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupClick = (groupId) => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">All Groups</h2>
        {groups.length > 0 ? (
          <ul>
            {groups.map(group => (
              <li
                key={group.id}
                className="cursor-pointer p-4 hover:bg-gray-200 rounded-md mb-2"
                onClick={() => handleGroupClick(group.id)}
              >
                {group.groupName}
              </li>
            ))}
          </ul>
        ) : (
          <p>No groups available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewGroups;

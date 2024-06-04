import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            displayName: data.displayName || `${data.firstName} ${data.lastName}`,
            email: data.email || '',
            firstName: data.firstName || '',
            ...data
          };
        }).filter(user => user.id !== currentUser.uid);
        console.log('Fetched Users:', usersData); // Debugging log
        setAllUsers(usersData);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleMemberChange = (user) => {
    setMembers(prevMembers => {
      if (prevMembers.find(member => member.id === user.id)) {
        return prevMembers.filter(member => member.id !== user.id);
      } else {
        return [...prevMembers, user];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (groupName.trim() === '' || members.length === 0) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const groupData = {
        groupName,
        members: members.map(member => ({
          id: member.id,
          displayName: member.displayName || '',
          email: member.email || '',
          firstName: member.firstName || ''
        })),
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'groups'), groupData);
      console.log('Document written with ID: ', docRef.id);
      navigate('/');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen m-0 p-0 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Create Group</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="groupName">
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Members</label>
            {allUsers.map(user => (
              <div key={user.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`user_${user.id}`}
                  value={user.id}
                  checked={members.some(member => member.id === user.id)}
                  onChange={() => handleMemberChange(user)}
                  className="mr-2"
                />
                <label htmlFor={`user_${user.id}`}>{user.displayName}</label>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;

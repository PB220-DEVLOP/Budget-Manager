import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Breadcrumb } from '../components/HomeData';

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
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 items-center ml-64">
      <div className="p-8 rounded-lg  w-full max-w-screen-md md:max-w-screen-lg lg:max-w-screen-2xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full mt-10 mb-10">
          <h2 className="text-2xl font-bold mb-6">Groups</h2>
          <Breadcrumb />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map(group => (
              <div
                key={group.id}
                className="p-4 bg-gray-200 rounded cursor-pointer"
                onClick={() => goToGroupDetails(group.id)}
              >
                <div className="font-bold">{group.groupName}</div>
                <div>
                  {group.groupImageURL && (
                    <img
                      src={group.groupImageURL}
                      alt={group.groupName}
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGroups;

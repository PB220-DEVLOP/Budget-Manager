import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaHistory, FaSignOutAlt, FaEye } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-center text-2xl font-bold border-b border-gray-700">
        Budget Manager
      </div>
      <nav className="flex-grow p-4">
        <ul>
          <li className="mb-4">
            <NavLink to="/create-group" className="flex items-center p-2 rounded hover:bg-gray-700" activeClassName="bg-gray-700">
              <FaPlus className="mr-3" />
              Create Group
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/view-groups" className="flex items-center p-2 rounded hover:bg-gray-700" activeClassName="bg-gray-700">
              <FaEye className="mr-3" />
              View Groups
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/history" className="flex items-center p-2 rounded hover:bg-gray-700" activeClassName="bg-gray-700">
              <FaHistory className="mr-3" />
              History of Transactions
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <NavLink to="/logout" className="flex items-center p-2 rounded hover:bg-gray-700" activeClassName="bg-gray-700">
          <FaSignOutAlt className="mr-3" />
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;

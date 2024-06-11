import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaHistory, FaSignOutAlt, FaEye, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col md:w-64">
      <div className="p-4 text-center text-2xl font-bold border-b border-gray-700 flex justify-between md:block">
        Budget Manager
        <button onClick={toggleNavbar} className="md:hidden focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className={`flex-grow p-4 md:block ${isOpen ? 'block' : 'hidden'}`}>
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
            <NavLink to="/groups/:groupId/history" className="flex items-center p-2 rounded hover:bg-gray-700" activeClassName="bg-gray-700">
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

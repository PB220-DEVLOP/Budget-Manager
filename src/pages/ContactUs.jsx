import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faDribbble, faGooglePlus, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Breadcrumb } from '../components/HomeData';
import { db } from '../firebase'; // Make sure to import your firebase config
import { collection, addDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [device, setDevice] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !device || !subject || !description) {
      setError('All fields are required');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'contactRequests'), {
        email,
        device,
        subject,
        description,
        attachment: attachment ? attachment.name : null,
        createdAt: new Date(),
      });

      toast.success('Request submitted successfully!');
      setEmail('');
      setDevice('');
      setSubject('');
      setDescription('');
      setAttachment(null);
    } catch (error) {
      setError('Error submitting request: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-start bg-black-200 sm:px-0 lg:ml-64 rounded">
      <div className="bg-gray-100 text-black rounded mb-4">
        <Breadcrumb />
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-stretch h-full w-full lg:space-x-8">
        <form onSubmit={handleSubmit} className="flex-grow bg-gray-100 text-black p-8 border border-gray-700 rounded lg:w-1/2 shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Submit a request</h1>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">Your email address:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-100 rounded shadow-sm p-2 border focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="device">Android/iPhone:</label>
            <select
              id="device"
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              className="w-full border-gray-100 rounded shadow-sm p-2 border focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">-</option>
              <option value="android">Android</option>
              <option value="iphone">iPhone</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="subject">Subject:</label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border-gray-300 rounded shadow-sm p-2 border focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-100 rounded shadow-sm p-2 h-32 border focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Attachments (optional)</label>
            <div className="border-dashed border-2 border-gray-300 rounded p-4 text-center cursor-pointer">
              <label htmlFor="file-upload" className="text-blue-500">
                <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                {attachment ? attachment.name : 'Add file or drop files here'}
              </label>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded shadow-md">
            Submit
          </button>
        </form>
        <div className="flex-grow bg-gray-100 text-black p-8 border border-gray-700 rounded lg:w-1/2 shadow-md">
          <h2 className="text-xl font-bold mb-4">Budget Management</h2>
          <p><strong>Email:</strong> budgetmanagement@gmail.com</p>
          <p><strong>Phone:</strong> +91-987-654-3210</p>
          <p><strong>Address:</strong> Padole Square</p>
          <p><strong>Hours of Operation:</strong> Monday to Saturday, 10:00 AM to 6:00 PM (EST)</p>
          <hr className="my-4 border-gray-500" />
          <div className="flex space-x-4 justify-center">
            <a href="https://www.facebook.com" className="text-blue-700 text-2xl"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://www.dribbble.com" className="text-orange-600 text-2xl"><FontAwesomeIcon icon={faDribbble} /></a>
            <a href="https://plus.google.com" className="text-red-700 text-2xl"><FontAwesomeIcon icon={faGooglePlus} /></a>
            <a href="https://www.twitter.com" className="text-blue-500 text-2xl"><FontAwesomeIcon icon={faTwitter} /></a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ContactUs;

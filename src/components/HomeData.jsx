import React from 'react';
import { FaEnvelope, FaCamera, FaFilter, FaCalendarAlt, FaChartBar, FaBook, FaClipboardList, FaChartLine } from 'react-icons/fa';
import helpImage from '../assets/img_moniter.png'; // Ensure the correct path to the image
import { Link } from 'react-router-dom';


export const Breadcrumb = () => (
    <nav className="bg-gray-200 p-3 rounded mb-4 mt-4 container mx-auto">
        <ol className="list-reset flex text-grey-dark">
            <li><Link to="/" className="text-blue-600 hover:text-blue-700">Home</Link></li>
            <li><span className="mx-2">/</span></li>
            <li><Link to="#" className="text-blue-600 hover:text-blue-700">Current Page</Link></li>
        </ol>
    </nav>
);

export const Card = ({ title, description, link }) => {
    // Split the description by ". " and filter out empty strings
    const descriptionLines = description.split('. ').filter(Boolean).map(line => line.trim());

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <div className="text-gray-700 mb-4">
                {descriptionLines.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </div>
            {/* <Link to={link} className="text-blue-500 hover:underline">Learn More</Link> */}
        </div>
    );
};

export const featuresData = [
    {
        icon: <FaEnvelope />,
        title: "Easy Content Access",
        description: "Weekly, Monthly total budgets are provided",
    },
    {
        icon: <FaCamera />,
        title: "Photo Save",
        description: "Save receipt or memories together",
    },
    {
        icon: <FaFilter />,
        title: "Reinforced Filter",
        description: "Review your transactions with more filtering options",
    },
    {
        icon: <FaCalendarAlt />,
        title: "Improved Calendar Visuals",
        description: "Review all your monthly transactions in one place",
    },
    {
        icon: <FaChartBar />,
        title: "Aesthetically Improved Charts",
        description: "Track expenses with enhanced charts.",
    },
    {
        icon: <FaBook />,
        title: "Easier Double-entry Booking",
        description: "Manage your savings, insurance, loans and real-estate",
    },
    {
        icon: <FaClipboardList />,
        title: "Advanced Budget Feature",
        description: "Set a monthly budget for each category",
    },
    {
        icon: <FaChartLine />,
        title: "Asset Graphs",
        description: "Review asset trend in your chart",
    },
];

export const Features = () => {
    return (
        <div className="container mx-auto py-12">
            <h1 className="text-center text-grey-150 text-5xl pt-2 mb-4 italic font-mono hover:shadow-sm shadow-lg rounded">Features</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuresData.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-full">
                        <div className="text-5xl text-blue-500 mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-800">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
export const Help = () => {
    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 py-16">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-lg mb-8">Need to ask us how to use? Simply get in touch with us.</p>

            <div className="flex flex-col md:flex-row items-center">
                <img src={helpImage} alt="Help Center" className="md:w-1/2 rounded-lg shadow-lg mb-8 md:mb-0 md:mr-8" />

                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-2">Money Manager Help Center</h2>
                    <p className="text-lg mb-4">You can find out regular update and user manuals.</p>
                    <a href="#" className="inline-block bg-red-500 text-white py-2 px-4 rounded-full shadow-lg">
                        Help Center
                    </a>
                </div>
            </div>
        </div>
    );
};

export const Footer = () => (
    <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
            <p>&copy; 2024 My App. All rights reserved.</p>
        </div>
    </footer>
);
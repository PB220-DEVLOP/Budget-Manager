import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import video1 from '../assets/1.mp4';
import video2 from '../assets/2.mp4';
import video3 from '../assets/3.mp4';
import { FaEnvelope, FaCamera, FaFilter, FaCalendarAlt, FaChartBar, FaBook, FaClipboardList, FaChartLine } from 'react-icons/fa';

// import Card from '../components/Card'; // Ensure the correct path to the Card component
// import Footer from './Footer'; // Ensure the correct path to the Footer component
// import Breadcrumb from './Breadcrumb'; // Ensure the correct path to the Breadcrumb component

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 ml-64">
      <div>
        <Breadcrumb />

        {/* Carousel */}
        <div className="mb-8">
          <Carousel>
            <Carousel.Item>
              <video className="d-block w-100" controls autoPlay loop>
                <source src={video1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <video className="d-block w-100" controls autoPlay loop>
                <source src={video2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <video className="d-block w-100" controls autoPlay loop>
                <source src={video3} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        {/* Cards */}
        <div className="container mx-auto mb-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card
              title="Group Importance of Budget Management"
              description="1) Financial Stability.. 2) Goal Achievement.. 3) Debt Reduction.. 4) Emergency Preparedness.. 5) Resource Allocation.. "
              link="/group/GROUP_ID_1"
            />
            <Card
              title="Key Components of Budget Management"
              description="1) Income Tracking.. 2) Expense Monitoring.. 3) Budget Planning.. 4) Savings and Investments.. 5) Debt Management.. 6) Review and Adjustment.. "
              link="/group/GROUP_ID_2"
            />
            <Card
              title="Steps to Effective Budget Management"
              description="1) Set Clear Goals.. 2) Track Spending.. 3) Create a Realistic Budget.. 4) Prioritize Spending.. 5) Automate Savings.. 6)Monitor and Review.. "
              link="/group/GROUP_ID_3"
            />
            <Card
              title="Tools for Budget Management"
              description="1) Budgeting Apps.. 2) Spreadsheets.. 3) Financial Software.. 4) Banking Tools.. "
              link="/group/GROUP_ID_4"
            />
          </div>
        </div>
        <div className="container mx-auto mb-0 ">
          <nav className="bg-gray-170 p-3 mb-4 pt-3 mt-4 container mx-auto shadow-lg">
            <Features/>
          </nav>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const Card = ({ title, description, link }) => {
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
      <Link to={link} className="text-blue-500 hover:underline">Learn More</Link>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-gray-800 text-white p-4">
    <div className="container mx-auto text-center">
      <p>&copy; 2024 My App. All rights reserved.</p>
    </div>
  </footer>
);

const Breadcrumb = () => (
  <nav className="bg-gray-200 p-3 rounded mb-4 mt-4 container mx-auto">
    <ol className="list-reset flex text-grey-dark">
      <li><Link to="/" className="text-blue-600 hover:text-blue-700">Home</Link></li>
      <li><span className="mx-2">/</span></li>
      <li><Link to="#" className="text-blue-600 hover:text-blue-700">Current Page</Link></li>
    </ol>
  </nav>
);

const featuresData = [
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

const Features = () => {
  return (
    <div className="container mx-auto py-12 ">
      <h1 className="text-center text-grey-150 text-5xl pt-2 mb-4 italic font-mono hover:shadow-sm shadow-lg rounded">Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {featuresData.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-full rounded-full">
            <div className="text-5xl text-blue-500 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-800">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

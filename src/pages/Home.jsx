import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import video1 from '../assets/1.mp4';
import video2 from '../assets/2.mp4';
import video3 from '../assets/3.mp4';
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
        <div className="container mx-auto mb-3">
          <nav className="bg-gray-200 p-3 rounded mb-4 mt-4 container mx-auto">
            <div class="grid grid-cols-9 grid-flow-col gap-4">
              <div>01</div>
              <div>02</div>
              <div>03</div>
              <div>04</div>
              <div>05</div>
              <div>06</div>
              <div>07</div>
              <div>08</div>
              <div>09</div>
            </div>
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

export default HomePage;

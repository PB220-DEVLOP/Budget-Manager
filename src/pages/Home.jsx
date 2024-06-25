import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import giffy from '../assets/bgtmnt.gif';
import img1 from '../assets/img_sreen_light1.png';
import img2 from '../assets/img_sreen_light2.png';
import img3 from '../assets/img_sreen_light3.png';
import img4 from '../assets/img_sreen_light4.png';
import img5 from '../assets/img_sreen_light5.png';
import img6 from '../assets/img_sreen_light6.png';
import img7 from '../assets/img_sreen_light7.png';
import img8 from '../assets/img_sreen_light8.png';
import {Breadcrumb, Card, Features, Help, Footer} from '../components/HomeData.jsx'// Ensure the correct path to the Help component

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 ml-64">
      <div>
        <Breadcrumb />

        {/* Carousel */}
        <div className="mb-8">
          <Carousel>
            <Carousel.Item>
              <img src={giffy} className="d-block w-100" alt="gif1"/>
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
            />
            <Card
              title="Key Components of Budget Management"
              description="1) Income Tracking.. 2) Expense Monitoring.. 3) Budget Planning.. 4) Savings and Investments.. 5) Debt Management.. 6) Review and Adjustment.. "
            />
            <Card
              title="Steps to Effective Budget Management"
              description="1) Set Clear Goals.. 2) Track Spending.. 3) Create a Realistic Budget.. 4) Prioritize Spending.. 5) Automate Savings.. 6)Monitor and Review.. "
            />
            <Card
              title="Tools for Budget Management"
              description="1) Budgeting Apps.. 2) Spreadsheets.. 3) Financial Software.. 4) Banking Tools.. "
            />
          </div>
        </div>
        <a href="#" className="text-blue-500 text-lg ml-4 shadow-lg">Learn More...</a>
        <div className="container mx-auto mb-0 ">
          <nav className="bg-gray-170 p-3 mb-4 pt-3 mt-4 container mx-auto shadow-lg">
            <Features />
          </nav>
        </div>
        {/* Carousel */}
        <div className="bg-grey-200 rounded-tl-xl container mx-auto py-12">
        <h1 className="text-center font-bold text-5xl bg-gray-300 pt-2 italic font-mono shadow-lg rounded-full">Future Scope</h1>
          <Carousel>
            <Carousel.Item>
              <img src={img1} className="w-25 d-inline items-center justify-center" alt="img1" />
              <img src={img2} className="w-25 d-inline items-center justify-center" alt="img2" />
              <img src={img3} className="w-25 d-inline items-center justify-center" alt="img3" />
              <img src={img4} className="w-25 d-inline items-center justify-center" alt="img4" />
              
            </Carousel.Item>
            <Carousel.Item>
              <img src={img5} className="w-25 d-inline items-center justify-center" alt="img5" />
              <img src={img6} className="w-25 d-inline items-center justify-center" alt="img6" />
              <img src={img7} className="w-25 d-inline items-center justify-center" alt="img7" />
              <img src={img8} className="w-25 d-inline items-center justify-center" alt="img8" />
              
            </Carousel.Item>
          </Carousel>
        </div>
        <Help/>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};


export default HomePage;

import React from 'react';

const HelpSupport = () => {
  return (
    <div className="min-h-screen flex flex-col justify-start bg-black-200 sm:px-0 lg:ml-64 rounded">
      <div className="bg-gray-200 text-black rounded mb-4">
        <div className="container mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Help and Support</h1>
            <p className="text-gray-600">Find help for your products and accounts, discover frequently asked questions, explore training, and contact support.</p>
          </div>
          <div className="mb-8">
            <div className="relative">
              <input type="text" placeholder="Try entering a transaction detail's" className="w-full p-3 border border-gray-300 rounded-lg" />
              <button className="absolute right-3 top-2.5 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l4-4 4 4m0 0l-4-4-4 4m4-4V4" />
                </svg>
              </button>
            </div>
          </div>
          <div className="mb-8">
            <div className="flex justify-center">
              <select className="p-3 border border-gray-500 rounded-lg mr-4">
                <option>Choose a Expenditure</option>
                <option>Room Rents</option>
                <option>Banquet Halls</option>
                <option>F & B Sales</option>
              </select>
              <button className="bg-black text-white p-3 rounded-lg">Go to Group's page</button>
            </div>
            <div className="text-center mt-4">
              <a href="#" className="text-blue-500">Show all products</a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="border border-blue-500 p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold mb-2">Budget Forecasting</h2>
              <p className="text-gray-600 mb-4">Generate balance sheets at the end of each financial year to assess income, expenditure, liabilities, and assets.
                Forecast budgets for the upcoming year to anticipate challenges, risks, and market trends.</p>
              <a href="#" className="text-blue-500">Go to help articles</a>
            </div>
            <div className="border p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold mb-2">Tracking Income and Expenditure</h2>
              <p className="text-gray-600 mb-4">Use accounting software to track every cent earned and spent.
                Monitor income sources (room rents, banquet halls, F&B sales) and expenses (salaries, vendor payments, interest, insurance).
                Regularly generate night audits and daily sales reports.</p>
              <a href="#" className="text-blue-500">Explore Income and Expenditure</a>
            </div>
            <div className="border p-6 rounded-lg text-center">
              <h2 className="text-xl font-semibold mb-2">Technological Innovations</h2>
              <p className="text-gray-600 mb-4">Leverage hotel accounting software with features like PMS integration, bill automation, and customizable financial reports.
                Nimble Property, a top accounting software in the USA, offers these capabilities</p>
              <a href="#" className="text-blue-500">Read our Innovations notes</a>
            </div>
          </div>
          <div className="border p-6 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Thomson Reuters Community</h2>
            <p className="text-gray-600 mb-4">Need more help? Join the Community to connect with peers and get answers to your questions. An account is required.</p>
            <button className="bg-blue-500 text-white p-3 rounded-lg">Visit the Community</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpSupport;

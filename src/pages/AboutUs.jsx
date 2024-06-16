import React, { useState } from 'react';

const FaqSection = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleCategory = () => {
    setOpenCategory(!openCategory);
    setOpenQuestion(null); // Close any open question when toggling the category
  };

  const toggleQuestion = (index) => {
    if (openQuestion === index) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(index);
    }
  };

  const faqs = [
    {
      question: "How do I create a budget in the Budget Manager?",
      answer: "To create a budget, navigate to the 'Budgets' tab and click 'Create New Budget'. Fill in the necessary details such as budget name, amount, and category."
    },
    {
      question: "Can I sync my bank accounts with Budget Manager?",
      answer: "Yes, you can sync your bank accounts by going to the 'Accounts' tab and selecting 'Sync Bank Account'. Follow the prompts to securely connect your bank."
    },
    {
      question: "How do I track my expenses?",
      answer: "You can track your expenses by entering them manually under the 'Transactions' tab or by syncing your bank accounts to automatically import your transactions."
    },
    {
      question: "Can I set up alerts for overspending?",
      answer: "Yes, you can set up alerts by going to the 'Settings' tab and enabling notifications. You can customize alerts for different categories and spending limits."
    },
    {
      question: "How do I generate a financial report?",
      answer: "To generate a financial report, navigate to the 'Reports' tab. Choose the type of report you need, set the date range, and click 'Generate Report'."
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes, we use advanced encryption and security protocols to ensure your financial data is safe and secure."
    },
    {
      question: "Can I share my budget with others?",
      answer: "You can share your budget by adding collaborators. Go to the 'Budgets' tab, select the budget you want to share, and click 'Add Collaborator'. Enter the email address of the person you want to share with."
    },
    {
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login page and click 'Forgot Password'. Enter your email address and follow the instructions to reset your password."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-start bg-gray-100 sm:px-0 lg:ml-64 rounded">
      <div className="bg-gray-200 text-black rounded mb-4">
        <div className="mx-auto p-6">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">Frequently Asked Questions</h2>
          <div className="bg-white shadow-md rounded-lg">
            <div className="border-b border-gray-200">
              <button
                className="w-full text-left p-4 font-medium text-lg text-blue-700"
                onClick={toggleCategory}
              >
                Budget Manager
              </button>
              {openCategory && (
                <div>
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-t border-gray-200">
                      <button
                        className="w-full text-left p-4 hover:bg-gray-100 flex items-center justify-between"
                        onClick={() => toggleQuestion(index)}
                      >
                        <span>{faq.question}</span>
                        <span>{openQuestion === index ? '-' : '+'}</span>
                      </button>
                      {openQuestion === index && (
                        <div className="p-4 text-gray-700">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <hr />
              <div className="p-4">
                <button className="mt-4 w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">
                  Ask a Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;

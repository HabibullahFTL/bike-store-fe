'use client';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const UnauthorizedWarning = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-12 max-w-lg w-full text-center space-y-5">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <svg
            className="w-10 h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Access Denied
        </h1>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
          {"You don't have permission to access this page."}
        </p>

        <Button
          asChild
          className="inline-flex font-medium transition-all duration-200 shadow-md hover:shadow-lg py-3 px-6 h-10 bg-red-500 hover:bg-red-600"
        >
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedWarning;

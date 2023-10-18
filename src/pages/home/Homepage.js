import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="px-6">
      <h1 className="block text-[28px] font-[800]">Home page</h1>
      <div className="my-4 flex items-center gap-4">
        <p className="underline">
          <Link to="/auth/signin">signin</Link>
        </p>
        <p className="underline">
          <Link to="/auth/signup">signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Homepage;
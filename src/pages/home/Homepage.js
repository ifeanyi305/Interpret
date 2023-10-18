import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <h1 className="block">Home page</h1>
      <p>
        <Link to="/auth/signin">signin</Link>
      </p>
      <p>
        <Link to="/auth/signup">signup</Link>
      </p>
    </div>
  );
};

export default Homepage;
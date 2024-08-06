/* eslint-disable no-unused-vars */

import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './components/Routes';

const App: React.FC = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/oauth2/authorization/azure';
  };

  return (
    <Router>
      <div>
        <nav>
          <button onClick={handleLogin}>Login</button>
          <Link to="/resource">Go to Resource</Link>
          <Link to="/profile">Go to Profile</Link>
        </nav>
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;

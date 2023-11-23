// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/sideBar';
import TopBar from './components/TopBar'
import Dashboard from './pages/dashboard';
import Accounts from './pages/dashboard'

function App() {
  return (
    <Router>
      <div className="App">
        <TopBar />
        <Sidebar />
        <Routes>
        <Route index element={<Dashboard />} /> {/* Set the default route to Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/accounts" element={<Dashboard />} />
          <Route path="/payroll" element={<Dashboard />} />
          <Route path="/reports" element={<Dashboard />} />
          <Route path="/advisor" element={<Dashboard />} />
          <Route path="/contract" element={<Dashboard />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

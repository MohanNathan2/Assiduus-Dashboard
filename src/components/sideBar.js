import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

const Sidebar = () => {
  const location = useLocation();

  const sidebarItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/accounts', label: 'Accounts', icon: 'account_balance_wallet' },
    { path: '/payroll', label: 'Payroll', icon: 'monetization_on' },
    { path: '/reports', label: 'Reports', icon: 'insert_chart_outlined' },
    { path: '/advisor', label: 'Advisor', icon: 'person' },
    { path: '/contract', label: 'Contract', icon: 'description' },
  ];

  return (
    <div className="sidebar">
      <ul>
        {sidebarItems.map((item) => (
          <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
            <Link to={item.path} className="sidebar-link">
              <i className="material-icons">{item.icon}</i>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

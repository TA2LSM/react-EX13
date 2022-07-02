import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SideBar from './sidebar';
import Users from './users';
import Posts from './posts';

const Dashboard = ({ match }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <SideBar />
      <Routes>
        <Route
          path='/users'
          element={<Users />}
        />
        <Route
          path='/posts'
          element={<Posts />}
        />
      </Routes>
    </div>
  );
};

export default Dashboard;

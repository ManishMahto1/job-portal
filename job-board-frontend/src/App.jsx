import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  {AuthProvider}  from './context/AuthContext';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Jobs from './pages/Jobs.jsx';
import JobDetail from './pages/JobDetail.jsx';
import Apply from './pages/Apply.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Applications from './pages/Applications.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetail />} />

            <Route
              path="/apply/:jobId"
              element={
                <PrivateRoute roles={['candidate']}>
                  <Apply />
                </PrivateRoute>} />

            <Route path="/dashboard"
              element={
                <PrivateRoute roles={['recruiter']}>
                  <Dashboard />
                </PrivateRoute>} />

            <Route path="/applications"
              element={
                <PrivateRoute roles={['candidate']}>
                  <Applications />
                </PrivateRoute>} />


            <Route path="/profile" 
            element={
            <PrivateRoute>
              <Profile />
              </PrivateRoute>} />
              
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { HiBriefcase, HiUser, HiLogout } from 'react-icons/hi';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '100%' },
  };

  const navLinks = [
    { to: '/jobs', text: 'Jobs', icon: <HiBriefcase className="mr-2" /> },
    ...(user?.role === 'recruiter'
      ? [{ to: '/dashboard', text: 'Dashboard', icon: <HiUser className="mr-2" /> }]
      : user?.role === 'candidate'
      ? [{ to: '/applications', text: 'Applications', icon: <HiBriefcase className="mr-2" /> }]
      : []),
    { to: '/profile', text: 'Profile', icon: <HiUser className="mr-2" /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-shrink-0"
          >
            <Link
              to="/"
              className="text-white text-2xl font-bold flex items-center hover:text-blue-100 transition-colors"
            >
              <HiBriefcase className="mr-2" />
              JobHub
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.div
                  key={link.to}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={link.to}
                    className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                  >
                    {link.icon}
                    {link.text}
                  </Link>
                </motion.div>
              ))}
              {user ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="text-white hover:text-red-200 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
                >
                  <HiLogout className="mr-2" />
                  Logout
                </motion.button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-200 focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        className="md:hidden fixed top-16 right-0 bottom-0 w-64 bg-white shadow-xl z-50"
      >
        <div className="px-4 py-8 space-y-6">
          {navLinks.map((link) => (
            <motion.div
              key={link.to}
              whileHover={{ scale: 1.02 }}
              className="border-b border-gray-100"
            >
              <Link
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                {link.icon}
                {link.text}
              </Link>
            </motion.div>
          ))}
          {user ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleLogout}
              className="w-full text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <HiLogout className="mr-2" />
              Logout
            </motion.button>
          ) : (
            <div className="space-y-4">
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </nav>
  );
}

export default Navbar;
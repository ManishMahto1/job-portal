import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiBriefcase, FiUsers, FiAward, FiArrowRight } from 'react-icons/fi';

function Home() {
  const stats = [
    { number: '50K+', label: 'Jobs Available', icon: <FiBriefcase /> },
    { number: '10K+', label: 'Companies Hiring', icon: <FiUsers /> },
    { number: '95%', label: 'Success Rate', icon: <FiAward /> }
  ];

  const categories = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Marketing',
    'Engineering'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6 leading-tight"
          >
            Find Your Dream Tech Job
          </motion.h1>
          <p className="text-xl mb-8 text-blue-100">
            Connect with innovative companies and take your career to the next level
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                to="/jobs" 
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-opacity-90 transition-all"
              >
                <FiSearch className="text-xl" />
                Search Jobs
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link 
                to="/dashboard" 
                className="border-2 border-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-white hover:text-blue-600 transition-all"
              >
                <FiBriefcase className="text-xl" />
                Post a Job
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-600 text-3xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <motion.div 
                key={category}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-xl text-center cursor-pointer hover:shadow-md transition-all"
              >
                <div className="text-blue-600 text-2xl mb-2">
                  <FiBriefcase />
                </div>
                <div className="font-medium">{category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((step) => (
            <motion.div 
              key={step}
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4">
                {step}
              </div>
              <h3 className="text-xl font-semibold mb-4">Step {step}</h3>
              <p className="text-gray-600">
              Begin by building a detailed profile that highlights your unique skills, experiences, and career aspirations. 
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join thousands of professionals who found their dream jobs through us</p>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link 
              to="/register" 
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold inline-flex items-center gap-2 hover:bg-opacity-90 transition-all"
            >
              Create Free Account
              <FiArrowRight className="text-xl" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
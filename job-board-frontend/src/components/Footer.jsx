import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiMail, FiPhone, FiMapPin,FiBriefcase } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-purple-800 text-white pt-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Branding Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FiBriefcase className="text-white" />
              JobHub
            </h2>
            <p className="text-gray-300 text-sm">
              Connecting talent with opportunity. Find your dream job or perfect candidate with us.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition">
                <FiFacebook className="text-xl" />
              </a>
              <a href="#" className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition">
                <FiLinkedin className="text-xl" />
              </a>
              <a href="#" className="p-2 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition">
                <FiInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <FiMapPin className="flex-shrink-0" />
                123 Career Street, Tech Valley, TV 45678
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="flex-shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="flex-shrink-0" />
                support@jobhub.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to our newsletter for the latest jobs and career tips
            </p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-transparent focus:border-white focus:outline-none"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-white text-blue-800 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white border-opacity-20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
            <div className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} JobHub. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-white transition">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
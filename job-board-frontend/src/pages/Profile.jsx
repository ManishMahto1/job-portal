import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import * as authService from '../services/authService.js';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiBriefcase, FiLock, FiCalendar, FiEdit, FiSave } from 'react-icons/fi';
import { toast } from '../utils/toast.js';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [password, setPassword] = useState({ current: '', new: '' });

  useEffect(() => {
    authService.getMe().then(data => {
      setProfile(data);
      setFormData(data);
    });
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await authService.updateProfile(formData);
      setProfile(updatedUser);
      updateUser(updatedUser);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await authService.changePassword(password);
      setPassword({ current: '', new: '' });
      toast.success('Password changed successfully!');
    } catch (err) {
      toast.error('Failed to change password');
    }
  };

  if (!profile) return (
    <div className="animate-pulse max-w-2xl mx-auto p-6 space-y-6">
      <div className="h-48 bg-gray-200 rounded-xl"></div>
      <div className="h-12 bg-gray-200 rounded-lg w-1/2"></div>
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
              <FiUser className="w-12 h-12 text-blue-600" />
            </div>
            <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors">
              <FiEdit className="text-blue-600" />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{profile.name || 'Your Name'}</h1>
            <p className="flex items-center gap-2 mt-2">
              <FiBriefcase />
              {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FiUser className="text-blue-600" />
            Personal Information
          </h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            {isEditing ? <FiSave /> : <FiEdit />}
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
              <input
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
              <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50">
                <FiMail className="text-gray-400" />
                <span className="text-gray-600">{profile.email}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Member Since</label>
              <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50">
                <FiCalendar className="text-gray-400" />
                <span className="text-gray-600">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            {profile.role === 'candidate' && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Skills</label>
                <input
                  value={formData.skills?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(', ') })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={!isEditing}
                />
              </div>
            )}
            {profile.role === 'recruiter' && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Company</label>
                <input
                  value={formData.company || ''}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={!isEditing}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Security Section */}
      <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
          <FiLock className="text-blue-600" />
          Security
        </h2>
        
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={password.current}
                onChange={(e) => setPassword({ ...password, current: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password.new}
                onChange={(e) => setPassword({ ...password, new: e.target.value })}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <FiSave />
            Change Password
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;
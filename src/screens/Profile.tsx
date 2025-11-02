import React from 'react';
import { User, Mail, Briefcase, Calendar, MapPin, Edit } from 'lucide-react';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 p-6 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="flex flex-col items-center">
          <img
            src="https://ui-avatars.com/api/?name=Bharath+Pallem&background=FFD700&color=000&size=100"
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-md mb-3"
          />
          <h2 className="text-2xl font-bold text-gray-800">Bharath Pallem</h2>
          <p className="text-gray-600">Finance & App Developer</p>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <User size={20} className="text-yellow-600" />
            <span><strong>Username:</strong> bharath_p</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail size={20} className="text-yellow-600" />
            <span><strong>Email:</strong> bharath@example.com</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Briefcase size={20} className="text-yellow-600" />
            <span><strong>Role:</strong> App Builder / Developer</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <MapPin size={20} className="text-yellow-600" />
            <span><strong>Location:</strong> Andhra Pradesh, India</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <Calendar size={20} className="text-yellow-600" />
            <span><strong>Joined:</strong> November 2025</span>
          </div>
        </div>

        {/* Edit Button */}
        <button className="mt-6 w-full flex justify-center items-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition-colors">
          <Edit size={18} className="mr-2" /> Edit Profile
        </button>
      </div>
    </div>
  );
}

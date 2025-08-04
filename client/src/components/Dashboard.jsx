import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Dashboard Header */}
        <div className="backdrop-blur-md bg-white/20 dark:bg-gray-900/20 p-8 md:p-12 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-blue-500/5 to-purple-500/10 dark:from-teal-400/10 dark:via-blue-400/5 dark:to-purple-400/10"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 dark:from-teal-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
              Welcome to Your Dashboard
            </h1>
            
            {user && (
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-300/50 dark:border-gray-600/50 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Hello, {user.firstName} {user.lastName}!
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Welcome to HackFest 2025. Your dashboard is being prepared with exciting features!
                </p>
              </div>
            )}
            
            {/* Dashboard Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  ),
                  title: 'My Events',
                  description: 'View and manage your registered events',
                  status: 'Coming Soon'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ),
                  title: 'Team Management',
                  description: 'Create and manage your hackathon teams',
                  status: 'Coming Soon'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ),
                  title: 'Achievements',
                  description: 'Track your hackathon progress and awards',
                  status: 'Coming Soon'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 11-4 0 2 2 0 014 0zm0 0c0 1.1.9 2 2 2h4a2 2 0 002-2 2 2 0 00-2-2h-4a2 2 0 00-2 2z" />
                    </svg>
                  ),
                  title: 'Profile Settings',
                  description: 'Update your profile and preferences',
                  status: 'Coming Soon'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: 'Analytics',
                  description: 'View your participation statistics',
                  status: 'Coming Soon'
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  ),
                  title: 'Messages',
                  description: 'Chat with organizers and team members',
                  status: 'Coming Soon'
                }
              ].map((feature, index) => (
                <div key={index} className="backdrop-blur-md bg-white/20 dark:bg-gray-900/20 p-6 rounded-2xl border border-white/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-900/30 transition-all duration-300 transform hover:scale-105">
                  <div className="text-teal-600 dark:text-teal-400 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {feature.description}
                  </p>
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-full">
                    {feature.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

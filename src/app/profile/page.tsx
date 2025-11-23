'use client';

import { useProfile } from '@/features/auth/hooks/useProfile';
import { LoadingErrorState } from '@/components/common/LoadingErrorState';
import { Mail, User as UserIcon, Edit } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { profile } = useProfile();

  if (profile.isLoading) {
    return <LoadingErrorState status="loading" message="Loading profile..." />;
  }

  if (profile.isError || !profile.data) {
    return <LoadingErrorState status="error" message="Failed to load profile" />;
  }

  const user = profile.data;

  return (
    <div className="py-4 sm:py-8 max-w-3xl mx-auto px-4 sm:px-6 transition-colors duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
        {/* Header */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-linear-to-r from-indigo-600 to-purple-600">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-md shrink-0">
              <span className="text-3xl sm:text-4xl font-bold text-indigo-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-white text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">{user.name}</h1>
              <p className="text-sm sm:text-base text-indigo-100 mb-2 break-all">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs sm:text-sm font-medium">
                {user.role === 'admin' ? 'Administrator' : 'User'}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
              Profile Information
            </h2>
            <Link
              href="/profile/edit"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </Link>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/40 rounded-lg transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center shrink-0">
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">Full Name</p>
                <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {user.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/40 rounded-lg transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">Email Address</p>
                <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 break-all">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

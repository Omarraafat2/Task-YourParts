'use client';

import { useProfile } from '@/features/auth/hooks/useProfile';
import { LoadingErrorState } from '@/components/common/LoadingErrorState';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '@/lib/validators/profileSchema';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditProfilePage() {
  const { profile, updateProfile } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile.data ? {
      name: profile.data.name,
      email: profile.data.email,
    } : undefined,
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfile.mutate(data);
  };

  if (profile.isLoading) {
    return <LoadingErrorState status="loading" message="Loading profile..." />;
  }

  if (profile.isError || !profile.data) {
    return <LoadingErrorState status="error" message="Failed to load profile" />;
  }

  return (
    <div className="py-4 sm:py-8 max-w-2xl mx-auto px-4 sm:px-6 transition-colors duration-200">
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        Back to Profile
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700 transition-colors">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Edit Profile
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
          Update your personal information
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              {...register('name')}
              type="text"
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-base"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors text-base"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <button
              type="submit"
              disabled={updateProfile.isPending}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              href="/profile"
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center text-sm sm:text-base"
            >
              Cancel
            </Link>
          </div>

          {/* Error Message */}
          {updateProfile.isError && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
              <p className="text-sm sm:text-base text-red-600 dark:text-red-300">
                {updateProfile.error.message}
              </p>
            </div>
          )}

          {/* Success Message */}
          {updateProfile.isSuccess && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
              <p className="text-sm sm:text-base text-green-600 dark:text-green-300">
                Profile updated successfully!
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
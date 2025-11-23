'use client';

import Link from 'next/link';
import { useProfile } from '@/features/auth/hooks/useProfile';
import { User, LogOut, Settings, ChevronDown, Menu, X, BookOpen, Home } from 'lucide-react';
import { useState } from 'react';
import { DarkModeToggle } from '@/components/common/DarkModeToggle';

export function Navbar() {
  const { profile, logout, isLoggingOut } = useProfile();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const user = profile.data;

  const handleLogout = () => {
    setShowProfileMenu(false);
    setShowMobileMenu(false);
    logout();
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 shrink-0"
            onClick={closeMobileMenu}
          >
            BookShop
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {user && (
              <>
                <Link 
                  href="/" 
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  Books Shop
                </Link>
                <Link 
                  href="/my-books" 
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  My Books
                </Link>
              </>
            )}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <DarkModeToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  disabled={isLoggingOut}
                >
                  <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>

                {showProfileMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowProfileMenu(false)}
                    />
                    
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <User className="w-4 h-4" />
                          <span className="text-sm font-medium">My Profile</span>
                        </Link>

                        <Link
                          href="/profile/edit"
                          className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span className="text-sm font-medium">Edit Profile</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile: Dark Mode + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <DarkModeToggle />
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 animate-in slide-in-from-top duration-200">
            {user ? (
              <>
                {/* User Info Card */}
                <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-12 h-12 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white font-semibold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="space-y-1">
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <Home className="w-5 h-5" />
                    <span className="font-medium">Books Shop</span>
                  </Link>

                  <Link
                    href="/my-books"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="font-medium">My Books</span>
                  </Link>

                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">My Profile</span>
                  </Link>

                  <Link
                    href="/profile/edit"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={closeMobileMenu}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Edit Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">
                      {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="block px-4 py-3 bg-indigo-600 dark:bg-indigo-500 text-white text-center rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors font-medium"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
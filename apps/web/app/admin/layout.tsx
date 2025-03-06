'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, signOut } from '@/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState('');

  // Set current path on client side
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Check authentication on load
  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getCurrentUser();
        if (!user && currentPath !== '/admin/login') {
          router.push('/admin/login');
        } else {
          setIsAuthenticated(!!user);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        if (currentPath !== '/admin/login') {
          router.push('/admin/login');
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (currentPath) {
      checkAuth();
    }
  }, [currentPath, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Don't show layout on login page
  if (currentPath === '/admin/login') {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // This should not render as the useEffect will redirect
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-lg font-bold">Admin Dashboard</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a
                  href="/admin/jobs"
                  className={`inline-flex items-center border-b-2 ${
                    currentPath === '/admin/jobs'
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } px-1 pt-1 text-sm font-medium`}
                >
                  Jobs
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
} 
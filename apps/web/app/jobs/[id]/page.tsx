'use client';

import { useState, useEffect } from 'react';
import { NavBar } from '@/components/nav-bar';
import { Footer } from '@/components/footer';
import { Job } from '@/types/job';
import Link from 'next/link';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJob() {
      try {
        const response = await fetch(`/api/jobs/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Job not found');
          }
          throw new Error('Failed to fetch job');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        console.error('Error loading job:', err);
        setError((err as Error).message || 'Failed to load job. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [params.id]);

  return (
    <>
      <NavBar />
      <main className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600">Loading job details...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-6">{error}</p>
              <Link
                href="/#jobs"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Back to All Jobs
              </Link>
            </div>
          ) : job ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden p-8 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                  <p className="text-gray-600 text-lg mb-1">{job.location}</p>
                  <p className="text-gray-500">{job.date} • {job.type}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 mt-4 md:mt-0">
                  {job.category}
                </span>
              </div>
              
              <hr className="my-6" />
              
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <p className="whitespace-pre-line">{job.description}</p>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4">
                <Link
                  href="/#jobs"
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full sm:w-auto"
                >
                  Back to All Jobs
                </Link>
                
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-full sm:w-auto"
                >
                  Apply for this Job
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-6">Job not found.</p>
              <Link
                href="/#jobs"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Back to All Jobs
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
} 
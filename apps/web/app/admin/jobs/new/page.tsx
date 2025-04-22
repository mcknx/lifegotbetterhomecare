'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createJob } from '@/lib/api';
import Link from 'next/link';
import { Job } from '@/types/job'; // Import Job type

export default function NewJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Updated state to match Job type structure
  const [formData, setFormData] = useState<Partial<Omit<Job, 'id' | 'created_at' | 'updatedAt'>>> ({
    title: '',
    location: '',
    company: '', 
    employmentType: '', 
    summary: '',
    reportsTo: '',
    qualifications: [], 
    responsibilities: [], 
  });
  // State for array fields as strings
  const [qualificationsStr, setQualificationsStr] = useState('');
  const [responsibilitiesStr, setResponsibilitiesStr] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'qualifications') {
      setQualificationsStr(value);
    } else if (name === 'responsibilities') {
      setResponsibilitiesStr(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simple validation for essential fields
    if (!formData.title || !formData.location || !formData.company) {
      setError('Please fill in Job Title, Location, and Company fields');
      setLoading(false);
      return;
    }

    try {
      const qualificationsArray = qualificationsStr.split('\n').filter(q => q.trim() !== '');
      const responsibilitiesArray = responsibilitiesStr.split('\n').filter(r => r.trim() !== '');
      const now = new Date().toISOString();

      // Construct payload matching Omit<Job, 'id'>
      const payload: Omit<Job, 'id'> = {
        title: formData.title || '',
        location: formData.location || '',
        company: formData.company || '', // Added company
        employmentType: formData.employmentType || '', // Changed from type
        summary: formData.summary || '', // Added summary
        reportsTo: formData.reportsTo || '', // Added reportsTo
        qualifications: qualificationsArray, // Use array
        responsibilities: responsibilitiesArray, // Use array
        created_at: now, // Add timestamp
        updatedAt: now, // Add timestamp
      };

      console.log("Creating new job with payload:", payload);
      const newJob = await createJob(payload);

      if (newJob) {
        router.push('/admin/jobs');
      } else {
        throw new Error('API returned null, failed to create job');
      }
    } catch (err: any) {
      setError(`Failed to create job: ${err.message || 'Unknown error'}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Job</h1>
        <Link
          href="/admin/jobs"
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Back to Jobs
        </Link>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 p-4 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Title */}
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Company */}
             <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Employment Type */}
            <div>
              <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
                Employment Type
              </label>
              <input
                type="text"
                id="employmentType"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                placeholder="e.g., Full-Time / Part-Time"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

             {/* Reports To */}
             <div>
              <label htmlFor="reportsTo" className="block text-sm font-medium text-gray-700 mb-1">
                Reports To
              </label>
              <input
                type="text"
                id="reportsTo"
                name="reportsTo"
                value={formData.reportsTo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Summary */}
            <div className="col-span-2">
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                Summary
              </label>
              <textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>

             {/* Qualifications */}
            <div className="col-span-2">
              <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">
                Qualifications (one per line)
              </label>
              <textarea
                id="qualifications"
                name="qualifications"
                value={qualificationsStr}
                onChange={handleTextAreaChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>

            {/* Responsibilities */}
            <div className="col-span-2">
              <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700 mb-1">
                Responsibilities (one per line)
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                value={responsibilitiesStr}
                onChange={handleTextAreaChange}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              {loading ? 'Saving...' : 'Save Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
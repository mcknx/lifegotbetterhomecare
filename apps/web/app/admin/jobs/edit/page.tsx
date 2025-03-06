'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getJobById, updateJob } from '@/lib/api';
import Link from 'next/link';
import { Job } from '@/types/job';

export default function EditJobPage() {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    date: '',
    type: '',
    category: '',
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setId(urlParams.get('id'));
  }, []);

  useEffect(() => {
    if (!id) {
      setError('No job ID provided');
      setLoading(false);
      return;
    }
    
    loadJob(id);
  }, [id]);

  async function loadJob(jobId: string) {
    try {
      const job = await getJobById(jobId);
      if (!job) {
        setError('Job not found');
        return;
      }

      // Convert date format for the input field
      let dateForInput = '';
      try {
        const date = new Date(job.date);
        if (!isNaN(date.getTime())) {
          dateForInput = date.toISOString().split('T')[0];
        }
      } catch (e) {
        console.error('Date parsing error:', e);
        dateForInput = job.date;
      }

      setFormData({
        ...job,
        date: dateForInput
      });
    } catch (err) {
      setError('Failed to load job');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setSaving(true);
    setError(null);

    try {
      // Format the date for display if it's in the ISO format
      let formattedDate = formData.date;
      if (formData.date.includes('-')) {
        const dateObj = new Date(formData.date);
        const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        formattedDate = dateObj.toLocaleDateString('en-US', options);
      }

      const updated = await updateJob(id, {
        ...formData,
        date: formattedDate
      });

      if (updated) {
        router.push('/admin/jobs');
      } else {
        throw new Error('Failed to update job');
      }
    } catch (err) {
      setError('Failed to update job');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error && !formData.title) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Job</h1>
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
            <div className="col-span-2">
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

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select a category</option>
                <option value="RN">RN</option>
                <option value="CNA">CNA</option>
                <option value="CBRF">CBRF</option>
                <option value="LPN">LPN</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Employment Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>

            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              {saving ? 'Saving...' : 'Update Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
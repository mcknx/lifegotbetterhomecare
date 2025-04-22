'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { getJobById, updateJob, createJob } from '@/lib/api';
import Link from 'next/link';
import { Job } from '@/types/job';

// Helper to format date string
const formatDateForDisplay = (dateString: string | undefined): string => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    console.error('Error formatting date:', e);
    return dateString; // Return original if formatting fails
  }
};

function EditJobFormContent() {
  const { useSearchParams } = require('next/navigation');
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingAsNew, setSavingAsNew] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    location: '',
    company: '',
    employmentType: '',
    summary: '',
    qualifications: [],
    responsibilities: [],
    reportsTo: '',
  });
  const [qualificationsStr, setQualificationsStr] = useState('');
  const [responsibilitiesStr, setResponsibilitiesStr] = useState('');
  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    if (id) {
      loadJob(id);
    } else {
      setError('No job ID provided in URL');
      setLoading(false);
    }
  }, [id]);

  function populateForm(loadedJob: Job) {
    setFormData({
      title: loadedJob.title || '',
      location: loadedJob.location || '',
      company: loadedJob.company || '',
      employmentType: loadedJob.employmentType || '',
      summary: loadedJob.summary || '',
      reportsTo: loadedJob.reportsTo || '',
    });
    setQualificationsStr(loadedJob.qualifications?.join('\n') || '');
    setResponsibilitiesStr(loadedJob.responsibilities?.join('\n') || '');
    setDisplayDate(formatDateForDisplay(loadedJob.created_at));
  }

  async function loadJob(jobId: string) {
    setLoading(true);
    setError(null);
    try {
      const loadedJob = await getJobById(jobId);
      if (!loadedJob) {
        setError('Job not found');
        return;
      }
      populateForm(loadedJob);
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
    if (!id) {
      setError('Cannot save job without an ID.');
      return;
    }
    setSaving(true);
    setError(null);

    try {
      const qualificationsArray = qualificationsStr.split('\n').filter(q => q.trim() !== '');
      const responsibilitiesArray = responsibilitiesStr.split('\n').filter(r => r.trim() !== '');

      const payload: Partial<Job> = {
        ...formData,
        qualifications: qualificationsArray,
        responsibilities: responsibilitiesArray,
      };

      // Remove fields that shouldn't be sent or are handled separately
      delete payload.created_at;
      delete payload.updatedAt;
      delete payload.id;

      const updated = await updateJob(id, payload);

      if (updated) {
        router.push('/admin/jobs'); // Navigate back to the list on success
      } else {
        throw new Error('API returned null, update likely failed');
      }
    } catch (err: any) {
      setError(`Failed to update job: ${err.message || 'Unknown error'}`);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // Handler for the "Save as New" button
  const handleSaveAsNew = async () => {
    if (!id) {
      setError('Cannot copy job without an original ID loaded.');
      return;
    }
    setSavingAsNew(true);
    setError(null);

    try {
      const qualificationsArray = qualificationsStr.split('\n').filter(q => q.trim() !== '');
      const responsibilitiesArray = responsibilitiesStr.split('\n').filter(r => r.trim() !== '');

      // Prepare payload matching Omit<Job, 'id'>
      const now = new Date().toISOString();
      const payload: Omit<Job, 'id'> = {
        title: formData.title || '',
        location: formData.location || '',
        company: formData.company || '',
        employmentType: formData.employmentType || '',
        summary: formData.summary || '',
        reportsTo: formData.reportsTo || '',
        qualifications: qualificationsArray,
        responsibilities: responsibilitiesArray,
        created_at: now, // Add current timestamp
        updatedAt: now, // Add current timestamp
      };

      console.log("Saving as new job with payload:", payload);
      const newJob = await createJob(payload);

      if (newJob) {
        console.log("Successfully created new job:", newJob);
        router.push('/admin/jobs'); // Navigate back to the list on success
      } else {
        throw new Error('API returned null, saving as new failed');
      }
    } catch (err: any) {
      setError(`Failed to save as new job: ${err.message || 'Unknown error'}`);
      console.error(err);
    } finally {
      setSavingAsNew(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading job details...</div>;
  }

  // Error display if ID is missing or job failed to load initially
  if (error && !formData.title) {
    return (
      <div className="py-6">
          <div className="flex justify-end mb-6">
            <Link
              href="/admin/jobs"
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Back to Jobs
            </Link>
          </div>
          <div className="text-center py-8 text-red-500 bg-white rounded-lg shadow p-6">
              {error}
          </div>
      </div>
    );
  }

  // Main form rendering
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

      {/* Display submission errors */} 
      {error && formData.title && (
        <div className="mb-4 bg-red-50 p-4 rounded-md">
          <p className="text-red-600">Error saving job: {error}</p>
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

             {/* Date Created (Read Only) */}
             <div>
              <label htmlFor="created_at_display" className="block text-sm font-medium text-gray-700 mb-1">
                Date Created
              </label>
              <input
                type="text"
                id="created_at_display"
                name="created_at_display"
                value={displayDate}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button" // Important: type="button" to prevent form submission
              onClick={handleSaveAsNew}
              disabled={saving || savingAsNew || loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300"
            >
              {savingAsNew ? 'Saving Copy...' : 'Save as New'}
            </button>
            <button
              type="submit"
              disabled={saving || savingAsNew || loading}
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

// Wrap the main component in Suspense to handle useSearchParams
export default function EditJobPage() {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <EditJobFormContent />
    </Suspense>
  );
} 
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getTrainingById, updateTraining } from '@/lib/api';
import { Training } from '@/types/training';
import Link from 'next/link';

export default function TrainingEditForm({ training, id }: { training: Training | null; id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Training | null>(training);
  const [requirements, setRequirements] = useState<string[]>(training?.requirements || []);
  const [newRequirement, setNewRequirement] = useState('');

  useEffect(() => {
    if (!training) {
      loadTraining();
    } else {
      setLoading(false);
    }
  }, [training]);

  async function loadTraining() {
    try {
      const data = await getTrainingById(id);
      if (data) {
        setFormData(data);
        setRequirements(data.requirements || []);
      } else {
        setError('Training not found');
      }
    } catch (err) {
      console.error('Error loading training:', err);
      setError('Failed to load training');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !formData) return;

    setSaving(true);
    setError(null);

    try {
      const trainingData = {
        ...formData,
        requirements: requirements.length > 0 ? requirements : undefined,
      };

      const result = await updateTraining(id, trainingData);
      
      if (result) {
        router.push('/admin/trainings');
      } else {
        setError('Failed to update training');
      }
    } catch (err) {
      console.error('Error updating training:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setRequirements([...requirements, newRequirement.trim()]);
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error && !formData) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!formData) {
    return <div className="text-center py-8">Training not found</div>;
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit Training</h1>
        <Link
          href="/admin/trainings"
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Back to Trainings
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL*
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability*
            </label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration*
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notification Channel*
            </label>
            <input
              type="text"
              name="notificationChannel"
              value={formData.notificationChannel}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price*
            </label>
            <input
              type="text"
              name="price"
              value={formData.price || ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original Price
            </label>
            <input
              type="text"
              name="originalPrice"
              value={formData.originalPrice || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Hours
            </label>
            <input
              type="text"
              name="classHours"
              value={formData.classHours || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Schedule URL
            </label>
            <input
              type="url"
              name="scheduleUrl"
              value={formData.scheduleUrl || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Details
            </label>
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails || ''}
              onChange={handleChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requirements
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
                placeholder="Add a requirement"
              />
              <button
                type="button"
                onClick={addRequirement}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            {requirements.length > 0 && (
              <ul className="bg-gray-50 p-3 rounded-md">
                {requirements.map((req, index) => (
                  <li key={index} className="flex justify-between items-center mb-2">
                    <span>{req}</span>
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => router.push('/admin/trainings')}
            className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
          >
            {saving ? 'Saving...' : 'Update Training'}
          </button>
        </div>
      </form>
    </div>
  );
} 
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { getTrainingById, updateTraining } from '@/lib/api';
import { Training } from '@/types/training';

export default function EditTrainingPage({ searchParams }: { searchParams: { id?: string } }) {
  const router = useRouter();
  const trainingId = searchParams.id;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [training, setTraining] = useState<Training | null>(null);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [newRequirement, setNewRequirement] = useState('');

  useEffect(() => {
    async function loadTraining() {
      if (!trainingId) {
        setError('Training ID is required');
        setLoading(false);
        return;
      }

      try {
        const data = await getTrainingById(trainingId);
        if (data) {
          setTraining(data);
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

    loadTraining();
  }, [trainingId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!trainingId || !training) return;

    setSaving(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const trainingData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        image: formData.get('image') as string,
        availability: formData.get('availability') as string,
        duration: formData.get('duration') as string,
        notificationChannel: formData.get('notificationChannel') as string,
        price: formData.get('price') as string,
        originalPrice: formData.get('originalPrice') as string || undefined,
        classHours: formData.get('classHours') as string || undefined,
        additionalDetails: formData.get('additionalDetails') as string || undefined,
        scheduleUrl: formData.get('scheduleUrl') as string || undefined,
        requirements: requirements.length > 0 ? requirements : undefined,
      };

      const result = await updateTraining(trainingId, trainingData);
      
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

  if (error && !training) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!training) {
    return <div className="text-center py-8">Training not found</div>;
  }

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">Edit Training</h1>
      
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
              defaultValue={training.title}
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
              defaultValue={training.description}
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
              defaultValue={training.image}
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
              defaultValue={training.availability}
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
              defaultValue={training.duration}
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
              defaultValue={training.notificationChannel}
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
              defaultValue={training.price}
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
              defaultValue={training.originalPrice}
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
              defaultValue={training.classHours}
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
              defaultValue={training.scheduleUrl}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Details
            </label>
            <textarea
              name="additionalDetails"
              defaultValue={training.additionalDetails}
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
        
        <div className="mt-6 flex items-center justify-end">
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
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
} 
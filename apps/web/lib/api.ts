import { supabase } from './supabase';
import type { Job } from '../types/job';
import type { Training } from '../types/training';

const JOB_TABLE = 'jobs';
const TRAINING_TABLE = 'trainings';

// Jobs API functions
// Fetch all jobs
export async function getAllJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from(JOB_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }

  return data || [];
}

// Fetch a single job by ID
export async function getJobById(id: string): Promise<Job | null> {
  const { data, error } = await supabase
    .from(JOB_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching job with ID ${id}:`, error);
    return null;
  }

  return data;
}

// Create a new job
export async function createJob(job: Omit<Job, 'id'>): Promise<Job | null> {
  const { data, error } = await supabase
    .from(JOB_TABLE)
    .insert([job])
    .select();

  if (error) {
    console.error('Error creating job:', error);
    return null;
  }

  return data?.[0] || null;
}

// Update an existing job
export async function updateJob(id: string, updates: Partial<Job>): Promise<Job | null> {
  const { data, error } = await supabase
    .from(JOB_TABLE)
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    console.error(`Error updating job with ID ${id}:`, error);
    return null;
  }

  return data?.[0] || null;
}

// Delete a job
export async function deleteJob(id: string): Promise<boolean> {
  const { error } = await supabase
    .from(JOB_TABLE)
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting job with ID ${id}:`, error);
    return false;
  }

  return true;
}

// Trainings API functions
// Fetch all trainings
export async function getAllTrainings(): Promise<Training[]> {
  const { data, error } = await supabase
    .from(TRAINING_TABLE)
    .select('*')
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching trainings:', error);
    return [];
  }

  if (!data) return [];

  // Convert snake_case to camelCase for frontend
  return data.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    image: item.image,
    availability: item.availability,
    duration: item.duration,
    notificationChannel: item.notification_channel,
    price: item.price,
    originalPrice: item.original_price,
    classHours: item.class_hours,
    additionalDetails: item.additional_details,
    scheduleUrl: item.schedule_url,
    requirements: item.requirements,
  }));
}

// Fetch a single training by ID
export async function getTrainingById(id: string): Promise<Training | null> {
  const { data, error } = await supabase
    .from(TRAINING_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`Error fetching training with ID ${id}:`, error);
    return null;
  }

  if (!data) return null;

  // Convert snake_case to camelCase for frontend
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    image: data.image,
    availability: data.availability,
    duration: data.duration,
    notificationChannel: data.notification_channel,
    price: data.price,
    originalPrice: data.original_price,
    classHours: data.class_hours,
    additionalDetails: data.additional_details,
    scheduleUrl: data.schedule_url,
    requirements: data.requirements,
  };
}

// Create a new training
export async function createTraining(training: Omit<Training, 'id'>): Promise<Training | null> {
  // Convert camelCase to snake_case for backend
  const dbTraining = {
    title: training.title,
    description: training.description,
    image: training.image,
    availability: training.availability,
    duration: training.duration,
    notification_channel: training.notificationChannel,
    price: training.price,
    original_price: training.originalPrice,
    class_hours: training.classHours,
    additional_details: training.additionalDetails,
    schedule_url: training.scheduleUrl,
    requirements: training.requirements,
  };

  const { data, error } = await supabase
    .from(TRAINING_TABLE)
    .insert([dbTraining])
    .select();

  if (error) {
    console.error('Error creating training:', error);
    return null;
  }

  if (!data || data.length === 0) return null;

  // Convert snake_case back to camelCase for frontend
  return {
    id: data[0].id,
    title: data[0].title,
    description: data[0].description,
    image: data[0].image,
    availability: data[0].availability,
    duration: data[0].duration,
    notificationChannel: data[0].notification_channel,
    price: data[0].price,
    originalPrice: data[0].original_price,
    classHours: data[0].class_hours,
    additionalDetails: data[0].additional_details,
    scheduleUrl: data[0].schedule_url,
    requirements: data[0].requirements,
  };
}

// Update an existing training
export async function updateTraining(id: string, updates: Partial<Training>): Promise<Training | null> {
  // Convert camelCase to snake_case for backend
  const dbUpdates = {
    title: updates.title,
    description: updates.description,
    image: updates.image,
    availability: updates.availability,
    duration: updates.duration,
    notification_channel: updates.notificationChannel,
    price: updates.price,
    original_price: updates.originalPrice,
    class_hours: updates.classHours,
    additional_details: updates.additionalDetails,
    schedule_url: updates.scheduleUrl,
    requirements: updates.requirements,
  };

  const { data, error } = await supabase
    .from(TRAINING_TABLE)
    .update(dbUpdates)
    .eq('id', id)
    .select();

  if (error) {
    console.error(`Error updating training with ID ${id}:`, error);
    return null;
  }

  if (!data || data.length === 0) return null;

  // Convert snake_case back to camelCase for frontend
  return {
    id: data[0].id,
    title: data[0].title,
    description: data[0].description,
    image: data[0].image,
    availability: data[0].availability,
    duration: data[0].duration,
    notificationChannel: data[0].notification_channel,
    price: data[0].price,
    originalPrice: data[0].original_price,
    classHours: data[0].class_hours,
    additionalDetails: data[0].additional_details,
    scheduleUrl: data[0].schedule_url,
    requirements: data[0].requirements,
  };
}

// Delete a training
export async function deleteTraining(id: string): Promise<boolean> {
  const { error } = await supabase
    .from(TRAINING_TABLE)
    .delete()
    .eq('id', id);

  if (error) {
    console.error(`Error deleting training with ID ${id}:`, error);
    return false;
  }

  return true;
} 
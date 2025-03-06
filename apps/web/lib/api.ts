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
    .order('date', { ascending: false });

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

  return data || [];
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

  return data;
}

// Create a new training
export async function createTraining(training: Omit<Training, 'id'>): Promise<Training | null> {
  const { data, error } = await supabase
    .from(TRAINING_TABLE)
    .insert([training])
    .select();

  if (error) {
    console.error('Error creating training:', error);
    return null;
  }

  return data?.[0] || null;
}

// Update an existing training
export async function updateTraining(id: string, updates: Partial<Training>): Promise<Training | null> {
  const { data, error } = await supabase
    .from(TRAINING_TABLE)
    .update(updates)
    .eq('id', id)
    .select();

  if (error) {
    console.error(`Error updating training with ID ${id}:`, error);
    return null;
  }

  return data?.[0] || null;
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
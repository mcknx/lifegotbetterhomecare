import { supabase } from './supabase';
import type { Job } from '../types/job';

const JOB_TABLE = 'jobs';

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
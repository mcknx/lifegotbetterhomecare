import { getJobById } from '@/lib/api';
import JobEditForm from './JobEditForm';

export default async function EditJobPage({ params }: { params: { id: string } }) {
  // Fetch job data on the server
  const job = await getJobById(params.id);
  
  // Pass data to client component
  return <JobEditForm job={job} id={params.id} />;
} 
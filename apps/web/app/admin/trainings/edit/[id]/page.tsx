import { getTrainingById } from '@/lib/api';
import TrainingEditForm from './TrainingEditForm';

export default async function EditTrainingPage({ params }: { params: { id: string } }) {
  // Fetch training data on the server
  const training = await getTrainingById(params.id);
  
  // Pass data to client component
  return <TrainingEditForm training={training} id={params.id} />;
} 
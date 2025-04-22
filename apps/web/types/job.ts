export interface Job {
  id: string;
  title: string;
  location: string;
  company: string;
  created_at: string;
  employmentType: string;
  summary?: string;
  qualifications?: string[];
  responsibilities?: string[];
  reportsTo?: string;
  updatedAt: string;
} 
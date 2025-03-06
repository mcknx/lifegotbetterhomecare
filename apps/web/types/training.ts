export interface Training {
  id: string;
  title: string;
  description: string;
  image: string;
  availability: string;
  duration: string;
  notificationChannel: string;
  price?: string;
  originalPrice?: string;
  classHours?: string;
  additionalDetails?: string;
  scheduleUrl?: string;
  requirements?: string[];
} 
// Define the Job interface
export interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  date: string;
  type: string;
  category: string;
}

// Define the navigation parameter list for the entire app
export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Services: undefined;
  Jobs: undefined;
  Training: undefined;
  Contact: { jobData?: Job };
  // Add other screens as needed
}; 
import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { ContactSection } from '../components/ContactSection';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';
import { useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define job interface directly
interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  date: string;
  type: string;
  category: string;
}

// Define navigation type
type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Services: undefined;
  Jobs: undefined;
  Training: undefined;
  Contact: { jobData?: Job };
};

// Define the route params type
type ContactScreenRouteProp = RouteProp<RootStackParamList, 'Contact'>;

export const ContactScreen: React.FC = () => {
  // Get route and job data if available
  const route = useRoute<ContactScreenRouteProp>();
  const jobData = route.params?.jobData;
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ContactSection jobData={jobData} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.text,
    opacity: 0.7,
    lineHeight: 22,
  },
});

export default ContactScreen;

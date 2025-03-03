import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from 'react-native';
import { ContactSection } from '../components/ContactSection';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../theme';

export const ContactScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ContactSection />
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
    color: theme.colors.textLight,
    lineHeight: 22,
  },
});

export default ContactScreen;

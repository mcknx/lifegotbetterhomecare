import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export function AboutSection() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* About Us */}
        <View style={styles.section}>
          <Text style={styles.heading}>About Us</Text>
          <Text style={styles.text}>
            Life Got Better Staffing Services LLC, established in 2017 by Marlon C. Hood II, 
            is dedicated staffing company that specializes in-connecting skilled medical 
            professionals with facilities and organizations.
          </Text>
          <Text style={styles.text}>
            Our comprehensive services extend beyond recruitment, encompassing staffing 
            level management, training, onboarding, and recruitment services.
          </Text>
        </View>

        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/nurse-patient.jpg')}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.statsBox}>
            <Text style={styles.statsNumber}>200+</Text>
            <Text style={styles.statsText}>Healthcare{'\n'}Professionals</Text>
          </View>
        </View>

        {/* Mission Section */}
        <View style={[styles.section, styles.missionSection]}>
          <Text style={styles.heading}>Our Mission</Text>
          <Text style={styles.text}>
            Our mission at LGB Staffing is to forge connections between dedicated nurses 
            and caregivers with healthcare facilities in need of vital clinical support. 
            By providing flexible schedules and daily pay for nurses, we strive to ensure 
            consistent coverage for facilities.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 10,
    lineHeight: 22,
  },
  imageContainer: {
    marginVertical: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },
  statsBox: {
    position: 'absolute',
    bottom: -20,
    right: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  statsText: {
    fontSize: 14,
    color: '#4b5563',
  },
  missionSection: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    paddingLeft: 16,
    marginTop: 24,
  },
}); 
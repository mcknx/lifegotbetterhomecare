import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SECTION_HEIGHT } from '../constants';

export function BenefitsSection() {
  const services = [
    { icon: 'shield-outline', title: "Personal Care" },
    { icon: 'heart-outline', title: "Memory Care" },
    { icon: 'home-outline', title: "Hospice Support" },
    { icon: 'car-outline', title: "Mobility Assistance" },
    { icon: 'restaurant-outline', title: "Meal Prep" },
    { icon: 'car-sport-outline', title: "Transportation" },
    { icon: 'clipboard-outline', title: "Housekeeping" },
    { icon: 'medical-outline', title: "Medication Reminders" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        What personalized care can look like
      </Text>

      <View style={styles.grid}>
        {services.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name={service.icon as any} 
                size={24} 
                color="#2563EB"
              />
            </View>
            <Text style={styles.serviceTitle}>
              {service.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SECTION_HEIGHT,
    backgroundColor: 'white',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 600,
    paddingHorizontal: 8,
  },
  serviceItem: {
    width: '40%',
    alignItems: 'center',
    marginBottom: 32,
    opacity: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 15,
    color: '#374151',
    textAlign: 'center',
    fontWeight: 'normal',
  },
}); 
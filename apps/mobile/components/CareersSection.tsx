import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SECTION_HEIGHT } from '../constants';
import { Ionicons } from '@expo/vector-icons';

type BenefitIcon = keyof typeof Ionicons.glyphMap;

type CareersSectionProps = {
  onContactPress: () => void;
};

export function CareersSection({ onContactPress }: CareersSectionProps) {
  const benefits: Array<{
    icon: BenefitIcon;
    title: string;
    description: string;
  }> = [
    {
      icon: 'heart-outline',
      title: "Make an Impact",
      description: "Make a positive difference in the lives of others by providing compassionate care"
    },
    {
      icon: 'time-outline',
      title: "Flexible Hours & Pay",
      description: "Enjoy flexible hours, competitive pay, and training opportunities"
    },
    {
      icon: 'mail-outline',
      title: "Submit Your Resume",
      description: "Send your resume to lifegotbetterhomecare@gmail.com to join a supportive team"
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionLabel}>WHY CHOOSE US</Text>
        <Text style={styles.title}>Careers.</Text>
        <Text style={styles.title}>We're hiring!</Text>
        
        <Text style={styles.description}>
          Because our clients' needs don't always follow traditional business hours,
          we offer unique flexibility in regards to working hours.
        </Text>

        <View style={styles.benefitsContainer}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <View style={styles.iconContainer}>
                <Ionicons name={benefit.icon} size={20} color="#1e40af" />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={onContactPress}
        >
          <Text style={styles.buttonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SECTION_HEIGHT,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  content: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 4,
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
    lineHeight: 24,
  },
  benefitsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#e0e7ff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#1e40af',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
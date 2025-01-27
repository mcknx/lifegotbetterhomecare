import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SECTION_HEIGHT } from '../constants';

interface FindCareSectionProps {
  onContactPress: () => void;
  onServicesPress: () => void;
}

export function FindCareSection({ onContactPress, onServicesPress }: FindCareSectionProps) {
  const [activeTab, setActiveTab] = useState<'care' | 'jobs'>('care');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/healthcare-worker.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.statsCard}>
          <View style={styles.statsContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="star" size={24} color="white" />
            </View>
            <View style={styles.statsTextContainer}>
              <Text style={styles.statsTitle}>Trusted Care Provider</Text>
              <Text style={styles.statsText}>Over 1,000 families served with 5-star ratings</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          Compassionate Home Care.{'\n'}
          For Your Loved Ones.
        </Text>

        <Text style={styles.description}>
          Experience professional, personalized care that helps seniors live independently and families find peace of mind.
        </Text>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            onPress={() => setActiveTab('care')}
            style={[styles.tab, activeTab === 'care' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'care' && styles.activeTabText]}>
              Find Care
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('jobs')}
            style={[styles.tab, activeTab === 'jobs' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'jobs' && styles.activeTabText]}>
              Find Jobs
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'care' ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={onContactPress}
            >
              <Text style={styles.primaryButtonText}>
                Schedule a Free Consultation
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={onServicesPress}
            >
              <Text style={styles.secondaryButtonText}>
                Learn About Our Services
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={onContactPress}
            >
              <Text style={styles.primaryButtonText}>
                View Open Positions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={onContactPress}
            >
              <Text style={styles.secondaryButtonText}>
                Learn About Careers
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: SECTION_HEIGHT,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 50,
    height: 200,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    backgroundColor: '#f3f4f6', // Fallback color while loading
  },
  statsCard: {
    position: 'absolute',
    bottom: -40,
    left: 16,
    right: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 10,
  },
  statsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statsTextContainer: {
    flex: 1,
  },
  iconContainer: {
    backgroundColor: '#2563EB',
    padding: 8,
    borderRadius: 20,
  },
  statsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  statsText: {
    fontSize: 13,
    color: '#6B7280',
  },
  content: {
    marginTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 16,
    lineHeight: 32,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
    lineHeight: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 24,
  },
  tab: {
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB',
  },
  tabText: {
    color: '#6B7280',
    fontSize: 15,
  },
  activeTabText: {
    color: '#2563EB',
    fontWeight: '500',
  },
  buttonContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '600',
  },
}); 
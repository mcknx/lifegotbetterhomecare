import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { SECTION_HEIGHT } from '../constants';

export function ContactSection() {
  const [serviceType, setServiceType] = useState('care');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
  });

  const handleSubmit = () => {
    // Basic form validation
    if (!formData.name || !formData.email || !formData.phone || !formData.zipCode) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      zipCode: '',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Contact Us About Our Home Care</Text>
            <Text style={styles.subtitle}>
              Call <Text style={styles.phoneLink}>(414) 847-6498</Text> or fill out the form below.
            </Text>

            {/* Service Type Selection */}
            <View style={styles.serviceTypeContainer}>
              <Text style={styles.label}>I'm interested in:</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity 
                  style={styles.radioOption} 
                  onPress={() => setServiceType('care')}
                >
                  <View style={[styles.radio, serviceType === 'care' && styles.radioSelected]} />
                  <Text>Home Care Services</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.radioOption} 
                  onPress={() => setServiceType('employment')}
                >
                  <View style={[styles.radio, serviceType === 'employment' && styles.radioSelected]} />
                  <Text>Employment</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Form Fields */}
            <TextInput
              style={styles.input}
              placeholder="Name*"
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
            />

            <TextInput
              style={styles.input}
              placeholder="Email*"
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Phone*"
              value={formData.phone}
              onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
              keyboardType="phone-pad"
            />

            <TextInput
              style={styles.input}
              placeholder="Zip Code*"
              value={formData.zipCode}
              onChangeText={(text) => setFormData(prev => ({ ...prev, zipCode: text }))}
              keyboardType="numeric"
            />

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Send Message</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              By submitting this form, I agree to be contacted via call, email and text. 
              Message and data rates may apply.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    height: SECTION_HEIGHT,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    minHeight: SECTION_HEIGHT,
  },
  formWrapper: {
    paddingHorizontal: 16,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
    textAlign: 'center',
  },
  phoneLink: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
  serviceTypeContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#374151',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  radioSelected: {
    backgroundColor: '#2563eb',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 18,
  },
}); 
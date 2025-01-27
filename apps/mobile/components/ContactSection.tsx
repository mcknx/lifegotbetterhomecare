import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SECTION_HEIGHT } from '../constants';

export function ContactSection() {
  const windowWidth = Dimensions.get('window').width;
  const [serviceType, setServiceType] = useState('care');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      phone: '',
      zipCode: '',
    });
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Form Section */}
      <View style={[styles.formContainer, { width: windowWidth - 32 }]}>
        <Text style={styles.title}>Contact Us About Our Home Care</Text>
        <Text style={styles.subtitle}>
          Call <Text style={styles.phoneLink}>(414) 847-6498</Text> or fill out the form below
        </Text>

        <View style={styles.radioContainer}>
          <Text style={styles.radioLabel}>I'm interested in:</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity 
              style={styles.radioButton} 
              onPress={() => setServiceType('care')}
            >
              <View style={[styles.radio, serviceType === 'care' && styles.radioSelected]} />
              <Text style={styles.radioText}>Home Care Services</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.radioButton} 
              onPress={() => setServiceType('employment')}
            >
              <View style={[styles.radio, serviceType === 'employment' && styles.radioSelected]} />
              <Text style={styles.radioText}>Employment</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Zip Code"
            value={formData.zipCode}
            onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Send Message</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By submitting this form, I agree to be contacted via call, email and text.
            Message and data rates may apply.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingBottom: 0,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  phoneLink: {
    color: '#1e40af',
    textDecorationLine: 'underline',
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
    color: '#4b5563',
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1e40af',
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: '#1e40af',
  },
  radioText: {
    fontSize: 15,
    color: '#475569',
  },
  form: {
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8fafc',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1e40af',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 24,
  },
}); 
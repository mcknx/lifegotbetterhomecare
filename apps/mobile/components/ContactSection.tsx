import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform, Modal } from 'react-native';
import { SECTION_HEIGHT } from '../constants';

// Add this type definition at the top of the file, after the imports
type FormData = {
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  position: string;
  experience: string;
  availability: string;
  additionalInfo: string;
};

export function ContactSection() {
  const [serviceType, setServiceType] = useState('care');
  const [showModal, setShowModal] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    position: '',
    experience: '',
    availability: '',
    additionalInfo: '',
  });

  // Dropdown options
  const positions = [
    'Caregiver',
    'Nurse',
    'Care Coordinator',
    'Other'
  ];

  const experiences = [
    '0-1 years',
    '1-3 years',
    '3-5 years',
    '5+ years'
  ];

  const availabilities = [
    'Full Time',
    'Part Time',
    'Flexible'
  ];

  // Update the selectOption function to use the type
  const selectOption = (type: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [type]: value }));
    setShowModal('');
  };

  // Update renderDropdown to use the type
  const renderDropdown = (type: keyof FormData, options: string[], placeholder: string) => (
    <>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowModal(type)}
      >
        <Text style={formData[type] ? styles.inputText : styles.placeholderText}>
          {formData[type] || placeholder}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={showModal === type}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal('')}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1} 
          onPress={() => setShowModal('')}
        >
          <View style={styles.modalContent}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => selectOption(type, option)}
              >
                <Text style={styles.modalOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );

  const handleSubmit = () => {
    // Basic form validation
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      zipCode: '',
      position: '',
      experience: '',
      availability: '',
      additionalInfo: '',
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

            {/* Common Fields */}
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

            {serviceType === 'care' ? (
              // Care Service Fields
              <TextInput
                style={styles.input}
                placeholder="Zip Code*"
                value={formData.zipCode}
                onChangeText={(text) => setFormData(prev => ({ ...prev, zipCode: text }))}
                keyboardType="numeric"
              />
            ) : (
              // Employment Fields
              <>
                {renderDropdown('position', positions, 'Position Interested In*')}
                {renderDropdown('experience', experiences, 'Years of Experience*')}
                {renderDropdown('availability', availabilities, 'Availability*')}

                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Additional Information (Optional)"
                  value={formData.additionalInfo}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, additionalInfo: text }))}
                  multiline
                  numberOfLines={4}
                />
              </>
            )}

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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  select: {
    marginBottom: 12,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  inputText: {
    color: '#000',
    fontSize: 16,
  },
  placeholderText: {
    color: '#6B7280',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '50%',
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#000',
  },
}); 
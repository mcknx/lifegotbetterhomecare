import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform, Modal, Linking, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

type FormData = {
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  position: string;
  experience: string;
  availability: string;
  additionalInfo: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
};

export function ContactSection() {
  const [serviceType, setServiceType] = useState('care');
  const [showModal, setShowModal] = useState('');
  const [locationPermission, setLocationPermission] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    position: '',
    experience: '',
    availability: '',
    additionalInfo: '',
    location: undefined,
  });

  // Check if location permission is already granted
  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
    })();
  }, []);

  // Request location permission and get user's location
  const requestLocation = async () => {
    try {
      setLocationLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is needed to find care services in your area.',
          [{ text: 'OK' }]
        );
        setLocationLoading(false);
        return;
      }
      
      setLocationPermission(true);
      
      try {
        // Get the current position
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced
        });
        
        try {
          // Reverse geocode to get address
          const [address] = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });
          
          // Format address
          const addressStr = address 
            ? `${address.street || ''}, ${address.city || ''}, ${address.region || ''} ${address.postalCode || ''}`
            : 'Location found';
          
          // Update form data with location
          setFormData(prev => ({
            ...prev,
            location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              address: addressStr
            },
            // If we have a postal code from geocoding and zipCode is empty, use it
            zipCode: prev.zipCode || address?.postalCode || ''
          }));
          
          Alert.alert('Location Added', 'Your location has been added to the form.');
        } catch (geocodeError) {
          console.error('Error geocoding location:', geocodeError);
          // Still update with coordinates even if geocoding fails
          setFormData(prev => ({
            ...prev,
            location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }
          }));
          Alert.alert('Location Added', 'Your coordinates have been added to the form.');
        }
      } catch (positionError) {
        console.error('Error getting position:', positionError);
        Alert.alert('Error', 'There was a problem getting your precise location. Please enter your zip code manually.');
      }
      
      setLocationLoading(false);
    } catch (error) {
      console.error('Error in location process:', error);
      Alert.alert('Error', 'There was a problem with location services. Please try again or enter your information manually.');
      setLocationLoading(false);
    }
  };

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

  const selectOption = (type: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [type]: value }));
    setShowModal('');
  };

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
        supportedOrientations={['portrait', 'landscape']}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1} 
          onPress={() => setShowModal('')}
        >
          <View style={[styles.modalContent, Platform.OS === 'ios' && Platform.isPad && styles.iPadModalContent]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{placeholder}</Text>
              <TouchableOpacity onPress={() => setShowModal('')}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.modalOption}
                  onPress={() => selectOption(type, option)}
                >
                  <Text style={styles.modalOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );

  const handleSubmit = async () => {
    // Basic form validation
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        ...(serviceType === 'care' ? {
          zip_code: formData.zipCode,
          user_location: formData.location ? 
            `Lat: ${formData.location.latitude}, Long: ${formData.location.longitude}, Address: ${formData.location.address || 'Unknown'}` :
            'No location provided'
        } : {
          position_type: formData.position,
          experience_level: formData.experience,
          availability: formData.availability,
          additional_info: formData.additionalInfo,
        })
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'origin': 'https://lifegotbetterhomecare.com',
        },
        body: JSON.stringify({
          service_id: 'service_y3oo2si',
          template_id: serviceType === 'care' ? 'template_tj5d2cp' : 'template_csqtwpf',
          user_id: 'Xeu-hioZNC6XZvx_d',
          template_params: templateParams,
        }),
      });

      if (response.status === 200) {
        alert('Message sent successfully!');
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
          location: undefined,
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Unable to send message. Please try again or contact us directly.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formWrapper}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Get Personalized Care Support</Text>
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
              <>
                <View style={styles.locationContainer}>
                  <TextInput
                    style={[styles.input, styles.zipCodeInput]}
                    placeholder="Zip Code*"
                    value={formData.zipCode}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, zipCode: text }))}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity 
                    style={styles.locationButton}
                    onPress={requestLocation}
                    disabled={locationLoading}
                  >
                    <Ionicons name="location-outline" size={20} color="#fff" />
                    <Text style={styles.locationButtonText}>
                      {locationLoading ? 'Getting...' : formData.location ? 'Location Added' : 'Add Location'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {formData.location && (
                  <Text style={styles.locationText}>
                    Location: {typeof formData.location === 'object' && formData.location.address ? formData.location.address : 'Current location added'}
                  </Text>
                )}
              </>
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  zipCodeInput: {
    flex: 1,
    marginRight: 10,
  },
  locationButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  locationButtonText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 5,
    fontSize: 14,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 20,
    minHeight: '100%',
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
    maxHeight: Platform.OS === 'ios' ? '50%' : '70%',
  },
  iPadModalContent: {
    maxHeight: '40%',
    marginHorizontal: 100,
    borderRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
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
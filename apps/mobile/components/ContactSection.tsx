import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform, Modal, Linking, Alert } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

// Define Job interface directly
interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  date: string;
  type: string;
  category: string;
}

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

interface ContactSectionProps {
  jobData?: Job;
}

export function ContactSection({ jobData }: ContactSectionProps) {
  const [serviceType, setServiceType] = useState(jobData ? 'jobs' : '');
  const [showModal, setShowModal] = useState('');
  const [locationPermission, setLocationPermission] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    zipCode: '',
    position: jobData ? jobData.title : '',
    experience: '',
    availability: '',
    additionalInfo: jobData ? `I am applying for the ${jobData.title} position in ${jobData.location}.` : '',
    location: undefined,
  });

  // Add questions for home care services
  const [careDetails, setCareDetails] = useState({
    careRecipient: '',
    referralSource: ''
  });

  // Set job data when component mounts
  useEffect(() => {
    if (jobData) {
      setServiceType('jobs');
      setFormData(prevData => ({
        ...prevData,
        position: jobData.title,
        additionalInfo: `I am applying for the ${jobData.title} position in ${jobData.location}.`
      }));
    }
  }, [jobData]);

  // Check if location permission is already granted
  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');
    })();
  }, []);

  // Request location permission and get user's location
  const requestLocation = async (): Promise<boolean> => {
    setLocationLoading(true);
    
    try {
      // Check for existing permissions first
      let { status } = await Location.getForegroundPermissionsAsync();
      
      // If permission not granted yet, show an explanation before requesting
      if (status !== 'granted') {
        // Show explanation dialog
        Alert.alert(
          'Location Permission',
          'We need your location to help match you with caregivers in your area. This helps us provide more personalized service. Your location is only used within the app and never shared with third parties.',
          [
            { 
              text: 'Cancel', 
              style: 'cancel',
              onPress: () => {
                setLocationLoading(false);
              }
            },
            { 
              text: 'Continue', 
              onPress: async () => {
                // Now request the permission after explanation
                const { status: newStatus } = await Location.requestForegroundPermissionsAsync();
                if (newStatus !== 'granted') {
                  Alert.alert(
                    'Location Permission Denied',
                    'You can still use the app, but we won\'t be able to suggest caregivers in your specific area. You can provide your zip code manually or enable location permission in your device settings later.',
                    [
                      { text: 'OK', style: 'cancel' },
                      { 
                        text: 'Open Settings', 
                        onPress: () => {
                          Linking.openSettings();
                        }
                      }
                    ]
                  );
                  setLocationLoading(false);
                  return;
                } else {
                  setLocationPermission(true);
                  // Continue with getting location
                  getLocation();
                }
              }
            }
          ]
        );
        return false;
      } else {
        // Permission already granted, get location
        setLocationPermission(true);
        return await getLocation();
      }
    } catch (error) {
      console.error('Error with location permission:', error);
      Alert.alert(
        'Location Error',
        'We couldn\'t access your location. Please try again or enter your zip code manually.',
        [{ text: 'OK' }]
      );
      setLocationLoading(false);
      return false;
    }
  };

  // Separate function to get location after permission is granted
  const getLocation = async (): Promise<boolean> => {
    try {
      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      // Get the address (reverse geocoding)
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      
      // Format the address from geocode results
      let formattedAddress = 'Address unavailable';
      if (geocode && geocode.length > 0) {
        const addressData = geocode[0];
        formattedAddress = [
          addressData.street,
          addressData.city,
          addressData.region,
          addressData.postalCode,
          addressData.country
        ].filter(Boolean).join(', ');
      }
      
      // Update form data with location
      setFormData(prev => ({
        ...prev,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          address: formattedAddress
        }
      }));
      
      // If we have a zipcode from geocoding and the user hasn't entered one, use it
      if (geocode && geocode.length > 0 && geocode[0].postalCode && !formData.zipCode) {
        setFormData(prev => ({
          ...prev,
          zipCode: geocode[0].postalCode || ''
        }));
      }
      
      setLocationLoading(false);
      return true;
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert(
        'Location Error',
        'We couldn\'t retrieve your location. Please try again or enter your zip code manually.',
        [{ text: 'OK' }]
      );
      setLocationLoading(false);
      return false;
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

  // Create arrays for the care recipient and referral source options
  const careRecipients = ['Self', 'Parent', 'Spouse', 'Child', 'Other Family Member', 'Friend', 'Other'];
  const referralSources = ['Google Search', 'Social Media', 'Friend/Family', 'Healthcare Provider', 'Other'];

  const selectOption = (type: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [type]: value }));
    setShowModal('');
  };

  const renderDropdown = (type: keyof FormData, options: string[], placeholder: string, error?: string) => {
    // For dropdown options, we only deal with string type fields
    const displayValue = typeof formData[type] === 'string' ? formData[type] : '';
    
    return (
      <>
        <TouchableOpacity
          style={[styles.input, error ? styles.inputError : null]}
          onPress={() => setShowModal(type)}
        >
          <Text style={displayValue ? styles.inputText : styles.placeholderText}>
            {displayValue || placeholder}
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
  };

  // Add a function to handle location confirmation
  const confirmSubmitWithoutLocation = () => {
    return new Promise((resolve) => {
      if (serviceType === 'care' && !formData.location) {
        Alert.alert(
          'Location Missing',
          'Adding your location helps us match you with nearby caregivers. Would you like to add your location now?',
          [
            {
              text: 'Add Location',
              onPress: () => {
                requestLocation().then(() => {
                  // If location was successfully added, continue with submission
                  if (formData.location) {
                    resolve(true);
                  } else {
                    // If location couldn't be retrieved, ask if they want to continue anyway
                    Alert.alert(
                      'Location Unavailable',
                      'We couldn\'t access your location. Do you want to submit the form without it?',
                      [
                        { text: 'Yes, Submit Anyway', onPress: () => resolve(true) },
                        { text: 'Cancel', onPress: () => resolve(false), style: 'cancel' }
                      ]
                    );
                  }
                });
              }
            },
            { 
              text: 'Submit Without Location', 
              onPress: () => resolve(true) 
            },
            { 
              text: 'Cancel', 
              style: 'cancel', 
              onPress: () => resolve(false) 
            }
          ]
        );
      } else {
        // If not home care service or location already provided, continue
        resolve(true);
      }
    });
  };

  // Update the handleSubmit function to use the confirmation
  const handleSubmit = async () => {
    // Validate all fields
    const errors: {[key: string]: string} = {};
    
    if (!serviceType) {
      errors.serviceType = 'Please select what you are interested in';
    }
    
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    }
    
    // Validate fields based on service type
    if (serviceType === 'care') {
      if (!formData.zipCode) {
        errors.zipCode = 'Zip code is required';
      }
    } else if (serviceType === 'jobs') {
      if (!formData.position) {
        errors.position = 'Position is required';
      }
      if (!formData.experience) {
        errors.experience = 'Experience is required';
      }
      if (!formData.availability) {
        errors.availability = 'Availability is required';
      }
    }
    
    // Show errors if any
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      Alert.alert('Form Error', 'Please fill in all required fields');
      return;
    }
    
    // Confirm submission if location is missing for home care
    const shouldContinue = await confirmSubmitWithoutLocation();
    if (!shouldContinue) return;
    
    try {
      // Format the location data more clearly for the email
      let locationString = 'No location provided';
      if (formData.location) {
        locationString = formData.location.address 
          ? `Address: ${formData.location.address}`
          : `Coordinates: ${formData.location.latitude.toFixed(6)}, ${formData.location.longitude.toFixed(6)}`;
      }

      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        ...(serviceType === 'care' ? {
          zip_code: formData.zipCode,
          user_location: locationString,
          care_recipient: careDetails.careRecipient || 'Self',
          referral_source: careDetails.referralSource || 'Website',
          care_needs: formData.additionalInfo || 'No specific care needs provided'
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
        // Reset care details
        setCareDetails({
          careRecipient: '',
          referralSource: ''
        });
        // Reset service type
        setServiceType('');
        // Reset form errors
        setFormErrors({});
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Unable to send message. Please try again or contact us directly.');
    }
  };

  // Add a function to validate individual fields when they are changed
  const validateField = (field: string, value: string) => {
    if (formErrors[field]) {
      const newErrors = { ...formErrors };
      if (value) {
        // Clear the error if a value is provided
        delete newErrors[field];
      }
      setFormErrors(newErrors);
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
              Call <Text style={styles.phoneLink}>(414) 240-6913</Text> or fill out the form below.
            </Text>

            {/* Service Type Selection */}
            <View style={styles.serviceTypeContainer}>
              <Text style={styles.label}>
                I'm interested in: <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity 
                  style={styles.radioOption} 
                  onPress={() => {
                    setServiceType('care');
                    // Clear any error when making a selection
                    if (formErrors.serviceType) {
                      setFormErrors(prev => ({ ...prev, serviceType: '' }));
                    }
                    // If this is the first time selecting 'care', show a location prompt
                    if (serviceType !== 'care' && !formData.location) {
                      setTimeout(() => {
                        Alert.alert(
                          'Location Helps Us Serve You Better',
                          'For home care services, sharing your location helps us connect you with caregivers in your area. Would you like to add your location?',
                          [
                            { text: 'Add Location', onPress: requestLocation },
                            { text: 'Later', style: 'cancel' }
                          ]
                        );
                      }, 500);
                    }
                  }}
                >
                  <View style={[
                    styles.radio, 
                    serviceType === 'care' && styles.radioSelected,
                    !serviceType && formErrors.serviceType ? styles.radioError : null
                  ]} />
                  <Text>Home Care Services</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.radioOption} 
                  onPress={() => {
                    setServiceType('jobs');
                    // Clear any error when making a selection
                    if (formErrors.serviceType) {
                      setFormErrors(prev => ({ ...prev, serviceType: '' }));
                    }
                  }}
                >
                  <View style={[
                    styles.radio, 
                    serviceType === 'jobs' && styles.radioSelected,
                    !serviceType && formErrors.serviceType ? styles.radioError : null
                  ]} />
                  <Text>Employment</Text>
                </TouchableOpacity>
              </View>
              {formErrors.serviceType ? (
                <Text style={styles.errorText}>{formErrors.serviceType}</Text>
              ) : null}
            </View>

            {/* Common Fields */}
            <TextInput
              style={[styles.input, formErrors.name ? styles.inputError : null]}
              placeholder="Name*"
              value={formData.name}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, name: text }));
                validateField('name', text);
              }}
            />

            <TextInput
              style={[styles.input, formErrors.email ? styles.inputError : null]}
              placeholder="Email*"
              value={formData.email}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, email: text }));
                validateField('email', text);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={[styles.input, formErrors.phone ? styles.inputError : null]}
              placeholder="Phone*"
              value={formData.phone}
              onChangeText={(text) => {
                setFormData(prev => ({ ...prev, phone: text }));
                validateField('phone', text);
              }}
              keyboardType="phone-pad"
            />

            {serviceType === 'care' ? (
              // Care Service Fields
              <>
                <View style={styles.locationContainer}>
                  <TextInput
                    style={[styles.input, styles.zipCodeInput, formErrors.zipCode ? styles.inputError : null]}
                    placeholder="Zip Code*"
                    value={formData.zipCode}
                    onChangeText={(text) => {
                      setFormData(prev => ({ ...prev, zipCode: text }));
                      validateField('zipCode', text);
                    }}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity 
                    style={[
                      styles.locationButton, 
                      serviceType === 'care' ? styles.locationButtonHighlighted : {}
                    ]}
                    onPress={requestLocation}
                    disabled={locationLoading}
                  >
                    <Ionicons name="location-outline" size={20} color="#fff" />
                    <Text style={styles.locationButtonText}>
                      {locationLoading ? 'Getting...' : formData.location ? 'Location Added' : 'Add Location'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {serviceType === 'care' && !formData.location && (
                  <Text style={styles.locationHelper}>
                    Adding your precise location helps us match you with nearby caregivers
                  </Text>
                )}
                {formData.location && (
                  <Text style={styles.locationAdded}>
                    Location: {typeof formData.location === 'object' && formData.location.address ? formData.location.address : 'Current location added'}
                  </Text>
                )}

                {/* Care Recipient Selection */}
                <Text style={styles.label}>Care is needed for:</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowModal('careRecipient')}
                >
                  <Text style={careDetails.careRecipient ? styles.inputText : styles.placeholderText}>
                    {careDetails.careRecipient || 'Who needs care?'}
                  </Text>
                </TouchableOpacity>

                {/* Referral Source */}
                <Text style={styles.label}>How did you hear about us?</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowModal('referralSource')}
                >
                  <Text style={careDetails.referralSource ? styles.inputText : styles.placeholderText}>
                    {careDetails.referralSource || 'Select referral source'}
                  </Text>
                </TouchableOpacity>

                {/* Additional Care Notes */}
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Please tell us about your care needs (Optional)"
                  value={formData.additionalInfo}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, additionalInfo: text }))}
                  multiline
                />
              </>
            ) : (
              // Employment Fields
              <>
                {renderDropdown('position', positions, 'Position Interested In*', formErrors.position)}
                {renderDropdown('experience', experiences, 'Years of Experience*', formErrors.experience)}
                {renderDropdown('availability', availabilities, 'Availability*', formErrors.availability)}

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

      {/* Add modals for the new dropdown fields */}
      {showModal === 'careRecipient' && (
        <Modal
          visible={true}
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
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Who needs care?</Text>
                <TouchableOpacity onPress={() => setShowModal('')}>
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {careRecipients.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.modalOption}
                    onPress={() => {
                      setCareDetails(prev => ({ ...prev, careRecipient: option }));
                      setShowModal('');
                    }}
                  >
                    <Text style={styles.modalOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {showModal === 'referralSource' && (
        <Modal
          visible={true}
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
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>How did you hear about us?</Text>
                <TouchableOpacity onPress={() => setShowModal('')}>
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {referralSources.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.modalOption}
                    onPress={() => {
                      setCareDetails(prev => ({ ...prev, referralSource: option }));
                      setShowModal('');
                    }}
                  >
                    <Text style={styles.modalOptionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
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
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
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
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    minHeight: 48,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 14,
    lineHeight: 22,
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
    flexWrap: 'wrap',
  },
  placeholderText: {
    color: '#9ca3af',
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
    paddingVertical: 12,
    flexWrap: 'wrap',
  },
  required: {
    color: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
  },
  radioError: {
    borderColor: '#ff0000',
  },
  inputError: {
    borderColor: '#ff0000',
  },
  locationButtonHighlighted: {
    backgroundColor: '#2563EB', // Brighter blue to draw attention
    borderWidth: 2,
    borderColor: '#1E40AF',
  },
  locationHelper: {
    fontSize: 12,
    color: '#4B5563',
    fontStyle: 'italic',
    marginBottom: 12,
    marginTop: -6,
  },
  locationAdded: {
    fontSize: 13,
    color: '#059669', // Success green color
    marginBottom: 15,
    fontWeight: '500',
  },
}); 
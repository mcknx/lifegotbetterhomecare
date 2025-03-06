import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Switch,
  Alert,
  Platform,
  Linking,
  Modal,
  ActivityIndicator,
  Dimensions,
  RefreshControl
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as WebBrowser from 'expo-web-browser';
import { theme } from '../theme';

// Configure notifications but disable actual token fetching
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Add this helper function for simulated notifications
const showSimulatedNotification = (title: string, body: string) => {
  // In a real app, this would be a push notification
  // For now, just show an alert
  Alert.alert(title, body);
};

// Training type definition
interface Training {
  id: string;
  title: string;
  description: string;
  image: string;
  availability: string;
  duration: string;
  notificationChannel: string;
  price?: string;
  originalPrice?: string;
  classHours?: string;
  additionalDetails?: string;
  scheduleUrl?: string;
  requirements?: string[];
}

const TrainingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Record<string, boolean>>({});
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Screen dimension states
  const { width, height } = Dimensions.get('window');
  const [isLandscape, setIsLandscape] = useState(width > height);
  const isSmallScreen = width < 360;

  // Add state for training data and loading states
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API URL for trainings
  const API_URL = 'https://lifegotbetterhomecare.com/api/trainings';

  // Fetch trainings from the API
  const fetchTrainings = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching trainings:', error);
      throw error;
    }
  };

  // Load trainings on component mount
  useEffect(() => {
    const loadTrainings = async () => {
      setLoading(true);
      try {
        const trainingsData = await fetchTrainings();
        setTrainings(trainingsData);
      } catch (error) {
        console.error('Error loading trainings:', error);
        setTrainings([]);
        setError('Failed to load trainings. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    loadTrainings();
  }, []);

  // Add refreshing logic for pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const trainingsData = await fetchTrainings();
      setTrainings(trainingsData);
      setError(null);
    } catch (error) {
      console.error('Error refreshing trainings:', error);
      setError('Failed to refresh trainings. Please try again.');
    } finally {
      setRefreshing(false);
    }
  };

  // Add orientation change handler
  useEffect(() => {
    const onChange = () => {
      const { width, height } = Dimensions.get('window');
      // Force re-render when orientation changes
      setIsLandscape(width > height);
    };

    // Use the newer API to handle dimension changes
    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      // Clean up using the newer API
      subscription.remove();
    };
  }, []);

  // Request notification permissions
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        
        if (finalStatus === 'granted') {
          // We're using local notifications only, so we don't need to fetch an Expo push token
          // This removes the error message about invalid project ID
          setNotificationsEnabled(true);
        }
      } catch (error) {
        console.error('Error requesting notification permissions:', error);
      }
    };

    requestPermissions();
  }, []);

  // Toggle notification for a specific training
  const toggleTrainingNotification = async (training: Training, value: boolean) => {
    try {
      const newSubscriptions = { ...subscriptions };
      newSubscriptions[training.id] = value;
      setSubscriptions(newSubscriptions);
      
      if (value) {
        // Request permission for local notifications
        const { status } = await Notifications.getPermissionsAsync();
        
        if (status !== 'granted') {
          const { status: newStatus } = await Notifications.requestPermissionsAsync();
          
          if (newStatus !== 'granted') {
            Alert.alert(
              'Permission Required',
              'Please enable notifications in your device settings to receive training updates.',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Settings', 
                  onPress: () => {
                    if (Platform.OS === 'ios') {
                      Linking.openURL('app-settings:');
                    } else {
                      Linking.openSettings();
                    }
                  }
                }
              ]
            );
            return;
          }
        }
        
        // Show an immediate notification as a demonstration
        await Notifications.presentNotificationAsync({
          title: `${training.title} Update`,
          body: `New ${training.title} session available. Check the class schedule!`,
          data: { trainingId: training.id },
        });
        
        // Show confirmation
        Alert.alert(
          'Notification Enabled',
          `You will receive updates about the ${training.title} training.`
        );
      } else {
        // Show confirmation for turning off
        Alert.alert(
          'Notification Disabled',
          `You will no longer receive updates about the ${training.title} training.`
        );
      }
    } catch (error) {
      console.error('Error toggling training notification:', error);
      Alert.alert('Error', 'There was a problem managing your notification settings.');
    }
  };

  // Toggle notifications for all trainings
  const toggleAllNotifications = async (value: boolean) => {
    try {
      if (value) {
        // Request permission for local notifications
        const { status } = await Notifications.getPermissionsAsync();
        
        if (status !== 'granted') {
          const { status: newStatus } = await Notifications.requestPermissionsAsync();
          
          if (newStatus !== 'granted') {
            Alert.alert(
              'Permission Required',
              'Please enable notifications in your device settings to receive training updates.',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Settings', 
                  onPress: () => {
                    if (Platform.OS === 'ios') {
                      Linking.openURL('app-settings:');
                    } else {
                      Linking.openSettings();
                    }
                  }
                }
              ]
            );
            return;
          }
        }
        
        // Create a new object with all trainings subscribed
        const newSubscriptions: Record<string, boolean> = {};
        trainings.forEach((training, index) => {
          newSubscriptions[training.id] = true;
          
          // Show an immediate notification with slight delay for each training
          setTimeout(() => {
            showImmediateNotification(training);
          }, index * 1000); // Stagger notifications by 1 second
        });
        
        setSubscriptions(newSubscriptions);
      } else {
        // If turning off, unsubscribe from all
        setSubscriptions({});
      }
      
      setNotificationsEnabled(value);
    } catch (error) {
      console.error('Error toggling notifications:', error);
      Alert.alert('Error', 'There was a problem managing your notification settings.');
    }
  };

  // Show an immediate notification
  const showImmediateNotification = async (training: Training) => {
    try {
      await Notifications.presentNotificationAsync({
        title: `${training.title} Update`,
        body: `New ${training.title} session available. Check the class schedule!`,
        data: { trainingId: training.id },
      });
    } catch (error) {
      console.log('Error showing notification:', error);
    }
  };

  // For backward compatibility
  const scheduleTrainingNotification = async (training: Training) => {
    await showImmediateNotification(training);
  };

  // Open the class schedule PDF
  const openSchedulePdf = async (url: string) => {
    try {
      setIsLoading(true);
      const result = await WebBrowser.openBrowserAsync(url);
      setIsLoading(false);
      console.log('PDF opened with result:', result);
    } catch (error) {
      setIsLoading(false);
      console.error('Error opening PDF:', error);
      Alert.alert('Error', 'There was a problem opening the class schedule. Please try again later.');
    }
  };

  // Show detailed information about a training
  const showTrainingDetails = (training: Training) => {
    setSelectedTraining(training);
    setDetailsModalVisible(true);
  };

  // Render a training card
  const renderTrainingCard = (training: Training) => {
    const isSubscribed = subscriptions[training.id] || false;
    
    // Portrait mode layout (optimized for space)
    return (
      <View key={training.id} style={styles.trainingCard}>
        <View style={styles.trainingCardContent}>
          {/* Left side with image */}
          <Image 
            source={{ uri: training.image }} 
            style={styles.trainingImageCompact}
            resizeMode="cover"
          />
          
          {/* Right side with content */}
          <View style={styles.trainingContentWrapper}>
            <Text style={styles.trainingTitle}>{training.title}</Text>
            
            <View style={styles.trainingMetaContainer}>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={14} color="#666" style={styles.metaIcon} />
                <Text style={styles.metaText} numberOfLines={1} ellipsizeMode="tail">
                  {training.availability}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={14} color="#666" style={styles.metaIcon} />
                <Text style={styles.metaText} numberOfLines={1} ellipsizeMode="tail">
                  {training.duration}
                </Text>
              </View>
            </View>
            
            {training.price && (
              <View style={styles.pricingContainer}>
                {training.originalPrice && (
                  <Text style={styles.originalPrice}>{training.originalPrice}</Text>
                )}
                <Text style={styles.price}>{training.price}</Text>
                {training.id === '1' && (
                  <Text style={styles.priceNote}>Down payment (50% of full price)</Text>
                )}
              </View>
            )}
            
            {training.classHours && (
              <View style={styles.classHoursContainer}>
                <Text style={styles.classHoursLabel}>Class Hours:</Text>
                <Text style={styles.classHours}>
                  {training.classHours}
                </Text>
              </View>
            )}
            
            <Text style={styles.trainingDescription}>
              {training.description}
            </Text>
          </View>
        </View>
        
        {/* Compact buttons row */}
        <View style={styles.compactButtonsRow}>
          {/* Register Now button */}
          <TouchableOpacity 
            style={styles.registerNowButtonCompact}
            onPress={() => {
              Alert.alert(
                'Registration',
                'Would you like to register for this training program?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { 
                    text: 'Register Now', 
                    onPress: () => {
                      if (training.id === '1') {
                        Linking.openURL('https://lgbstaffing.com/cna-certification/');
                      } else {
                        Linking.openURL('https://lgbstaffing.com/training/');
                      }
                    }
                  }
                ]
              );
            }}
          >
            <Ionicons name="log-in-outline" size={16} color="#fff" style={{marginRight: 5}} />
            <Text style={styles.registerNowButtonTextCompact}>Register Now</Text>
          </TouchableOpacity>
          
          {/* Details button */}
          <TouchableOpacity 
            style={styles.detailsButtonCompact}
            onPress={() => showTrainingDetails(training)}
          >
            <Ionicons name="information-circle" size={16} color="#fff" style={{marginRight: 3}} />
            <Text style={styles.detailsButtonTextCompact}>Details</Text>
          </TouchableOpacity>
          
          {/* Schedule button */}
          {training.scheduleUrl && (
            <TouchableOpacity 
              style={styles.scheduleButtonCompact}
              onPress={() => openSchedulePdf(training.scheduleUrl || '')}
              disabled={isLoading}
            >
              <Ionicons name="calendar" size={16} color="#fff" style={{marginRight: 3}} />
              <Text style={styles.scheduleButtonTextCompact}>
                {isLoading ? 'Opening...' : 'Schedule'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Notification toggle */}
        <View style={styles.notificationToggleCompact}>
          <Text style={styles.notificationTextCompact}>
            {isSubscribed ? 'Notifications On' : 'Get Notified'}
          </Text>
          <Switch
            value={isSubscribed}
            onValueChange={(value) => toggleTrainingNotification(training, value)}
            trackColor={{ false: '#d1d5db', true: theme.colors.primary }}
            thumbColor={isSubscribed ? theme.colors.accent : '#f4f3f4'}
            disabled={!notificationsEnabled}
          />
        </View>
      </View>
    );
  };

  // Render the training details modal
  const renderDetailsModal = () => {
    if (!selectedTraining) return null;
    
    return (
      <Modal
        visible={detailsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDetailsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedTraining.title}</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setDetailsModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScrollView}>
              <Image 
                source={{ uri: selectedTraining.image }} 
                style={styles.modalImage}
                resizeMode="cover"
              />
              
              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Program Overview</Text>
                <Text style={styles.sectionText}>{selectedTraining.description}</Text>
              </View>
              
              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Duration & Schedule</Text>
                <Text style={styles.sectionText}>
                  <Text style={styles.boldText}>Availability: </Text>{selectedTraining.availability}{'\n'}
                  <Text style={styles.boldText}>Duration: </Text>{selectedTraining.duration}{'\n'}
                  <Text style={styles.boldText}>Class Hours: </Text>{selectedTraining.classHours}
                </Text>
              </View>
              
              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Pricing</Text>
                <View style={styles.modalPricing}>
                  {selectedTraining.originalPrice && (
                    <Text style={styles.modalOriginalPrice}>{selectedTraining.originalPrice}</Text>
                  )}
                  <Text style={styles.modalPrice}>{selectedTraining.price}</Text>
                  {selectedTraining.id === '1' && (
                    <Text style={styles.modalPriceNote}>
                      Down payment (50% of full price) required 3 days before class starts
                    </Text>
                  )}
                </View>
              </View>
              
              {selectedTraining.additionalDetails && (
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Program Details</Text>
                  <Text style={styles.sectionText}>{selectedTraining.additionalDetails}</Text>
                </View>
              )}
              
              {selectedTraining.requirements && selectedTraining.requirements.length > 0 && (
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Requirements</Text>
                  {selectedTraining.requirements.map((req, index) => (
                    <View key={index} style={styles.requirementItem}>
                      <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                      <Text style={styles.requirementText}>{req}</Text>
                    </View>
                  ))}
                </View>
              )}
              
              <TouchableOpacity 
                style={styles.registerButton}
                onPress={() => {
                  setDetailsModalVisible(false);
                  Alert.alert(
                    'Registration',
                    'Would you like to register for this training program?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { 
                        text: 'Register Now', 
                        onPress: () => {
                          if (selectedTraining.id === '1') {
                            Linking.openURL('https://lgbstaffing.com/cna-certification/');
                          } else {
                            Linking.openURL('https://lgbstaffing.com/training/');
                          }
                        }
                      }
                    ]
                  );
                }}
              >
                <Text style={styles.registerButtonText}>Register Now</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0066cc']}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Healthcare Certification Pathways</Text>
          <Text style={styles.subtitle}>
            Enhance your skills with our professional training programs. Subscribe to get notified about upcoming sessions.
          </Text>
          
          <View style={styles.notificationsHeader}>
            <Text style={styles.notificationsTitle}>Training Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleAllNotifications}
              trackColor={{ false: '#d1d5db', true: theme.colors.primary }}
              thumbColor={notificationsEnabled ? theme.colors.accent : '#f4f3f4'}
            />
          </View>
        </View>
        
        {loading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0066cc" />
            <Text style={styles.loadingText}>Loading trainings...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton} 
              onPress={onRefresh}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : trainings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No trainings available</Text>
          </View>
        ) : (
          <View style={styles.trainingsContainer}>
            {trainings.map(training => renderTrainingCard(training))}
          </View>
        )}
        
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Why Choose Our Training Programs?</Text>
          
          <View style={styles.infoItem}>
            <Ionicons name="school-outline" size={24} color={theme.colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoItemTitle}>Experienced Instructors</Text>
              <Text style={styles.infoItemText}>
                Learn from seasoned professionals with extensive experience in the field.
              </Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={24} color={theme.colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoItemTitle}>Flexible Learning Options</Text>
              <Text style={styles.infoItemText}>
                We offer both in-person and online training to accommodate various learning preferences.
              </Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="briefcase-outline" size={24} color={theme.colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoItemTitle}>Career Support</Text>
              <Text style={styles.infoItemText}>
                Access resources and guidance to help kickstart or advance your career in healthcare.
              </Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="document-text-outline" size={24} color={theme.colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoItemTitle}>Comprehensive Curriculum</Text>
              <Text style={styles.infoItemText}>
                Our programs cover the latest industry standards and best practices.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      {renderDetailsModal()}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.overlayLoadingText}>Opening class schedule...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.secondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
  },
  notificationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  trainingsContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  trainingCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  trainingCardContent: {
    flexDirection: 'row',
  },
  trainingImageCompact: {
    width: 120,
    height: 140,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  trainingContentWrapper: {
    flex: 1,
    padding: 10,
  },
  trainingTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 5,
  },
  trainingMetaContainer: {
    marginBottom: 5,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaIcon: {
    marginRight: 5,
    width: 16,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  pricingContainer: {
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.success,
  },
  originalPrice: {
    fontSize: 16,
    color: theme.colors.secondary,
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },
  priceNote: {
    fontSize: 12,
    color: theme.colors.secondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  classHoursContainer: {
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
    padding: 6,
    borderRadius: 5,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  classHoursLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.secondary,
    marginBottom: 2,
  },
  classHours: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
  },
  trainingDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 18,
    marginBottom: 5,
  },
  trainingActions: {
    padding: 15,
    paddingTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  scheduleButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  scheduleButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  notificationToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f9ff',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  notificationText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 10,
  },
  infoSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  infoContent: {
    flex: 1,
    marginLeft: 15,
  },
  infoItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  infoItemText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '90%',
    maxHeight: '90%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  closeButton: {
    padding: 5,
  },
  modalScrollView: {
    maxHeight: '100%',
  },
  modalImage: {
    width: '100%',
    height: 200,
  },
  modalSection: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  boldText: {
    fontWeight: 'bold',
  },
  modalPricing: {
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.success,
  },
  modalOriginalPrice: {
    fontSize: 18,
    color: theme.colors.secondary,
    textDecorationLine: 'line-through',
    marginBottom: 5,
  },
  modalPriceNote: {
    fontSize: 14,
    color: theme.colors.secondary,
    fontStyle: 'italic',
    marginTop: 5,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  modalScheduleButton: {
    backgroundColor: theme.colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    margin: 15,
  },
  modalScheduleButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  registerButton: {
    backgroundColor: theme.colors.success,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayLoadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  trainingCardLandscape: {
    width: '100%',
  },
  landscapeRightColumn: {
    width: 160,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  actionButtonsLandscape: {
    flexDirection: 'column',
    width: '100%',
  },
  registerNowButton: {
    backgroundColor: theme.colors.success,
    padding: 12,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  registerNowButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  compactButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 6,
  },
  registerNowButtonCompact: {
    backgroundColor: theme.colors.success,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.2,
    marginRight: 5,
  },
  registerNowButtonTextCompact: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  detailsButtonCompact: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
    marginHorizontal: 5,
  },
  detailsButtonTextCompact: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  scheduleButtonCompact: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.9,
    marginLeft: 5,
  },
  scheduleButtonTextCompact: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  notificationToggleCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f9ff',
    padding: 6,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  notificationTextCompact: {
    fontSize: 13,
    color: '#666',
    flex: 1,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#0066cc',
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#cc0000',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
});

export default TrainingsScreen; 
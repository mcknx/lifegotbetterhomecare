import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { ImageCarousel } from '../components/ImageCarousel';
import { QuickActions } from '../components/QuickActions';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const carouselImages = [
    require('../assets/healthcare-worker.jpg'),
    require('../assets/nurse-patient.jpg'),
    // Add more images as needed
  ];

  const handleFindCareNearMe = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'We need location permissions to find care providers near you.',
          [{ text: 'OK' }]
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      navigation.navigate('FindCare', { location: currentLocation });
    } catch (error) {
      Alert.alert(
        'Error',
        'Unable to access location. Please make sure location services are enabled.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Carousel Section */}
      <View style={styles.carouselContainer}>
        <ImageCarousel images={carouselImages} />
      </View>

      {/* Quick Actions Section */}
      <QuickActions onFindCarePress={handleFindCareNearMe} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    height: width * 0.6, // Aspect ratio 5:3
    marginBottom: 20,
  },
  tipContainer: {
    padding: 20,
    backgroundColor: theme.colors.background,
  },
});

export default HomeScreen;

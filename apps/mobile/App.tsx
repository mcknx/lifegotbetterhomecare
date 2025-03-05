import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';
import * as Location from 'expo-location';
import { Button, View, StyleSheet, TouchableOpacity, Text } from 'react-native';

// Screens
import LandingScreen from './screens/LandingScreen';
import ServicesScreen from './screens/ServicesScreen';
import ContactScreen from './screens/ContactScreen';
import JobsScreen from './screens/JobsScreen';
import TrainingsScreen from './screens/TrainingsScreen';

// Theme
import { theme } from './theme';
import { styles } from './AppStyles';

// Storage keys
const THEME_PREFERENCE_KEY = 'user_theme_preference';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Landing':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Services':
              iconName = focused ? 'medical' : 'medical-outline';
              break;
            case 'Jobs':
              iconName = focused ? 'briefcase' : 'briefcase-outline';
              break;
            case 'Trainings':
              iconName = focused ? 'school' : 'school-outline';
              break;
            case 'FindCare':
              iconName = focused ? 'location' : 'location-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.primary,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: theme.colors.white,
        },
        tabBarStyle: {
          elevation: 10,
          shadowOpacity: 0.1,
          shadowRadius: 4,
          paddingTop: 5,
          paddingBottom: 25, // Increased padding for iPhone 15 Pro home indicator
          height: 75, // Increased height to accommodate the home indicator
          borderTopWidth: 0,
          backgroundColor: '#ffffff',
          safeAreaInsets: { bottom: 10 }, // Add safe area insets for modern iPhones
        },
        tabBarLabelStyle: {
          fontWeight: '500',
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarItemStyle: {
          padding: 5,
        },
        tabBarBadgeStyle: {
          backgroundColor: theme.colors.accent,
        },
      })}
    >
      <Tab.Screen 
        name="Landing" 
        component={LandingScreen} 
        options={{ 
          title: 'Home',
          headerTitle: 'Life Got Better Homecare',
          tabBarBadge: undefined, 
        }} 
      />
      <Tab.Screen 
        name="Services" 
        component={ServicesScreen}
        options={{ 
          title: 'Services',
          headerTitle: 'Our Services',
        }} 
      />
      <Tab.Screen 
        name="Jobs" 
        component={JobsScreen}
        options={{ 
          title: 'Jobs',
          headerTitle: 'Career Opportunities',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Trainings" 
        component={TrainingsScreen}
        options={{ 
          title: 'Trainings',
          headerTitle: 'Training Programs',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school-outline" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Contact" 
        component={ContactScreen} 
        options={{ 
          title: 'Contact',
          headerTitle: 'Contact Us',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mail-outline" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [userThemePreference, setUserThemePreference] = useState('default');
  const [locationPermission, setLocationPermission] = useState(false);

  // Load user theme preference from AsyncStorage on app start
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (savedTheme) {
          setUserThemePreference(savedTheme);
          console.log('Loaded user theme preference:', savedTheme);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };

    loadThemePreference();
  }, []);

  // Save theme preference function
  const saveThemePreference = async (themeType: string) => {
    try {
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, themeType);
      setUserThemePreference(themeType);
      console.log('Saved user theme preference:', themeType);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
        const location = await Location.getCurrentPositionAsync({});
        console.log('Location obtained:', location);
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  // Share app info
  const shareAppInfo = async () => {
    try {
      const shareOptions = {
        dialogTitle: 'Share Life Got Better Homecare',
        UTI: 'public.url',
        mimeType: 'text/plain'
      };
      
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync('https://lifegotbetterhomecare.com', shareOptions);
      } else {
        alert('Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error sharing app info:', error);
    }
  };

  return (
    <SafeAreaProvider
      style={{ flex: 1 }}
      initialSafeAreaInsets={{ top: 0, right: 0, bottom: 34, left: 0 }} // Default insets for iPhone with home indicator
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.white,
            },
            headerTintColor: theme.colors.primary,
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen
            name="MainTabs"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />

        {/* Native functionality demo buttons - floating at bottom right */}
        <View style={styles.nativeFeaturesContainer}>
          {/* <TouchableOpacity 
            style={styles.featureButton} 
            onPress={() => saveThemePreference(userThemePreference === 'default' ? 'dark' : 'default')}
          >
            <Ionicons name="color-palette-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Theme: {userThemePreference}</Text>
          </TouchableOpacity> */}
          
          {/* <TouchableOpacity 
            style={styles.featureButton} 
            onPress={requestLocationPermission}
          >
            <Ionicons name="location-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>{locationPermission ? 'Location Enabled' : 'Enable Location'}</Text>
          </TouchableOpacity> */}
          
          {/* <TouchableOpacity 
            style={styles.featureButton} 
            onPress={shareAppInfo}
          >
            <Ionicons name="share-social-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Share App</Text>
          </TouchableOpacity> */}
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  View, 
  Text, 
  TouchableOpacity, 
  RefreshControl,
  Platform, 
  StatusBar,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';

// Components
import { HeroSection } from '../components/HeroSection';
import { BenefitsSection } from '../components/BenefitsSection';
import { FindCareSection } from '../components/FindCareSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { ContactSection } from '../components/ContactSection';
import { CareersSection } from '../components/CareersSection';
import { Footer } from '../components/Footer';

// Theme
import { theme } from '../theme';

const WELCOME_STORAGE_KEY = 'hasShownWelcomeMessage';

const LandingScreen = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [refreshing, setRefreshing] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(false);
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<Record<string, number>>({});
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as { scrollToContact?: boolean } || {};

  useEffect(() => {
    checkWelcomeStatus();
  }, []);
  
  // Handle scrollToContact parameter from navigation
  useEffect(() => {
    if (params.scrollToContact && sectionRefs.current.contact) {
      setTimeout(() => {
        scrollToSection('contact');
      }, 500); // Short delay to ensure component is fully rendered
    }
  }, [params]);

  const checkWelcomeStatus = async () => {
    try {
      const hasShown = await AsyncStorage.getItem(WELCOME_STORAGE_KEY);
      if (!hasShown) {
        setShowWelcomeAnimation(true);
        // Start the welcome animation
        Animated.timing(welcomeOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(async () => {
          // After animation completes, set a timeout to hide it
          setTimeout(() => {
            Animated.timing(welcomeOpacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              setShowWelcomeAnimation(false);
            });
          }, 2000);
        });
        await AsyncStorage.setItem(WELCOME_STORAGE_KEY, 'true');
      }
      setHasShownWelcome(!!hasShown);
    } catch (error) {
      console.error('Failed to check welcome status', error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    
    // Simulate fetching updated content
    try {
      // This would typically fetch updated data from an API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear the welcome message status to show it again
      await AsyncStorage.removeItem(WELCOME_STORAGE_KEY);
      setHasShownWelcome(false);
      checkWelcomeStatus();
    } catch (error) {
      console.error('Refresh failed', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const measureSection = (sectionId: string, y: number) => {
    sectionRefs.current[sectionId] = y;
  };

  const scrollToSection = (sectionId: string) => {
    const yOffset = sectionRefs.current[sectionId] || 0;
    scrollViewRef.current?.scrollTo({
      y: yOffset,
      animated: true
    });
    setActiveSection(sectionId);
  };

  const navigateToFindCare = () => {
    navigation.navigate('FindCare' as never);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {showWelcomeAnimation && (
        <Animated.View style={[styles.welcomeOverlay, { opacity: welcomeOpacity }]}>
          <Ionicons name="heart" size={50} color={theme.colors.white} />
          <Text style={styles.welcomeText}>Welcome to Life Got Better Homecare</Text>
          <Text style={styles.welcomeSubtext}>We're here to provide care that makes a difference</Text>
        </Animated.View>
      )}

      <ScrollView 
        ref={scrollViewRef}
        style={styles.content}
        showsVerticalScrollIndicator={true}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            colors={[theme.colors.primary]} 
            tintColor={theme.colors.primary}
          />
        }
        onScroll={({ nativeEvent }) => {
          // Update active section based on scroll position
          const offset = nativeEvent.contentOffset.y;
          const sections = ['home', 'quick-actions', 'daily-tip', 'benefits', 'find-care', 'about', 'services', 'careers', 'contact'];
          const viewportHeight = nativeEvent.layoutMeasurement.height;
          const contentHeight = nativeEvent.contentSize.height;
          
          // Simple calculation to determine which section is most visible
          const scrollPercentage = offset / (contentHeight - viewportHeight);
          const sectionIndex = Math.floor(scrollPercentage * sections.length);
          setActiveSection(sections[Math.min(sectionIndex, sections.length - 1)] || 'home');
        }}
        scrollEventThrottle={16}
      >
        <View 
          style={styles.section} 
          onLayout={({ nativeEvent }) => measureSection('home', nativeEvent.layout.y)}>
          <HeroSection onContactPress={() => navigation.navigate('Contact' as never)} />
        </View>
        
        {/* <View 
          style={styles.actionSection}
          onLayout={({ nativeEvent }) => measureSection('quick-actions', nativeEvent.layout.y)}>
          <QuickActions 
            onFindCarePress={navigateToFindCare} 
            onContactPress={() => scrollToSection('contact')} 
          />
        </View> */}
        
        <View 
          style={styles.section}
          onLayout={({ nativeEvent }) => measureSection('benefits', nativeEvent.layout.y)}>
          <BenefitsSection />
        </View>
        
        <View 
          style={styles.section}
          onLayout={({ nativeEvent }) => measureSection('find-care', nativeEvent.layout.y)}>
          <FindCareSection 
            onContactPress={() => scrollToSection('contact')}
            onServicesPress={() => scrollToSection('services')}
          />
        </View>
        
        <View 
          style={styles.section}
          onLayout={({ nativeEvent }) => measureSection('about', nativeEvent.layout.y)}>
          <AboutSection />
        </View>
        
        
        <View 
          style={styles.section}
          onLayout={({ nativeEvent }) => measureSection('careers', nativeEvent.layout.y)}>
          <CareersSection onContactPress={() => navigation.navigate('Contact' as never)} />
        </View>
        
                {/* Contact section moved to a separate tab */}
        <Footer />
      </ScrollView>
      
      {/* <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => navigation.navigate('FindCare' as never)}
      >
        <Ionicons name="location" size={24} color={theme.colors.white} />
        <Text style={styles.floatingButtonText}>Find Care</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  section: {
    minHeight: Dimensions.get('window').height * 0.7,
    padding: 20,
    marginBottom: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
  },
  actionSection: {
    padding: 0,
    marginBottom: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
  },
  tipSection: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 8,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  floatingButtonText: {
    color: theme.colors.white,
    fontWeight: '600',
    marginLeft: 8,
  },
  welcomeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  welcomeText: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.xxl,
    fontWeight: theme.typography.fontWeights.bold,
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  welcomeSubtext: {
    color: theme.colors.white,
    fontSize: theme.typography.fontSizes.md,
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default LandingScreen;

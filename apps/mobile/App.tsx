import React, { useState, useRef } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NavigationBar from './components/NavigationBar';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { FindCareSection } from './components/FindCareSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SECTION_HEIGHT } from './constants';
import { ContactSection } from './components/ContactSection';
import { CareersSection } from './components/CareersSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionRefs = useRef<Record<string, number>>({});

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <NavigationBar 
        activeSection={activeSection}
        onSectionChange={scrollToSection}
      />
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.content}
        showsVerticalScrollIndicator={true}
        onScroll={({ nativeEvent }) => {
          // Update active section based on scroll position
          const offset = nativeEvent.contentOffset.y;
          const sections = ['home', 'benefits', 'find-care', 'about', 'services', 'careers', 'contact'];
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
          <HeroSection />
        </View>
        
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
          onLayout={({ nativeEvent }) => measureSection('services', nativeEvent.layout.y)}>
          <ServicesSection />
        </View>
        
        <View 
          style={styles.section}
          onLayout={({ nativeEvent }) => measureSection('careers', nativeEvent.layout.y)}>
          <CareersSection />
        </View>
        
        <View 
          style={styles.section}
          onLayout={({ nativeEvent }) => measureSection('contact', nativeEvent.layout.y)}>
          <ContactSection />
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    minHeight: Dimensions.get('window').height,
    padding: 20,
    backgroundColor: '#fff',
  },
});

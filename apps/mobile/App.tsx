import React, { useState, useRef } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
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

  const scrollToSection = (sectionId: string) => {
    const sectionOffsets: Record<string, number> = {
      'home': 0,
      'benefits': SECTION_HEIGHT,
      'find-care': SECTION_HEIGHT * 2,
      'about': SECTION_HEIGHT * 3,
      'services': SECTION_HEIGHT * 4,
      'careers': SECTION_HEIGHT * 5,
      'contact': SECTION_HEIGHT * 6,
    };

    scrollViewRef.current?.scrollTo({
      y: sectionOffsets[sectionId] || 0,
      animated: true,
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
        snapToInterval={SECTION_HEIGHT}
        decelerationRate="fast"
        onScroll={({ nativeEvent }) => {
          const offset = nativeEvent.contentOffset.y;
          if (offset < SECTION_HEIGHT / 2) {
            setActiveSection('home');
          } else if (offset < SECTION_HEIGHT * 1.5) {
            setActiveSection('benefits');
          } else if (offset < SECTION_HEIGHT * 2.5) {
            setActiveSection('find-care');
          } else if (offset < SECTION_HEIGHT * 3.5) {
            setActiveSection('about');
          } else if (offset < SECTION_HEIGHT * 4.5) {
            setActiveSection('services');
          } else if (offset < SECTION_HEIGHT * 5.5) {
            setActiveSection('careers');
          } else {
            setActiveSection('contact');
          }
        }}
        scrollEventThrottle={16}
      >
        <HeroSection />
        <BenefitsSection />
        <FindCareSection 
          onContactPress={() => scrollToSection('contact')}
          onServicesPress={() => scrollToSection('services')}
        />
        <AboutSection />
        <ServicesSection />
        <CareersSection />
        <ContactSection />
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
  },
});

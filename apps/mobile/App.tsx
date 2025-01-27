import React, { useState, useRef } from 'react';
import { ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import NavigationBar from './components/NavigationBar';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { FindCareSection } from './components/FindCareSection';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToSection = (sectionId: string) => {
    const sectionOffsets: Record<string, number> = {
      'home': 0,
      'benefits': 600,
      'find-care': 1200,
      // Add other sections as needed
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
        onScroll={({ nativeEvent }) => {
          const offset = nativeEvent.contentOffset.y;
          if (offset < 300) {
            setActiveSection('home');
          } else if (offset < 900) {
            setActiveSection('benefits');
          } else if (offset < 1500) {
            setActiveSection('find-care');
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
        {/* Other sections will go here */}
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

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function BenefitsSection() {
  const [activePage, setActivePage] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const services = [
    { icon: 'shield-outline', title: "Personal Care" },
    { icon: 'heart-outline', title: "Memory Care" },
    { icon: 'home-outline', title: "Hospice Support" },
    { icon: 'car-outline', title: "Mobility Assistance" },
    { icon: 'restaurant-outline', title: "Meal Prep" },
    { icon: 'car-sport-outline', title: "Transportation" },
    { icon: 'clipboard-outline', title: "Housekeeping" },
    { icon: 'medical-outline', title: "Medication Reminders" },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffset / screenWidth);
    setActivePage(page);
  };

  // Split services into pages of 4
  const pages = services.reduce((acc, _, i) => {
    if (i % 4 === 0) {
      acc.push(services.slice(i, i + 4));
    }
    return acc;
  }, [] as typeof services[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        What personalized care can look like
      </Text>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {pages.map((page, pageIndex) => (
          <View key={pageIndex} style={[styles.page, { width: screenWidth }]}>
            <View style={styles.grid}>
              {page.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <View style={styles.iconContainer}>
                    <Ionicons 
                      name={service.icon as any} 
                      size={32} 
                      color="#2563EB"
                    />
                  </View>
                  <Text style={styles.serviceTitle}>
                    {service.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activePage && styles.paginationDotActive
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  page: {
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  serviceItem: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#2563EB',
  },
}); 
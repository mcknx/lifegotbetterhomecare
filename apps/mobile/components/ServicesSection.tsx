import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function ServicesSection() {
  const [activePage, setActivePage] = useState(0);
  const services = [
    {
      icon: 'coffee',
      title: "Meal Preparation",
      description: "Our caregivers provide daily meal preparation and serving for clients who are unable to cook."
    },
    {
      icon: 'activity',
      title: "After Surgery Care",
      description: "Supporting smooth transition after hospital stays with health monitoring and medication reminders."
    },
    {
      icon: 'users',
      title: "Respite Care",
      description: "Giving family caregivers a break while providing exceptional care for your loved ones."
    },
    {
      icon: 'map-pin',
      title: "Transportation",
      description: "Assistance with transportation and handling errands for those unable to drive."
    },
    {
      icon: 'home',
      title: "Light Housekeeping",
      description: "Maintaining a clean and tidy home with laundry, sweeping, and dusting services."
    },
    {
      icon: 'clipboard',
      title: "Care Management",
      description: "We assist in managing your loved ones' care by helping with scheduling, medication reminders, and doctor visits."
    },
    {
      icon: 'smile',
      title: "Companion Care",
      description: "Our caregivers provide friendship and engage your loved ones in conversations and enjoyable activities."
    },
    {
      icon: 'shield',
      title: "Elderly Fall Prevention",
      description: "Our caregivers ensure safety by taking precautions to minimize fall risks and maintaining a clutter-free environment."
    },
    {
      icon: 'user',
      title: "Personal Care and Grooming",
      description: "Assistance with personal care activities, including restroom use, dressing, oral hygiene, and bathing."
    }
  ];

  const windowWidth = Dimensions.get('window').width;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(services.length / itemsPerPage);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const page = Math.round(contentOffset / windowWidth);
    setActivePage(page);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>EXPERTISE</Text>
          <Text style={styles.title}>Commitment to your needs</Text>
          <Text style={styles.description}>
            A specialist caregiver is available for any need. We are available in 150+ locations.
          </Text>
        </View>

        {/* Services List with Pagination */}
        <View style={styles.servicesWrapper}>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={Array.from({ length: totalPages })}
            onScroll={handleScroll}
            renderItem={({ index: pageIndex }) => (
              <View style={[styles.servicesPage, { width: windowWidth - 40 }]}>
                {services
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((service, index) => (
                    <View key={index} style={styles.serviceItem}>
                      <View style={styles.iconContainer}>
                        <Feather name={service.icon as any} size={24} color="#2563eb" />
                      </View>
                      <View style={styles.textContainer}>
                        <Text style={styles.serviceTitle}>{service.title}</Text>
                        <Text style={styles.serviceDescription}>{service.description}</Text>
                      </View>
                    </View>
                  ))}
              </View>
            )}
          />

          {/* Pagination Dots */}
          <View style={styles.paginationDots}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: index === activePage ? '#2563eb' : '#e5e7eb' }
                ]}
              />
            ))}
          </View>
        </View>

        {/* Stats Box */}
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <View style={styles.statsIconContainer}>
              <Feather name="phone" size={20} color="#2563eb" />
            </View>
            <View>
              <Text style={styles.statsLabel}>Expert Caregivers</Text>
              <Text style={styles.statsNumber}>250+</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  subtitle: {
    color: '#2563eb',
    fontWeight: '500',
    marginBottom: 8,
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1f2937',
  },
  description: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    lineHeight: 24,
  },
  servicesWrapper: {
    marginTop: 20,
  },
  servicesPage: {
    paddingHorizontal: 0,
  },
  serviceItem: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1f2937',
  },
  serviceDescription: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  statsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  statsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 30,
    gap: 12,
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsLabel: {
    fontSize: 14,
    color: '#666',
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
}); 
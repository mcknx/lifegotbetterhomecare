import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  FlatList
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

export const ServicesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = [
    'All',
    'For Elderly',
    'Post-Surgery',
    'Special Needs',
    'Daily Care'
  ];
  
  const services = [
    {
      id: '1',
      icon: 'coffee',
      title: "Meal Preparation",
      description: "Our caregivers provide daily meal preparation and serving for clients who are unable to cook.",
      categories: ['All', 'For Elderly', 'Daily Care']
    },
    {
      id: '2',
      icon: 'activity',
      title: "After Surgery Care",
      description: "Supporting smooth transition after hospital stays with health monitoring and medication reminders.",
      categories: ['All', 'Post-Surgery']
    },
    {
      id: '3',
      icon: 'users',
      title: "Respite Care",
      description: "Giving family caregivers a break while providing exceptional care for your loved ones.",
      categories: ['All', 'For Elderly', 'Special Needs']
    },
    {
      id: '4',
      icon: 'map-pin',
      title: "Transportation",
      description: "Assistance with transportation and handling errands for those unable to drive.",
      categories: ['All', 'For Elderly', 'Daily Care']
    },
    {
      id: '5',
      icon: 'home',
      title: "Light Housekeeping",
      description: "Maintaining a clean and tidy home with laundry, sweeping, and dusting services.",
      categories: ['All', 'Daily Care']
    },
    {
      id: '6',
      icon: 'clipboard',
      title: "Care Management",
      description: "We assist in managing your loved ones' care by helping with scheduling, medication reminders, and doctor visits.",
      categories: ['All', 'For Elderly', 'Special Needs']
    },
    {
      id: '7',
      icon: 'smile',
      title: "Companion Care",
      description: "Our caregivers provide friendship and engage your loved ones in conversations and enjoyable activities.",
      categories: ['All', 'For Elderly', 'Special Needs', 'Daily Care']
    },
    {
      id: '8',
      icon: 'shield',
      title: "Elderly Fall Prevention",
      description: "Our caregivers ensure safety by taking precautions to minimize fall risks and maintaining a clutter-free environment.",
      categories: ['All', 'For Elderly']
    },
    {
      id: '9',
      icon: 'user',
      title: "Personal Care and Grooming",
      description: "Assistance with personal care activities, including restroom use, dressing, oral hygiene, and bathing.",
      categories: ['All', 'For Elderly', 'Special Needs', 'Daily Care']
    }
  ];

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => service.categories.includes(selectedCategory));

  const renderServiceCard = ({ item }: { item: typeof services[0] }) => (
    <View 
      style={styles.serviceCard}
      accessible={true}
      accessibilityLabel={`${item.title}: ${item.description}`}
    >
      <View style={styles.serviceCardContent}>
        <View style={styles.iconContainer}>
          <Feather name={item.icon as any} size={24} color={theme.colors.primary} />
        </View>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        accessible={true}
        accessibilityLabel="Services screen showing different care services offered"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text 
            style={styles.subtitle}
            accessible={true}
            accessibilityLabel="Our expertise"
          >
            OUR EXPERTISE
          </Text>
          <Text 
            style={styles.title}
            accessible={true}
            accessibilityLabel="Commitment to your needs"
          >
            Commitment to your needs
          </Text>
          <Text 
            style={styles.description}
            accessible={true}
            accessibilityLabel="A specialist caregiver is available for any need. We are available in over 150 locations."
          >
            A specialist caregiver is available for any need. We are available in 150+ locations.
          </Text>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
          accessible={true}
          accessibilityLabel="Categories filter for services"
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton
              ]}
              onPress={() => setSelectedCategory(category)}
              accessible={true}
              accessibilityLabel={`${category} category ${selectedCategory === category ? 'selected' : ''}`}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedCategory === category }}
            >
              <Text 
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Services */}
        <FlatList
          data={filteredServices}
          renderItem={renderServiceCard}
          keyExtractor={item => item.id}
          numColumns={1}
          scrollEnabled={false}
          contentContainerStyle={styles.servicesContainer}
        />

        {/* Stats Box */}
        <View 
          style={styles.statsContainer}
          accessible={true}
          accessibilityLabel="Statistics showing over 250 expert caregivers and over 150 locations"
        >
          <View style={styles.statsBox}>
            <View style={styles.statsIconContainer}>
              <Feather name="users" size={20} color={theme.colors.primary} />
            </View>
            <View>
              <Text style={styles.statsLabel}>Expert Caregivers</Text>
              <Text style={styles.statsNumber}>250+</Text>
            </View>
          </View>
          
          <View style={styles.statsBox}>
            <View style={styles.statsIconContainer}>
              <Feather name="map-pin" size={20} color={theme.colors.primary} />
            </View>
            <View>
              <Text style={styles.statsLabel}>Locations</Text>
              <Text style={styles.statsNumber}>150+</Text>
            </View>
          </View>
        </View>
        
        {/* Need Help Section */}
        <View style={styles.needHelpSection}>
          <Text 
            style={styles.needHelpTitle}
            accessible={true}
            accessibilityLabel="Need personalized assistance?"
          >
            Need personalized assistance?
          </Text>
          <Text 
            style={styles.needHelpDescription}
            accessible={true}
            accessibilityLabel="Our care specialists are available to help you find the right services for your needs."
          >
            Our care specialists are available to help you find the right services for your needs.
          </Text>
          <TouchableOpacity 
            style={styles.contactButton}
            onPress={() => navigation.navigate('Contact' as never)}
            accessible={true}
            accessibilityLabel="Contact Us button"
            accessibilityRole="button"
          >
            <Text style={styles.contactButtonText}>Contact Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.background,
    marginBottom: 20,
  },
  subtitle: {
    color: theme.colors.primary,
    fontWeight: '500',
    marginBottom: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: theme.colors.text,
  },
  description: {
    textAlign: 'center',
    color: theme.colors.text,
    opacity: 0.7,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.7,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },
  servicesContainer: {
    paddingHorizontal: 15,
  },
  serviceCard: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  serviceCardContent: {
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: theme.colors.text,
  },
  serviceDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: theme.colors.text,
    opacity: 0.7,
  },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  statsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 16,
    width: '45%',
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statsLabel: {
    fontSize: 12,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: 2,
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  needHelpSection: {
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 15,
  },
  needHelpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  },
  needHelpDescription: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.text,
    opacity: 0.7,
    marginBottom: 20,
    maxWidth: 300,
    alignSelf: 'center',
  },
  contactButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

});

export default ServicesScreen;

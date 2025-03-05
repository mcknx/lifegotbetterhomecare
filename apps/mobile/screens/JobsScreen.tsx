import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Platform,
  RefreshControl
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

// Job type definition
interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  date: string;
  type: string;
  category: string;
}

const JobsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Sample job data - in a real app, this would come from an API
  const sampleJobs: Job[] = [
    {
      id: '1',
      title: 'Certified Nursing Assistant (CNA) Instructor',
      location: 'Milwaukee, Wisconsin',
      description: 'We are seeking a dedicated and experienced Certified Nursing Assistant (CNA) Instructor to join our team. The successful candidate will be responsible for delivering comprehensive instruction to students aspiring to become CNAs.',
      date: 'December 7, 2024',
      type: 'Full-Time',
      category: 'RN'
    },
    {
      id: '2',
      title: 'Certified CNA',
      location: 'Milwaukee, Wisconsin',
      description: 'Life Got Better Staffing Services is a healthcare staffing, focusing on all Community-Based Residential Facilities. We are a growing company and have multiple roles open for skilled CNAs in Milwaukee.',
      date: 'December 18, 2024',
      type: 'Full-Time',
      category: 'CNA'
    },
    {
      id: '3',
      title: 'Caregiver/CBRF',
      location: 'Dane County, Wisconsin',
      description: 'Job Opportunity in DANE COUNTY, WI! Do you have a passion for caring? Do you need flexibility? Do you need stability? Do you need transportation?',
      date: 'January 14, 2025',
      type: 'Full-Time',
      category: 'CBRF'
    },
    {
      id: '4',
      title: 'Caregiver/CBRF',
      location: 'Racine, Wisconsin',
      description: 'Job Opportunity in RACINE, WI! Do you have a passion for caring? Do you need flexibility? Do you need stability? Do you need transportation?',
      date: 'January 14, 2025',
      type: 'Full-Time',
      category: 'CBRF'
    },
    {
      id: '5',
      title: 'CBRF/Caregiver',
      location: 'Milwaukee, Wisconsin',
      description: 'Life Got Better Staffing Services is a healthcare staffing, focusing on all Community-Based Residential Facilities. We are a growing company and have multiple roles open for skilled CBRF\'s in Milwaukee.',
      date: 'February 5, 2025',
      type: 'Full-Time',
      category: 'CBRF'
    }
  ];

  // Categories for filtering
  const categories = ['CNA', 'RN', 'CBRF', 'Caregiver'];
  
  // Locations for filtering
  const locations = ['Milwaukee, Wisconsin', 'Racine, Wisconsin', 'Dane County, Wisconsin'];

  // Load jobs on component mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(sampleJobs);
      setFilteredJobs(sampleJobs);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter jobs based on search query and filters
  const filterJobs = () => {
    let filtered = [...jobs];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }
    
    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }
    
    setFilteredJobs(filtered);
  };

  // Apply filters when any filter changes
  useEffect(() => {
    filterJobs();
  }, [searchQuery, selectedCategory, selectedLocation]);

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refreshing data
    setTimeout(() => {
      setJobs(sampleJobs);
      setFilteredJobs(sampleJobs);
      setRefreshing(false);
    }, 1000);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    setFilteredJobs(jobs);
  };

  // Render a job card
  const renderJobCard = (job: Job) => (
    <View key={job.id} style={styles.jobCard}>
      <Text style={styles.jobDate}>{job.date}</Text>
      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.jobLocation}>
        <Ionicons name="location-outline" size={16} color="#666" /> {job.location}
      </Text>
      <Text style={styles.jobType}>
        <Ionicons name="time-outline" size={16} color="#666" /> {job.type}
      </Text>
      <Text style={styles.jobCategory}>
        <Ionicons name="briefcase-outline" size={16} color="#666" /> {job.category}
      </Text>
      <Text style={styles.jobDescription} numberOfLines={3}>
        {job.description}
      </Text>
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Find Your Perfect Job</Text>
          <Text style={styles.subtitle}>
            Browse through our latest job openings and find the perfect match for your skills and experience.
          </Text>
        </View>
        
        {/* Search and Filter Section */}
        <View style={styles.filterContainer}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search jobs..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          <View style={styles.filtersRow}>
            {/* Category Filter */}
            <View style={styles.filterDropdown}>
              <Text style={styles.filterLabel}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity 
                  style={[styles.filterChip, !selectedCategory && styles.activeFilterChip]} 
                  onPress={() => setSelectedCategory('')}
                >
                  <Text style={[styles.filterChipText, !selectedCategory && styles.activeFilterChipText]}>All</Text>
                </TouchableOpacity>
                {categories.map(category => (
                  <TouchableOpacity 
                    key={category}
                    style={[styles.filterChip, selectedCategory === category && styles.activeFilterChip]} 
                    onPress={() => setSelectedCategory(category)}
                  >
                    <Text style={[styles.filterChipText, selectedCategory === category && styles.activeFilterChipText]}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            {/* Location Filter */}
            <View style={styles.filterDropdown}>
              <Text style={styles.filterLabel}>Location</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity 
                  style={[styles.filterChip, !selectedLocation && styles.activeFilterChip]} 
                  onPress={() => setSelectedLocation('')}
                >
                  <Text style={[styles.filterChipText, !selectedLocation && styles.activeFilterChipText]}>All</Text>
                </TouchableOpacity>
                {locations.map(location => (
                  <TouchableOpacity 
                    key={location}
                    style={[styles.filterChip, selectedLocation === location && styles.activeFilterChip]} 
                    onPress={() => setSelectedLocation(location)}
                  >
                    <Text style={[styles.filterChipText, selectedLocation === location && styles.activeFilterChipText]}>
                      {location.split(',')[0]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
          
          {/* Reset Filters Button */}
          {(searchQuery || selectedCategory || selectedLocation) && (
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Ionicons name="refresh-outline" size={16} color="#fff" />
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Jobs List */}
        <View style={styles.jobsContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.loadingText}>Loading jobs...</Text>
            </View>
          ) : filteredJobs.length > 0 ? (
            filteredJobs.map(job => renderJobCard(job))
          ) : (
            <View style={styles.noJobsContainer}>
              <Ionicons name="search-outline" size={50} color="#ccc" />
              <Text style={styles.noJobsText}>No jobs found matching your criteria</Text>
              <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
                <Text style={styles.resetButtonText}>Reset Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
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
  },
  filterContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  filtersRow: {
    marginBottom: 10,
  },
  filterDropdown: {
    marginBottom: 15,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  filterChip: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeFilterChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    color: '#666',
    fontWeight: '500',
  },
  activeFilterChipText: {
    color: '#fff',
  },
  resetButton: {
    backgroundColor: theme.colors.accent,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '500',
    marginLeft: 5,
  },
  jobsContainer: {
    padding: 15,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 10,
  },
  jobLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  jobCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  jobDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 15,
    lineHeight: 20,
  },
  applyButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loadingContainer: {
    padding: 30,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  noJobsContainer: {
    padding: 30,
    alignItems: 'center',
  },
  noJobsText: {
    marginTop: 10,
    marginBottom: 15,
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default JobsScreen; 
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define job interface directly
interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  date: string;
  type: string;
  category: string;
  posted_at: string;
  salary_min: number;
  salary_max: number;
}

// Define navigation types
type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Services: undefined;
  Training: undefined;
  Jobs: undefined;
  Contact: { jobData?: Job };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const JobsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Categories for filtering
  const categories = ['CNA', 'RN', 'CBRF', 'Caregiver'];
  
  // Locations for filtering
  const locations = ['Milwaukee, Wisconsin', 'Racine, Wisconsin', 'Dane County, Wisconsin'];

  // API URL - updated to use the deployed endpoint
  const API_URL = 'https://lifegotbetterhomecare.com/api/jobs';
  
  // Fetch jobs from the API with improved error handling
  const fetchJobs = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(API_URL, {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      
      // Provide more specific error message based on the error type
      if (error instanceof TypeError && error.message.includes('Network request failed')) {
        throw new Error('Network connection issue. Please check your internet connection and try again.');
      } else if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again later when connection improves.');
      } else {
        throw new Error('Could not load jobs. Please try again later.');
      }
    }
  };

  // Load jobs on component mount with improved error handling
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors
      
      try {
        const jobsData = await fetchJobs();
        
        if (!jobsData || !Array.isArray(jobsData) || jobsData.length === 0) {
          setJobs([]);
          setFilteredJobs([]);
          setError('No job listings are currently available. Please check back later for new opportunities.');
        } else {
          setJobs(jobsData);
          setFilteredJobs(jobsData);
        }
      } catch (error: any) {
        console.error('Error loading jobs:', error);
        setJobs([]);
        setFilteredJobs([]);
        setError(error.message || 'Failed to load jobs. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
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

  // Refresh jobs with improved error handling
  const onRefresh = async () => {
    setRefreshing(true);
    setError(null); // Clear any previous errors
    
    try {
      const jobsData = await fetchJobs();
      
      if (!jobsData || !Array.isArray(jobsData) || jobsData.length === 0) {
        setJobs([]);
        setFilteredJobs([]);
        setError('No job listings are currently available. Please check back later for new opportunities.');
      } else {
        setJobs(jobsData);
        setFilteredJobs(jobsData);
      }
    } catch (error: any) {
      console.error('Error refreshing jobs:', error);
      // We keep the old data but show an error message
      setError(error.message || 'Failed to refresh jobs. Please check your connection and try again.');
    } finally {
      setRefreshing(false);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    setFilteredJobs(jobs);
  };

  // Render a job card
  const renderJobCard = (job: Job) => {
    return (
      <View key={job.id} style={styles.jobCard}>
        <View style={styles.jobHeader}>
          <View style={styles.jobTitleContainer}>
            <Text style={styles.jobTitle}>{job.title}</Text>
            <View style={styles.jobMeta}>
              <Text style={styles.jobLocation}>
                <Ionicons name="location-outline" size={14} color="#666" style={styles.jobIcon} />
                {job.location}
              </Text>
              <Text style={styles.jobDate}>
                <Ionicons name="calendar-outline" size={14} color="#666" style={styles.jobIcon} />
                {job.posted_at ? new Date(job.posted_at).toLocaleDateString() : job.date}
              </Text>
            </View>
          </View>
          <View style={styles.salaryContainer}>
            <Text style={styles.salaryAmount}>
              {job.salary_min && job.salary_max 
                ? `$${job.salary_min} - $${job.salary_max}` 
                : job.type}
            </Text>
            <Text style={styles.salaryPeriod}>
              {job.salary_min && job.salary_max ? 'per hour' : ''}
            </Text>
          </View>
        </View>
        
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{job.category}</Text>
        </View>
        
        <View style={styles.jobBody}>
          <Text style={styles.jobDescription}>
            {job.description}
          </Text>
        </View>
        
        <View style={styles.jobActions}>
          <TouchableOpacity 
            style={styles.applyButton}
            onPress={() => {
              navigation.navigate('Contact', { jobData: job });
            }}
          >
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
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
              onChangeText={(text) => {
                setSearchQuery(text);
                filterJobs();
              }}
            />
          </View>
          
          <View style={styles.filtersRow}>
            {/* Category Filter */}
            <View style={styles.filterDropdown}>
              <Text style={styles.filterLabel}>Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                  style={[styles.filterChip, !selectedCategory && styles.activeFilterChip]} 
                  onPress={() => {
                    setSelectedCategory('');
                    filterJobs();
                  }}
                >
                  <Text style={[styles.filterChipText, !selectedCategory && styles.activeFilterChipText]}>All</Text>
                </TouchableOpacity>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[styles.filterChip, selectedCategory === category && styles.activeFilterChip]} 
                    onPress={() => {
                      setSelectedCategory(category);
                      filterJobs();
                    }}
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
                  onPress={() => {
                    setSelectedLocation('');
                    filterJobs();
                  }}
                >
                  <Text style={[styles.filterChipText, !selectedLocation && styles.activeFilterChipText]}>All</Text>
                </TouchableOpacity>
                {locations.map(location => (
                  <TouchableOpacity
                    key={location}
                    style={[styles.filterChip, selectedLocation === location && styles.activeFilterChip]} 
                    onPress={() => {
                      setSelectedLocation(location);
                      filterJobs();
                    }}
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

        {/* Loading and Error States */}
        {loading && !refreshing ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Loading job opportunities...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={50} color={theme.colors.error} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filteredJobs.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={50} color={theme.colors.secondary} />
            <Text style={styles.emptyText}>No jobs match your current filters.</Text>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Reset Filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Job listings section
          <View style={styles.jobsContainer}>
            {filteredJobs.map(job => renderJobCard(job))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  filtersRow: {
    marginBottom: 10,
  },
  filterDropdown: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeFilterChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    fontSize: 14,
    color: '#333',
  },
  activeFilterChipText: {
    color: '#fff',
    fontWeight: '500',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
  },
  jobsContainer: {
    padding: 15,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  jobTitleContainer: {
    flex: 1,
    marginRight: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  jobMeta: {
    flexDirection: 'column',
  },
  jobIcon: {
    marginRight: 4,
  },
  jobLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDate: {
    fontSize: 14,
    color: '#666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  salaryContainer: {
    alignItems: 'flex-end',
  },
  salaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  salaryPeriod: {
    fontSize: 12,
    color: '#666',
  },
  categoryBadge: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  jobBody: {
    marginBottom: 14,
  },
  jobDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  jobActions: {
    marginTop: 10,
  },
  applyButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
  },
  errorContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 12,
    marginBottom: 20,
    fontSize: 16,
    color: theme.colors.error,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 12,
    marginBottom: 20,
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
  },
});

export default JobsScreen; 
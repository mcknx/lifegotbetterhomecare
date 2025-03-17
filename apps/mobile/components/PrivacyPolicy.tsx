import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

export const PrivacyPolicy = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.emptySpace} />
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.lastUpdated}>Last Updated: {new Date().toLocaleDateString()}</Text>
        
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          Life Got Better Homecare ("we", "our", or "us") respects your privacy and is committed to protecting your personal data.
          This privacy policy explains how we collect, use, and safeguard your information when you use our mobile application.
        </Text>
        
        <Text style={styles.sectionTitle}>Information We Collect</Text>
        <Text style={styles.paragraph}>
          We may collect several types of information from and about users of our application, including:
        </Text>
        <Text style={styles.bulletPoint}>• Personal information such as name, email address, phone number, and postal code</Text>
        <Text style={styles.bulletPoint}>• Location information (with your permission) to help connect you with nearby care providers</Text>
        <Text style={styles.bulletPoint}>• Information about your device and internet connection</Text>
        
        <Text style={styles.sectionTitle}>How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the information we collect to:
        </Text>
        <Text style={styles.bulletPoint}>• Provide, maintain, and improve our services</Text>
        <Text style={styles.bulletPoint}>• Process job applications and connect care providers with those needing care</Text>
        <Text style={styles.bulletPoint}>• Send notifications about training programs or service updates (with your permission)</Text>
        <Text style={styles.bulletPoint}>• Respond to your inquiries and provide customer support</Text>
        
        <Text style={styles.sectionTitle}>Location Data</Text>
        <Text style={styles.paragraph}>
          We request location data only when necessary to connect you with nearby services. You can always deny or revoke this permission
          through your device settings, and our app will continue to function with limited location-based features.
        </Text>
        
        <Text style={styles.sectionTitle}>Data Sharing and Disclosure</Text>
        <Text style={styles.paragraph}>
          We do not sell your personal information. We may share your information with:
        </Text>
        <Text style={styles.bulletPoint}>• Service providers who help us deliver our services</Text>
        <Text style={styles.bulletPoint}>• Care providers when you request care services (with your consent)</Text>
        <Text style={styles.bulletPoint}>• Legal authorities when required by law</Text>
        
        <Text style={styles.sectionTitle}>Data Security</Text>
        <Text style={styles.paragraph}>
          We implement appropriate technical and organizational measures to protect your personal information
          from unauthorized access, disclosure, alteration, and destruction.
        </Text>
        
        <Text style={styles.sectionTitle}>Your Rights</Text>
        <Text style={styles.paragraph}>
          Depending on your location, you may have rights regarding your personal data, including:
        </Text>
        <Text style={styles.bulletPoint}>• Access to your personal information</Text>
        <Text style={styles.bulletPoint}>• Correction of inaccurate information</Text>
        <Text style={styles.bulletPoint}>• Deletion of your information</Text>
        <Text style={styles.bulletPoint}>• Restricting or objecting to processing</Text>
        
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions about this Privacy Policy, please contact us at:
        </Text>
        <Text style={styles.paragraph}>
          Life Got Better Homecare{'\n'}
          support@lifegotbetterhomecare.com{'\n'}
          123 Main Street{'\n'}
          Milwaukee, WI 12345
        </Text>
        
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  emptySpace: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.6,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginTop: 24,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.text,
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.text,
    marginBottom: 8,
    paddingLeft: 16,
  },
  spacer: {
    height: 40,
  },
});

export default PrivacyPolicy; 
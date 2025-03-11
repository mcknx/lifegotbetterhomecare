import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

export const TermsOfService = () => {
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
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <View style={styles.emptySpace} />
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.lastUpdated}>Last Updated: {new Date().toLocaleDateString()}</Text>
        
        <Text style={styles.sectionTitle}>Agreement to Terms</Text>
        <Text style={styles.paragraph}>
          By accessing or using our mobile application, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the application.
        </Text>
        
        <Text style={styles.sectionTitle}>Use License</Text>
        <Text style={styles.paragraph}>
          Permission is granted to temporarily download one copy of the application for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </Text>
        <Text style={styles.bulletPoint}>• Modify or copy the materials</Text>
        <Text style={styles.bulletPoint}>• Use the materials for any commercial purpose</Text>
        <Text style={styles.bulletPoint}>• Attempt to decompile or reverse engineer any software contained in the application</Text>
        <Text style={styles.bulletPoint}>• Transfer the materials to another person or "mirror" the materials on any other server</Text>
        
        <Text style={styles.sectionTitle}>Disclaimer</Text>
        <Text style={styles.paragraph}>
          The materials in our application are provided on an 'as is' basis. Life Got Better Homecare makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </Text>
        
        <Text style={styles.sectionTitle}>Limitations</Text>
        <Text style={styles.paragraph}>
          In no event shall Life Got Better Homecare or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our application, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
        </Text>
        
        <Text style={styles.sectionTitle}>Healthcare Disclaimer</Text>
        <Text style={styles.paragraph}>
          The information provided in this application is not intended to replace professional medical advice. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </Text>
        
        <Text style={styles.sectionTitle}>Modifications to Terms</Text>
        <Text style={styles.paragraph}>
          Life Got Better Homecare may revise these terms of service for its application at any time without notice. By using this application you are agreeing to be bound by the then current version of these terms of service.
        </Text>
        
        <Text style={styles.sectionTitle}>Governing Law</Text>
        <Text style={styles.paragraph}>
          These terms and conditions are governed by and construed in accordance with the laws of the United States and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
        </Text>
        
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these Terms, please contact us at:
        </Text>
        <Text style={styles.paragraph}>
          Life Got Better Homecare{'\n'}
          legal@lifegotbetterhomecare.com{'\n'}
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

export default TermsOfService; 
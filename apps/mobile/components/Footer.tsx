import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const openPhone = () => {
    Linking.openURL('tel:(414) 847-6498');
  };

  const openEmail = () => {
    Linking.openURL('mailto:lifegotbetterhomecare@gmail.com');
  };

  const openFacebook = () => {
    Linking.openURL('https://www.facebook.com/lifegotbetterstaffingservices/');
  };

  const openLinkedIn = () => {
    Linking.openURL('https://www.linkedin.com/company/life-got-better-staffing-services/about/');
  };

  return (
    <View style={styles.footer}>
      <View style={styles.content}>
        {/* Company Info */}
        <View style={styles.section}>
          <Text style={styles.heading}>Global Headquarters</Text>
          <Text style={styles.text}>Life Got Better, Inc.</Text>
          <Text style={styles.text}>6001 W Center St</Text>
          <Text style={styles.text}>Suite 208</Text>
          <Text style={styles.text}>Milwaukee, WI 53210</Text>
          
          <TouchableOpacity onPress={openPhone}>
            <Text style={styles.link}>(414) 847-6498</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={openEmail}>
            <Text style={styles.link}>lifegotbetterhomecare@gmail.com</Text>
          </TouchableOpacity>
        </View>

        {/* Social Links */}
        <View style={styles.socialLinks}>
          <TouchableOpacity onPress={openFacebook} style={styles.socialButton}>
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openLinkedIn} style={styles.socialButton}>
            <Text style={styles.socialText}>LinkedIn</Text>
          </TouchableOpacity>
        </View>

        {/* Copyright */}
        <Text style={styles.copyright}>
          © {currentYear} Life Got Better, Inc. All Rights Reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#111827', // bg-gray-900
    padding: 20,
  },
  content: {
    gap: 20,
  },
  section: {
    gap: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  text: {
    color: '#D1D5DB', // text-gray-300
  },
  link: {
    color: '#60A5FA', // text-blue-400
    marginVertical: 4,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    backgroundColor: '#1F2937', // bg-gray-800
    padding: 8,
    borderRadius: 20,
  },
  socialText: {
    color: '#ffffff',
  },
  copyright: {
    color: '#D1D5DB',
    fontSize: 12,
    textAlign: 'center',
  },
}); 
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const NavigationBar = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'find-care', label: 'Find Care' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'careers', label: 'Careers' },
    { id: 'contact', label: 'Contact' },
  ];

  const activeLabel = sections.find(section => section.id === activeSection)?.label || 'Menu';

  const handleSectionPress = (sectionId: string) => {
    onSectionChange(sectionId);
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Life Got Better Home Healthcare</Text>
      
      <TouchableOpacity 
        onPress={() => setMenuVisible(true)}
        style={styles.menuButton}
      >
        <Text style={styles.menuButtonText}>{activeLabel}</Text>
        <Ionicons name="chevron-down" size={16} color="#4B5563" />
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.menuContent}>
            {sections.map((section) => (
              <TouchableOpacity
                key={section.id}
                style={[
                  styles.menuItem,
                  activeSection === section.id && styles.activeMenuItem
                ]}
                onPress={() => handleSectionPress(section.id)}
              >
                <Text style={[
                  styles.menuItemText,
                  activeSection === section.id && styles.activeMenuItemText
                ]}>
                  {section.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2563EB',
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  menuButtonText: {
    color: '#4B5563',
    fontSize: 14,
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  menuContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 16,
  },
  menuItem: {
    padding: 16,
    borderRadius: 8,
  },
  activeMenuItem: {
    backgroundColor: '#EFF6FF',
  },
  menuItemText: {
    fontSize: 16,
    color: '#4B5563',
  },
  activeMenuItemText: {
    color: '#2563EB',
    fontWeight: '600',
  },
});

export default NavigationBar; 
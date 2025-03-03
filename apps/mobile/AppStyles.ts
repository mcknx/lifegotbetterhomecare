import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const styles = StyleSheet.create({
  nativeFeaturesContainer: {
    position: 'absolute',
    bottom: 100, // Increased to avoid overlap with the taller tab bar
    right: 20,
    alignItems: 'flex-end',
    zIndex: 1000, // Ensure it appears above other elements
  },
  featureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '500',
  },
});

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Dimensions, ScaledSize, StatusBar } from 'react-native';

// iPhone 13/14 dimensions
const IPHONE_WIDTH = 390;
const IPHONE_HEIGHT = 844;
const IPHONE_ASPECT_RATIO = IPHONE_HEIGHT / IPHONE_WIDTH;

interface ResponsiveContainerProps {
  children: React.ReactNode;
  phoneModel?: 'standard' | 'mini' | 'max';
  showDeviceFrame?: boolean;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  phoneModel = 'standard',
  showDeviceFrame = true,
}) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const isTablet = isTabletDevice(dimensions);

  // Get the target width based on iPhone model
  const getTargetWidth = (): number => {
    switch (phoneModel) {
      case 'mini': return 375; // iPhone 13 mini
      case 'max': return 428; // iPhone 13 Pro Max
      default: return 390; // iPhone 13/14 (standard)
    }
  };

  // Listen for dimension changes (e.g., rotation)
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription.remove();
  }, []);

  // On phones or narrow screens, render normally
  if (!isTablet) {
    return <>{children}</>;
  }

  const targetWidth = getTargetWidth();
  const targetHeight = targetWidth * IPHONE_ASPECT_RATIO;
  
  // Calculate max width to fit in the available space with some margin
  const maxAvailableWidth = dimensions.width * 0.95;
  const maxAvailableHeight = dimensions.height * 0.95;
  
  // Scale down if needed to fit in the available space
  const scale = Math.min(
    maxAvailableWidth / (targetWidth + (showDeviceFrame ? 40 : 0)), 
    maxAvailableHeight / (targetHeight + (showDeviceFrame ? 80 : 0))
  );
  
  const scaledWidth = targetWidth * scale;
  const scaledHeight = targetHeight * scale;

  // On tablets, create an iPhone-like container
  return (
    <View style={styles.container}>
      {showDeviceFrame ? (
        <View style={[styles.phoneFrame, { width: scaledWidth + 40, height: scaledHeight + 80 }]}>
          {/* Top notch area */}
          <View style={styles.notch} />
          
          {/* Actual app content */}
          <View style={[styles.phoneScreen, { width: scaledWidth, height: scaledHeight }]}>
            {children}
          </View>
          
          {/* Home indicator */}
          <View style={styles.homeIndicator} />
        </View>
      ) : (
        <View style={[styles.phoneContainer, { width: scaledWidth, height: scaledHeight }]}>
          {children}
        </View>
      )}
    </View>
  );
};

// Helper function to detect if the device is a tablet based on dimensions
const isTabletDevice = (dimensions: ScaledSize): boolean => {
  const { width, height } = dimensions;
  const aspectRatio = height / width;
  
  return (
    // iPads and other tablets typically have larger screens and different aspect ratios
    (Platform.OS === 'ios' && width >= 768) || 
    (Platform.OS === 'android' && width >= 600) ||
    // Also consider landscape mode on larger screens as "tablet mode"
    (width > IPHONE_WIDTH + 100)
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222', // Dark background to make the phone stand out
  },
  phoneFrame: {
    backgroundColor: '#000',
    borderRadius: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  notch: {
    width: 150,
    height: 25,
    backgroundColor: '#000',
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  phoneScreen: {
    backgroundColor: 'white',
    borderRadius: 4,
    overflow: 'hidden',
  },
  phoneContainer: {
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  homeIndicator: {
    width: 140,
    height: 5,
    backgroundColor: '#888',
    borderRadius: 3,
    marginBottom: 5,
    marginTop: 10,
  },
});

export default ResponsiveContainer; 
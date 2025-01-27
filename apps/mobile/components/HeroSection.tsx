import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

export function HeroSection() {
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <WebView
          style={styles.backgroundVideo}
          source={{
            html: `
              <video 
                style="width: 100%; height: 100%; object-fit: cover;"
                autoplay 
                loop 
                muted 
                playsinline
                src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/HrrabAxWinloumzm/videoblocks-413_u0vosu9siehfquxusenbukugmje_htd_56jkk__b2fbd0d30fdf4d9afe10971242ac6f14__P360.mp4"
              ></video>
            `
          }}
          scrollEnabled={false}
          javaScriptEnabled={true}
        />
      </View>
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Life Got Better</Text>
        <Text style={styles.subtitle}>Home Health Care</Text>
        
        <Text style={styles.description}>
          Experience compassionate, top-quality care tailored to your loved one's needs. 
          Trust us to provide a brighter, healthier future through personalized care and support.
        </Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Connect with Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 60,
    justifyContent: 'center',
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundVideo: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 28,
    color: '#93c5fd',
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 28,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    minWidth: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 
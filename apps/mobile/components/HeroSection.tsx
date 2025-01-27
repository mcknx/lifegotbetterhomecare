import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { SECTION_HEIGHT } from '../constants';

const { width } = Dimensions.get('window');
const VIDEO_HEIGHT = 1800; // Increased height to show more of the video

export function HeroSection() {
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <WebView
          style={styles.backgroundVideo}
          source={{
            html: `
              <html>
                <body style="margin:0;padding:0;background:black;">
                  <video 
                    style="width:100%;height:${VIDEO_HEIGHT}px;object-fit:cover;object-position:25% 20%;"
                    autoplay
                    muted
                    loop
                    playsinline
                    webkit-playsinline
                  >
                    <source src="https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/HrrabAxWinloumzm/videoblocks-413_u0vosu9siehfquxusenbukugmje_htd_56jkk__b2fbd0d30fdf4d9afe10971242ac6f14__P360.mp4" type="video/mp4" />
                  </video>
                </body>
              </html>
            `
          }}
          scrollEnabled={false}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
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
    height: SECTION_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    width: width,
    height: VIDEO_HEIGHT,
    backgroundColor: 'black',
  },
  backgroundVideo: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    width: width,
    height: VIDEO_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -200 }],
    padding: 20,
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    color: '#93c5fd',
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 
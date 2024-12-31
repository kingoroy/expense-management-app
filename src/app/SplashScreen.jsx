import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text, Image } from 'react-native';
import imagePath from '../constants/imagePath';
import Colors from '../styles/Colors';

const SplashScreen = () => {
  const logoScale = useRef(new Animated.Value(0)).current; // For scaling the logo
  const textOpacity = useRef(new Animated.Value(0)).current; // For fading in the text

  useEffect(() => {
    // Logo animation
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1500, // 1.5 seconds
        useNativeDriver: true,
      }),
      // Text animation starts after the logo animation
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000, // 1 second
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Logo Animation */}
      <Animated.Image
        source={imagePath.logoPath} // Replace with your logo file
        style={[styles.logo, { transform: [{ scale: logoScale }] }]}
        resizeMode="contain"
      />

      {/* Simple Text Animation */}
      <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
        Kshirsa
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.moodyBlack, // White background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Adjust size as needed
    height: 200,
    marginBottom: 10, // Space between logo and text
  },
  text: {
    fontSize: 40, // Large text size
    fontWeight: 'bold',
    letterSpacing: 2, // Spacing between letters
    color: Colors.secondary, // Text color
  },
});

export default SplashScreen;

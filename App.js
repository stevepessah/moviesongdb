import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Movie Song Database 🎬🎵';
      
      // Google Analytics 4
      // Initialize dataLayer and gtag function BEFORE loading external script
      // to prevent race conditions
      const initScript = document.createElement('script');
      initScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-F7JS0V9TF6');
      `;
      document.head.appendChild(initScript);

      // Load external gtag.js library after initialization is complete
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-F7JS0V9TF6';
      document.head.appendChild(gtagScript);
    }
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

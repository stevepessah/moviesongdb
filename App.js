import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, getStateFromPath as getStateFromPathDefault, getPathFromState as getPathFromStateDefault } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

const linking = {
  prefixes: Platform.OS === 'web' ? ['/'] : [],
  config: {
    screens: {
      Home: '/',
      Results: '/results',
      Quiz: '/quiz',
    },
  },
  // Custom function to parse query parameters from URL
  getStateFromPath: (path, options) => {
    if (Platform.OS !== 'web') {
      // Use default behavior for non-web platforms
      return getStateFromPathDefault(path, options);
    }

    // Parse the path and extract query parameters
    const [pathname, search] = path.split('?');
    const state = getStateFromPathDefault(pathname, options);

    if (state && search) {
      // Parse query parameters and add them to route params
      const params = new URLSearchParams(search);
      const searchParam = params.get('search');
      
      // Find the Results route in the state and add the search param
      if (state.routes) {
        const resultsRoute = state.routes.find(route => route.name === 'Results');
        if (resultsRoute && searchParam) {
          resultsRoute.params = {
            ...(resultsRoute.params || {}),
            search: searchParam,
          };
        }
      }
    }

    return state;
  },
  // Custom function to serialize state to URL with query parameters
  getPathFromState: (state, options) => {
    const path = getPathFromStateDefault(state, options);
    
    if (Platform.OS === 'web' && state.routes) {
      // Find the Results route and add search query param if present
      const resultsRoute = state.routes.find(route => route.name === 'Results');
      if (resultsRoute?.params?.search) {
        const searchParam = encodeURIComponent(resultsRoute.params.search);
        return path === '/results' ? `/results?search=${searchParam}` : path;
      }
    }
    
    return path;
  },
};

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
    <NavigationContainer linking={linking}>
      <AppNavigator />
    </NavigationContainer>
  );
}

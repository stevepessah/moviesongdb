import { Platform } from 'react-native';

/**
 * Track a search event in Google Analytics 4
 * @param {string} searchTerm - The search query entered by the user
 */
export const trackSearch = (searchTerm) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
    });
  }
};

/**
 * Track when a user clicks on a search result
 * @param {string} songTitle - The title of the song clicked
 * @param {string} artist - The artist of the song clicked
 */
export const trackSearchResultClick = (songTitle, artist) => {
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'select_content', {
      content_type: 'search_result',
      item_id: `${songTitle}-${artist}`,
      item_name: songTitle,
      item_category: artist,
    });
  }
};

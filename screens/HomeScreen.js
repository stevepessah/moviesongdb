import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import songsData from '../data/songs.json';
import Footer from '../components/Footer';
import { trackSearch, trackSearchResultClick } from '../utils/analytics';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Movie Song Database';
    }
    
    // Cleanup timeout on unmount
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);
  
  const handleSearch = (text) => {
    setQuery(text);
    // Normalize Unicode characters (handles different apostrophe types)
    const normalizeText = (str) => {
      return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[''']/g, "'"); // Normalize different apostrophe types
    };
    
    const normalizedQuery = normalizeText(text);
    const results = songsData.filter(
      (item) =>
        normalizeText(item.title).includes(normalizedQuery) ||
        normalizeText(item.artist).includes(normalizedQuery)
    );
    setFiltered(results);

    // Track search queries in GA4 (debounced to avoid too many events)
    if (text.trim().length > 0) {
      // Clear existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      // Track search after user stops typing for 500ms
      searchTimeoutRef.current = setTimeout(() => {
        trackSearch(text.trim());
      }, 500);
    }
  };

  const goToResults = (song) => {
    // Track when user clicks on a search result
    trackSearchResultClick(song.title, song.artist);
    navigation.navigate('Results', { song });
  };

  const handleFeedback = () => {
    const email = 'stevepessah@gmail.com';
    const subject = encodeURIComponent('Feedback on Movie Song Database');
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`;
    
    if (Platform.OS === 'web') {
      window.open(gmailUrl, '_blank');
    }
  };

  console.log('Query:', query);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.feedbackButton}
        onPress={handleFeedback}
      >
        <Text style={styles.feedbackButtonText}>Feedback</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.header}>🎬 Movie Song Database</Text>
        <Text style={styles.subheader}>Search every movie song. Ever.</Text>

        {/* <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.quizButtonText}>🎮 Play Quiz</Text>
        </TouchableOpacity> */}

        <TextInput
          style={styles.searchInput}
          placeholder="Search by song or artist..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={handleSearch}
          onSubmitEditing={() => handleSearch(query)}
        />

        {query.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={() => {
            setQuery('');
            setFiltered([]);
            // Clear any pending search tracking
            if (searchTimeoutRef.current) {
              clearTimeout(searchTimeoutRef.current);
            }
        }}>
          <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}

        {query.length > 0 && filtered.length === 0 && (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No results found</Text>
          </View>
        )}

        {filtered.length > 0 && (
          <FlatList
            data={filtered}
            keyExtractor={(item, index) => `${item.title}-${item.artist}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => goToResults(item)}
              >
                <Text style={styles.resultText}>
                  {item.title} - {item.artist}
                </Text>
              </TouchableOpacity>
            )}
            style={styles.resultsList}
            contentContainerStyle={styles.resultsListContent}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subheader: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 20,
  },
  quizButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: '#1f1f1f',
    padding: 14,
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
  },
  resultItem: {
    backgroundColor: '#1c1c1c',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
  },
  clearButton: {
    alignSelf: 'flex-end',
    padding: 6,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    borderRadius: 6,
    marginBottom: 10,
    marginTop: -10,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  resultsList: {
    flex: 1,
  },
  resultsListContent: {
    paddingBottom: 20,
  },
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    color: '#888',
    fontSize: 16,
  },
  feedbackButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 40,
    right: 20,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  feedbackButtonText: {
    color: '#aaa',
    fontSize: 14,
  },
});

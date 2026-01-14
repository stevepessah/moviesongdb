import React, { useState, useEffect } from 'react';
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

export default function HomeScreen() {
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Movie Song Database';
    }
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
  };

  const goToResults = (song) => {
    navigation.navigate('Results', { song });
  };

  console.log('Query:', query);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>🎬 Movie Song Database</Text>
        <Text style={styles.subheader}>Search every movie song. Ever.</Text>

        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.quizButtonText}>🎮 Play Quiz</Text>
        </TouchableOpacity>

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
});

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
    const lowerText = text.toLowerCase();
    const results = songsData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerText) ||
        item.artist.toLowerCase().includes(lowerText)
    );
    setFiltered(results);
  };

  const goToResults = (song) => {
    navigation.navigate('Results', { song });
  };

  console.log('Query:', query);

  return (
    <View style={styles.container}>
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

      {filtered.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.title + item.artist}
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
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
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
});

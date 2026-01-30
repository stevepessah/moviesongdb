import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';
import songsData from '../data/songs.json';

export default function ResultsScreen({ route, navigation }) {
  const { song: songFromParams, search: searchFromParams } = route.params || {};

  // Get search query from route params (React Navigation handles URL parsing)
  const searchQuery = searchFromParams || '';

  // Find song from search query if not provided in params
  const song = useMemo(() => {
    if (songFromParams) {
      return songFromParams;
    }
    
    if (searchQuery) {
      const decodedSearch = decodeURIComponent(searchQuery);
      // Try to match by "title - artist" format
      // Split on the LAST occurrence of ' - ' to handle titles that contain ' - '
      const lastSeparatorIndex = decodedSearch.lastIndexOf(' - ');
      let title, artist;
      if (lastSeparatorIndex !== -1) {
        title = decodedSearch.substring(0, lastSeparatorIndex).trim();
        artist = decodedSearch.substring(lastSeparatorIndex + 3).trim(); // +3 to skip ' - '
      }
      
      if (title && artist) {
        const found = songsData.find(
          s => s.title === title && s.artist === artist
        );
        if (found) return found;
      }
      
      // Fallback: search by title or artist
      const normalizeText = (str) => {
        return str
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[''']/g, "'");
      };
      
      const normalizedSearch = normalizeText(decodedSearch);
      return songsData.find(
        s => normalizeText(s.title).includes(normalizedSearch) ||
             normalizeText(s.artist).includes(normalizedSearch) ||
             normalizeText(`${s.title} - ${s.artist}`).includes(normalizedSearch)
      );
    }
    
    return null;
  }, [songFromParams, searchQuery]);

  // Update document title on web
  React.useEffect(() => {
    if (Platform.OS === 'web' && song) {
      document.title = `"${song.title}" - Movie Song Database`;
    }
  }, [song]);

  if (!song) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>🎬 Movie Song Database</Text>
            <Text style={styles.subheader}>Search every movie song. Ever.</Text>
          </View>
          <Text style={styles.errorText}>Song not found</Text>
        </ScrollView>
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>🎬 Movie Song Database</Text>
          <Text style={styles.subheader}>Search every movie song. Ever.</Text>
        </View>

        <Text style={styles.title}>Movies featuring "{song.title}"</Text>

        {song.movies.map((movie, index) => (
          <View key={index} style={styles.movieCard}>
            <Text style={styles.movieTitle}>{movie.name}</Text>
            <Text style={styles.movieScene}>🎬 {movie.scene}</Text>
            <Text style={styles.movieTimestamp}>⏱ {movie.timestamp}</Text>
          </View>
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
    backText: {
    fontSize: 16,
    color: '#1e40af',
    marginLeft: 8,
  },
  headerContainer: {
    marginBottom: 30,
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
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
  },
  movieCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  movieScene: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  movieTimestamp: {
    fontSize: 13,
    color: '#777',
  },
  navBar: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 16,
  paddingHorizontal: 20,
  marginBottom: 16,
},
backArrow: {
  fontSize: 24,
  color: '#1e40af',
  marginRight: 12,
},
navTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#1e40af',
},
errorText: {
  color: '#ef4444',
  fontSize: 18,
  textAlign: 'center',
  marginTop: 20,
},
});

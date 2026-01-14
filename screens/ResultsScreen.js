import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/Footer';

export default function ResultsScreen({ route, navigation }) {
  const { song } = route.params;

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
});

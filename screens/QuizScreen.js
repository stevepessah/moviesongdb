import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import songsData from '../data/songs.json';
import Footer from '../components/Footer';

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filter songs that have at least one movie (memoized to prevent infinite loops)
  const validSongs = useMemo(() => {
    return songsData.filter(song => song.movies && song.movies.length > 0);
  }, []);

  // Get all unique movie names for wrong answers
  const getAllMovies = useCallback(() => {
    const movieSet = new Set();
    validSongs.forEach(song => {
      song.movies.forEach(movie => {
        movieSet.add(movie.name);
      });
    });
    return Array.from(movieSet);
  }, [validSongs]);

  // Generate a new question
  const generateQuestion = useCallback(() => {
    if (validSongs.length === 0) return;

    // Pick a random song
    const randomSong = validSongs[Math.floor(Math.random() * validSongs.length)];
    
    // Pick a random movie from that song's movies
    const correctMovie = randomSong.movies[Math.floor(Math.random() * randomSong.movies.length)];
    
    // Get all movies and remove the correct one
    const allMovies = getAllMovies();
    const wrongMovies = allMovies.filter(movie => movie !== correctMovie.name);
    
    // Shuffle and pick 3 wrong answers
    const shuffled = wrongMovies.sort(() => 0.5 - Math.random());
    const wrongAnswers = shuffled.slice(0, 3);
    
    // Combine and shuffle all options
    const allOptions = [correctMovie.name, ...wrongAnswers].sort(() => 0.5 - Math.random());
    
    setCurrentQuestion({
      song: randomSong,
      correctAnswer: correctMovie.name,
    });
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowResult(false);
  }, [validSongs, getAllMovies]);

  useEffect(() => {
    if (validSongs.length > 0) {
      generateQuestion();
    }
    setIsLoading(false);
  }, [generateQuestion, validSongs.length]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      document.title = 'Movie Song Quiz - Movie Song Database';
    }
  }, []);

  const handleAnswer = (answer) => {
    if (showResult) return; // Prevent multiple clicks
    
    setSelectedAnswer(answer);
    setShowResult(true);
    setAnsweredCount(answeredCount + 1);
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setQuestionNumber(questionNumber + 1);
    generateQuestion();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading quiz...</Text>
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Unable to load quiz data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>🎮 Movie Song Quiz</Text>
        <Text style={styles.subheader}>Guess which movie features this song!</Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score} / {answeredCount}</Text>
          <Text style={styles.questionNumber}>Question #{questionNumber}</Text>
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.songTitle}>{currentQuestion.song.title}</Text>
          <Text style={styles.songArtist}>by {currentQuestion.song.artist}</Text>
        </View>

        <Text style={styles.promptText}>Which movie features this song?</Text>

        <View style={styles.optionsContainer}>
          {options.map((option, index) => {
            let buttonStyle = styles.optionButton;
            let textStyle = styles.optionText;

            if (showResult) {
              if (option === currentQuestion.correctAnswer) {
                buttonStyle = [styles.optionButton, styles.correctAnswer];
                textStyle = [styles.optionText, styles.correctText];
              } else if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
                buttonStyle = [styles.optionButton, styles.wrongAnswer];
                textStyle = [styles.optionText, styles.wrongText];
              } else {
                buttonStyle = [styles.optionButton, styles.disabledButton];
                textStyle = [styles.optionText, styles.disabledText];
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={buttonStyle}
                onPress={() => handleAnswer(option)}
                disabled={showResult}
              >
                <Text style={textStyle}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {showResult && (
          <View style={styles.resultContainer}>
            {selectedAnswer === currentQuestion.correctAnswer ? (
              <Text style={styles.correctMessage}>✅ Correct! Well done!</Text>
            ) : (
              <Text style={styles.wrongMessage}>
                ❌ Wrong! The correct answer is: {currentQuestion.correctAnswer}
              </Text>
            )}
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Next Question →</Text>
            </TouchableOpacity>
          </View>
        )}
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
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  questionNumber: {
    fontSize: 16,
    color: '#aaa',
  },
  questionCard: {
    backgroundColor: '#1f1f1f',
    padding: 24,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  songArtist: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
  },
  promptText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#1f1f1f',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#333',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  correctAnswer: {
    backgroundColor: '#2d5016',
    borderColor: '#4ade80',
  },
  correctText: {
    color: '#4ade80',
    fontWeight: 'bold',
  },
  wrongAnswer: {
    backgroundColor: '#5a1a1a',
    borderColor: '#ef4444',
  },
  wrongText: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#1a1a1a',
    borderColor: '#2a2a2a',
    opacity: 0.6,
  },
  disabledText: {
    color: '#666',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  correctMessage: {
    fontSize: 20,
    color: '#4ade80',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  wrongMessage: {
    fontSize: 18,
    color: '#ef4444',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    color: '#aaa',
    marginTop: 12,
    textAlign: 'center',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 18,
    textAlign: 'center',
  },
});

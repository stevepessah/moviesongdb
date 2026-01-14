import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Footer() {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.footerLink}
        onPress={() => navigation.navigate('Quiz')}
      >
        <Text style={styles.footerLinkText}>🎮 Play Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#121212',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerLink: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  footerLinkText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

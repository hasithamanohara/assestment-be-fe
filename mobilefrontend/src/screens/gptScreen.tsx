import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/button';
import Input from '../components/inputFeild';
import { getCourseRecommendations } from '../api/apiCall';

const ChatGPTScreen: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const handleRecommend = async () => {
    try {
      const response = await getCourseRecommendations(prompt);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      Alert.alert('Error', 'Failed to get recommendations');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Recommendations</Text>
      <Input
        value={prompt}
        onChangeText={setPrompt}
        placeholder="e.g., I want to be a software engineer"
      />
      <Button title="Get Recommendations" onPress={handleRecommend} />
      {recommendations && (
        <>
          <Text style={styles.label}>Recommendations:</Text>
          <Text>{recommendations}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 16 },
});

export default ChatGPTScreen;
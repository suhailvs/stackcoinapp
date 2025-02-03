import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const DetailsScreen = () => {
  const { id, category, heading } = useLocalSearchParams(); // Get passed data
    console.log('item')
    console.log(id)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      <Text>{heading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontWeight: 'bold', fontSize: 20, marginBottom: 10, color:'black' },
});

export default DetailsScreen;
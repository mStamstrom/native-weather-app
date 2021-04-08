import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground } from 'react-native';

export default function WeatherDisplayer({weather}) {
  return (
    <View>
      <Text style={styles.temperature}>{weather.temp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  temperature: {
    fontSize: '60px',
  }
});

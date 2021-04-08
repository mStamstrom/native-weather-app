import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ImageBackground } from 'react-native';
import WeatherDisplayer from './src/components/WeatherDisplayer';

const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = '794fd1eb804018f71fb274449e212c02';

const fetchForecast = (city) => {
    return fetch(`${baseUrl}weather?q=${city}&appid=${apiKey}&units=metric`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(res.statusText);
      });
}

const isObjectEmpty = (obj) => {
  for (var i in obj) return false;
  return true;
}

export default function App() {
  const [input, setInput] = useState('stockholm');
  const [weather, setWeather] = useState({});

  function buttonClick() {
    fetchForecast(input).then(res => setWeather({
      temp: Math.round(res.main.temp),
      weatherDescription: res.weather.main,
      coord: res.coord
    }));
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./src/assets/images/sunny.jpg')} style={styles.image}>
        <Text style={styles.title}>Display weather for city</Text>
        <View style={styles.textContainer}>
          <TextInput style={styles.input} value={input} onChangeText={text => setInput(text)} placeholder="Type in city"></TextInput>
          <Button onPress={buttonClick} title="Fetch weather"></Button>
        </View>
        {!isObjectEmpty(weather) && 
          <WeatherDisplayer weather={weather} />
        }
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#ff0'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: 'center',
  },
  title: {
    fontSize: '20px',
    marginBottom: '4px',
  },
  input: {
    border: '1px solid black',
    borderRadius: '2px',
    padding: '4px',
  },
  textContainer: {
    flexDirection: 'row'
  },

});

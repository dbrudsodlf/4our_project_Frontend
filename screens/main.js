import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextComponent, View, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import TopBar from './topBar.js';
import BottomBar from './bottomBar.js';
import Fridge from './fridge.js';

export default function MainScreen() {
  return (
      <SafeAreaView style={styles.SafeAreaView}> 
        <TopBar />
        <Fridge />
        <BottomBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  kakaoBtn: {
    padding: 10,
    width: 352,
    height: 60,
    backgroundColor: '#FFE812',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  kakaoBtnText: {
    color: '#191919',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

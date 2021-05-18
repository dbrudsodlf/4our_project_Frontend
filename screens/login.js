import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextComponent, View, Image, Button, TouchableOpacity } from 'react-native';
import logo from '../assets/logoex.png';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image style={styles.logoImage} source={logo} />
      </View>
      <TouchableOpacity>
        <View style={styles.kakaoBtn}>
          <Text style={styles.kakaoBtnText}>카카오 계정으로 로그인</Text> 
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    paddingBottom: 30
  },
  logoImage: {
    width: 300,
    height: 300
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

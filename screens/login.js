import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextComponent, View, Image, Button, TouchableOpacity } from 'react-native';
import logo from '../assets/logoex.png';
import { WebView } from 'react-native-webview';

export default function LoginScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
    <WebView
        originWhitelist={['*']}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source = {{uri : 'https://kauth.kako.com/oauth/authorize?client_id=724be8a1af0b3f2aa1b5c14123aa1b68&redirect_uri=http://localhost:19002/login&response_type=code'}}
    />
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

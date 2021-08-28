import React from "react";
import { StyleSheet, View, TouchableOpacity,Image,Dimensions } from "react-native";
import * as Google from "expo-google-app-auth";
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
import logo from '../assets/logoex.png'

const LoginScreen = ({ navigation }) => {
  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user } = await Google.logInAsync({
        androidClientId: `627197808828-jhr5b583sf7ufdv764j942ttr0hk19h9.apps.googleusercontent.com`,
      });

      if (type === "success") {
        // Then you can use the Google REST API
        console.log("LoginScreen.js 17 | success, navigating to profile");
        navigation.navigate("start", { user });
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={{
          height:300,
          width:300
        }}
       />

      <View style={styles.login}>
        <Button 
          icon={
            <Icon
              name="google"
              size={40}
              color="#fff"
              style={{
                marginRight:24,
                padding:3
              }}
            />
          }
        title="Login with Google" 
        onPress={signInAsync}  />
        </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:40,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  login:{
    marginTop:50,
    width:Dimensions.get('screen').width*0.8,
  },

});
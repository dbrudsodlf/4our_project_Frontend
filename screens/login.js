import React,{useState} from "react";
import { StyleSheet, View, Text,Image,Dimensions } from "react-native";
import * as Google from "expo-google-app-auth";
import Icon from 'react-native-vector-icons/AntDesign';
import { Button } from 'react-native-elements';
import logo from '../assets/logoex.png'
import axios from 'axios';
import { API_URL } from '../config/constants.js';
import {useSelector, useDispatch} from 'react-redux'
import {login} from './reducer/action'

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  

  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user } = await Google.logInAsync({
        androidClientId: `627197808828-jhr5b583sf7ufdv764j942ttr0hk19h9.apps.googleusercontent.com`,
      });

      if (type === "success") {
        // Then you can use the Google REST API
        console.log("LoginScreen.js 17 | success, navigating to profile");
       
       
        dispatch(login({
          id:user.id,
          email:user.email,
          name:user.name}));

          navigation.navigate("start", { user });

        axios.post(`${API_URL}/login`,
        {user_id:user.id,
         email:user.email,
         name:user.name})
        .then((res)=>{
            console.log("데이터 보냄",res.config.data);
        }).catch(error=>{
            console.log(error);})

           

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
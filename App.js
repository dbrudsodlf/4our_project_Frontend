import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from './screens/login.js';
import StartScreen from './screens/start.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="login"
            component={LoginScreen} 
            options={{
              title: "로그인 화면"
            }}/>
          <Stack.Screen
            name="start"
            component={StartScreen} 
            options={{
              title: "촬영 유도 화면"
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

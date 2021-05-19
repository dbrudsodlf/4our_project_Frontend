import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextComponent, View, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    NavigationContainer
  } from '@react-navigation/native';
import {
    createStackNavigator
  } from '@react-navigation/stack';
import {
    createMaterialTopTabNavigator
  } from '@react-navigation/material-top-tabs';
import FridgeCold from './fridgeCold.js';
import FridgeFrozen from './fidgeFrozen.js';

const leafIcon = ['leaf']

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabStack() {
    return (
        <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Settings"
          screenOptions={{
            headerStyle: { backgroundColor: '#633689' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' }
          }}>
          <Stack.Screen
            name="TabStack"
            component={TabStack}
            options={{ title: 'Tab Stack' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

export default function Fridge() {
  return (
    <Tab.Navigator
      initialRouteName="FridgeCold"
      tabBarOptions={{
        activeTintColor: '#F59A23',
        inactiveTintColor: '#191919',
        style: {
          backgroundColor: '#FFF',
        },
        labelStyle: {
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
        },
        labelPosition: 'beside-icon',
        indicatorStyle: {
          borderBottomColor: '#F59A23',
          borderBottomWidth: 4,
        },
        showIcon: true,
        tabStyle: {
          flexDirection: 'row',
        }
      }}>
      <Tab.Screen
        name="FridgeCold"
        component={FridgeCold}
        options={{
          tabBarLabel: '냉장',
          tabBarIcon: ({tintColor}) => (
              <Icon name='leaf' color='#95F204' size={25} />
          )
        }}  />
      <Tab.Screen
        name="FridgeFrozen"
        component={FridgeFrozen}
        options={{
          tabBarLabel: '냉동',
          tabBarIcon: ({tintColor}) => (
              <Icon name='snowflake' color='#81D3F8' size={25} />
          )
        }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  fridge: {
    flex: 1,
  }
});

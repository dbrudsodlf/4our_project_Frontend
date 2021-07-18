import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';

import {
    createMaterialTopTabNavigator
  } from '@react-navigation/material-top-tabs';
import ManageFridge from './manageFridge';
import ManageExp from './manageExp';

const Tab = createMaterialTopTabNavigator();


export default function manageTab() {

  return (
    <Tab.Navigator
      initialRouteName="ManageFridge"
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
        name="ManageFridge"
        children={()=><ManageFridge/>}
        options={{
          tabBarLabel: '재료 관리',
        }}  />
      <Tab.Screen
        name="ManageExp"
        component={ManageExp}
        options={{
          tabBarLabel: '기한 초과',
        }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  fridge: {
    flex: 1,
  }
});





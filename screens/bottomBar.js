import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextComponent, View, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const iconSize = 32, iconColor = 'black'
const icons = ['fridge-outline', 'calendar-month-outline', 'plus', 'basket-outline', 'account-outline']

export default function BottomBar() {
    const childern = icons.map((name)=>(
        <Icon key={name} name={name} size={iconSize} color={iconColor} />
    ))
  return (
      <View style={styles.bottomBar}>{childern}</View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -9
    },
    shadowOpacity: 0.4,
    shadowRadius: 10
  }
});

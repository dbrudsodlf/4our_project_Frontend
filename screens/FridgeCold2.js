import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import EggImage from '../assets/egg.jpeg';
// import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FridgeCold2() {//냉장 재료가 없을 때 화면



  return (
    <View style={styles.container}>
       <Icon name='leaf' color='#95F204' size={50} />
    <Text style={styles.text}>아직 보관중인 냉장식품이 없어요</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
   justifyContent:'center',
   alignItems: 'center',
  },
  text:{
    color:'#7d7e80',
    fontSize:20,
    fontWeight:'bold',
    paddingTop:30
  }
});
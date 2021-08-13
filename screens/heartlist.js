import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function HeartList() {
  const [checked, setChecked] = useState(false);

  const pushHeart =()=>{
    setChecked(!checked);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.top}>
        <Icon name="heart" size={30} color="#ff0000" />
        <Text style={styles.text}>찜한 요리 목록</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.name}>토마토 달걀 볶음</Text>
          <View style={styles.nolike} >
            <TouchableOpacity  onPress={()=>{pushHeart()}} >
            <Icon name={checked? 'heart-outline' : 'heart'} size={30} color="#ff0000" />
             </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop:50
  },
  top:{
      flexDirection:'row',
      alignItems:'center',
      paddingLeft:20,
      backgroundColor: '#fff',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    padding: 10,
    borderWidth: 2,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 30,
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  name: {
    fontSize: 20,
  },
  text:{
    fontWeight:'bold',
    fontSize: 28,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
  }
});

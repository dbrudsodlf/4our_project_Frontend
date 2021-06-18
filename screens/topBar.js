import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextComponent, View, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';

const title = '나의 재료'
export default function TopBar(props) {
  return (
      <View>
        <View style={styles.titleArea}>
          <View>
            <Text style={styles.text}>{title}</Text>  
            <Text style={{color: '#797979', paddingTop: 6}}>아래 추가하기 버튼을 눌러 재료를 넣어주세요.</Text>
          </View>
          <TouchableOpacity style={styles.cookBtn} 
          onPress={()=> {
            props.navigation.navigate('cook');
          }}>
            <View >
              <Text style={styles.cookBtnText}>요리하기</Text> 
            </View>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#FFE812',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  cookBtn: {
    padding: 10,
    width: 100,
    height: 40,
    backgroundColor: '#D7D7D7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  cookBtnText: {
    color: '#191919',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});

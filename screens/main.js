import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextComponent, View, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import TopBar from './topBar.js';
import Fridge from './fridge.js';
import { set } from 'react-native-reanimated';

const title = '나의 재료'
export default function MainScreen(props) {
  const [selectedBtn, setSelectedBtn] = React.useState([
    { flag: false, add : 0 }
  ]);

  const [sum, setSum] = React.useState(0)
 
  const isSelectBtn = function (isSelect) {
    setSelectedBtn(isSelect);
    addFlag(sum+isSelect.add);
    }
    
  const addFlag = function (sum) {
    setSum(sum);
    if( sum <= 0 ) {
      setSelectedBtn({flag :false});
    } else {
      setSelectedBtn({flag:true});
    }
  }

  
  return (
      <SafeAreaView style={styles.SafeAreaView}> 
        <View>
          <View style={styles.titleArea}>
            <View>
              <Text style={styles.text}>{title}</Text>  
              <Text style={{color: '#797979', paddingTop: 6}}>아래 추가하기 버튼을 눌러 재료를 넣어주세요.</Text>
            </View>
            <TouchableOpacity style={[styles.cookBtn, selectedBtn.flag ? styles.selectedCookBtn : styles.cookBtn]} 
            onPress={()=> {
              if(selectedBtn.flag){
                props.navigation.navigate('cook');
              }
            }}
            disabled={selectedBtn.flag ? false : true }>
              <View >
                <Text style={[styles.cookBtnText, selectedBtn.flag ? styles.selectedCookBtnText : styles.cookBtnText]}>요리하기</Text> 
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Fridge isSelectBtn={isSelectBtn}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
      flex: 1,
      backgroundColor: '#fff',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'center',
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
  selectedCookBtn: {
    padding: 10,
    width: 100,
    height: 40,
    backgroundColor: '#F59A23',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  cookBtnText: {
    color: '#191919',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  selectedCookBtnText: {
    color: '#191919',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  }
});

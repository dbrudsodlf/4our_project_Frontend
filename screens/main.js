import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextComponent, View, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import TopBar from './topBar.js';
import Fridge from './fridge.js';
import { set } from 'react-native-reanimated';
import axios from 'axios';
import {API_URL} from '../config/constants.js';

const title = '나의 재료'
export default function MainScreen(props) {

  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  React.useEffect(()=>{
    axios.get(`${API_URL}/fridgecold`).then((result)=>{
      setSelectedIngredients(result.data.selectedIngredients);
      console.log(selectedIngredients);
    }).catch((error)=>{
      console.error(error);
    })
  }, []);

  React.useEffect(()=>{
    setCount(0);
    setSelectedBtn({ flag: false, add : 0, id: -1 });
  },[]);

  const [selectedBtn, setSelectedBtn] = React.useState([
    { flag: false, add : 0, id: -1 }
  ]);

  const [selectIds, setSelectIds] = React.useState([]);
  const [sId, setSId] = React.useState([]);

  const [count, setCount] = React.useState(0);
 
  const isSelectBtn = function (isSelect, Array) {
    setSelectedBtn(isSelect);
    console.log("========", count);

    setCount(count + isSelect.add)
    addFlag(count + isSelect.add);
    setSelectIds({
      ...selectIds,
      isSelect
    });
    console.log('array:',Array);
    setSId(Array);
    console.log("arr:", sId);
  }
    
  const addFlag = function (summ) {
    console.log("selectId: ");
    console.log(selectIds);
    if( summ <= 0 ) {
      setSelectedBtn({flag:false});
      console.log('flg!!!:', selectedBtn.flag);
    } else {
      setSelectedBtn({flag:true});
      console.log('Tflg!!!:', selectedBtn.flag);
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
                props.navigation.navigate('cook', sId);
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

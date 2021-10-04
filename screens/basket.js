import React, { useState } from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import BasketInsert from './basketInsert.js';
import BasketList from './basketList.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { API_URL } from '../config/constants.js';

export default function BasketScreen() {
  const [baskets, setBaskets] = useState([]);
  const id = useSelector((state) => state.id);

  const addBasket = text => { //장바구니 추가
    setBaskets([
      ...baskets,
      { id: Math.random().toString(), textValue: text, checked: false },
    ]);
    axios.post(`${API_URL}/managebasket`,
    {user_id:id,
      ing_name:Math.random().toString()})
     .then((res) => {
       console.log("장볼거 보내기", res.config.data);
       props.navigation.navigate('cook',{ing:ingredients,recipe:res.data});
     }).catch(error => {
       console.log(error);
     })
  };

  const onRemove = id => e => { //장바구니 삭제
    setBaskets(baskets.filter(basket => basket.id !== id));
  };

  const onToggle = id => e => {//누르면 완료 표시
    setBaskets(
      baskets.map(basket =>
        basket.id === id ? { ...basket, checked: !basket.checked } : basket,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
       <Icon name='basket-outline' size={40} color={'#F59A23'}/>
      <Text style={styles.appTitle}>장바구니</Text>
      </View>
      <View style={styles.card}>
        <BasketInsert onAddBasket={addBasket} />
        <BasketList baskets={baskets} onRemove={onRemove} onToggle={onToggle} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:50
  },
  appTitle: {
    color: '#000',
    fontSize: 28,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    textAlign: 'left',
    backgroundColor: '#fff',
    fontWeight:'bold'
  },
  top:{
flexDirection:'row',
alignItems:'center',
marginLeft:20
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#F59A23',
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
});

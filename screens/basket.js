import React, { useState } from 'react';
import axios from 'axios';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import BasketInsert from './basketInsert.js';
import BasketList from './basketList.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { API_URL } from '../config/constants.js';

export default function BasketScreen() {
  const [baskets, setBaskets] = React.useState([]);
  const id = useSelector((state) => state.id);
  const [inn,setInn]= React.useState([]);
  const [basket, setBasket] = React.useState([]);

  // React.useEffect(() => {
  //   console.log('장바구니');
  //   axios.get(`${API_URL}/manage/managebasket`,{params:{user_id:id}})
  //    .then((res) => {
  //     setBasket(res.data);
  //     console.log(res);
  //     console.log("장볼거 받기", res.data);
  //    }).catch(error => {
  //      console.log(error);
  //    });
  // }, []);

  React.useEffect(()=>{
    axios.get(`${API_URL}/manage/managebasket?user_id=${id}`).then((result)=>{
      setBasket(result.data);
      console.log(result.data);
    }).catch((error)=>{
      console.error(error);
    })
  }, []);


  React.useEffect(() => {
    basket.map((ing) => {
      let tempData = {_id: ing._id, id: Math.random().toString(), textValue:ing.ing_name ,checked: false};
      setBaskets(prev => [...prev, tempData]);
      console.log(ing);
    });
  }, [basket]);

  const addBasket = text => { //장바구니 추가
    setBaskets(prev=>[...prev, { id: Math.random().toString(), textValue: text, checked: false }]);
    setInn(prev=>[...prev, {user_id:id, ing_name:text}])
  };

  React.useEffect(() => {
    inn.map((item)=>{
      axios.post(`${API_URL}/manage/managebasket`,{ 
        user_id: id,
        ing_name: item.ing_name }
        )
        .then((res) => {
          console.log("장바구니보내기", res);
        }).catch(error => {
          console.log(error);
        });
    })
  }, [inn]);

  const onRemove = ({id,_id}) => e => { //장바구니 삭제
    axios.delete(`${API_URL}/manage/managebasket`, {data:{ _id: _id }})
    .then((res) => {
      alert("삭제되었습니다");
      setBaskets(baskets.filter(basket => basket.id !== id));
      console.log("킹받네",res);
      //  const updatedCart = [...insertData];
      //  updatedCart.splice(index, 1);
      //  setInsertData(updatedCart);
    }).catch(error => {
      console.log(error);
    })
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

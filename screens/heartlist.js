import React, { useState } from 'react';
import axios from 'axios';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { API_URL } from '../config/constants.js';
import { useSelector } from 'react-redux';

export default function HeartList() {
  const [checked, setChecked] = useState(false);
  const[ingredients,setIngredients]=useState([]);
  const [insertData, setInsertData] = React.useState([]);
  const id = useSelector((state) => state.id);


  const pushHeart =(index, food)=>{
    const newItems = [...insertData];
      newItems[index]['checked'] = food.checked == 1 ? 0 : 1;
      setInsertData(newItems);
      console.log(food.checked);
      if (food.checked == 0) {//체크 취소한 배열 빼기     
        const updatedCart = [...insertData];
        updatedCart.splice(index, 1);
        setInsertData(updatedCart);
        axios.post(`${API_URL}/mypage/myheart/cancel`,
        { user_id:id,
         recipe_name:food.name})
         .then((res) => {
           console.log("찜하기 취소", res.data);
         }).catch(error => {
           console.log(error);
           console.log('취소 에러남');
         })
      }
  };
  
  React.useEffect(() => {
    axios.get(`${API_URL}/mypage/myheart?user_id=${id}`, {recipe_name:''})
      .then((result) => {
        setIngredients(result.data);
        console.log("이것은 짬목록", result.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  React.useEffect(() => {
    ingredients.map((ing) => {
      let tempData = { name: ing.recipe_name,idd: ing._id,checked:1};
      setInsertData(prev => [...prev, tempData]);  
    });
  }, [ingredients]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Icon name="heart" size={30} color="#ff0000" />
        <Text style={styles.text}>찜한 요리 목록</Text>
        </View>
   
      <ScrollView contentContainerStyle={styles.scroll}>
      {
       insertData && insertData.map((food, index)=>{
         return(
        <View style={styles.list} key={index}>
          <Text style={styles.name}>{food.name}</Text>
          <View style={styles.nolike} >
            <TouchableOpacity   onPressIn={()=>{pushHeart(index,food)}} >
            <Icon name={checked? 'heart-outline' : 'heart'} size={30} color="#ff0000" />
             </TouchableOpacity>
          </View>
        </View>);
        })
      }
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

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {API_URL} from "../config/constants";
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FridgeCold ({ isSelectBtn }) {
  const id = useSelector((state) => state.id);
  const [ingredients, setIngredients] = React.useState([]);
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  const [select, setSelect] = React.useState([]);
  const [flagstate, setFlagstate] = React.useState([]);
  const [insertData, setInsertData] = React.useState([]);
  const [cook, setCook] = useState([]);

  let get = [{
    _id:'',ing_name: '', ing_expir: '',  ing_img: ''
  }]

  React.useEffect(()=>{
    axios.get(`${API_URL}/main`,{params:{user_id:id,ing_frozen:0},get}
    ).then((result)=>{
      setIngredients(result.data);
      console.log("루루루",result.data);
      //console.log("루루루",result.config.get);
    }).catch((error)=>{
      console.error(error);
    })
  }, []);

  React.useEffect(() => {
    ingredients.map((ing) => {
      let tempData = {  id:ing._id,name: ing.ing_name, img: ing.ing_img, checked: 0 };
      setInsertData(prev => [...prev, tempData]);
      console.log("들어왔니",insertData);
    });
  }, [ingredients]);


  const checkHandle = (index, food) => {//일부 선택
    const newItems = [...insertData];
    newItems[index]['checked'] = food.checked == 1 ? 0 : 1;
    setInsertData(newItems);
    let cookdata = { _id:food.idd,user_id: id, ing_name: food.name} //체크 된 배열 
    if (food.checked == 1) { //체크 한 배열
      setCook([...cook, cookdata]);
       console.log("들어감",cook);
    }
    else if (food.checked == 0) {//체크 취소한 배열 빼기
      cook.splice(index, 1);
       console.log("나감",cook);
    }
  }

    return (
      <View>
        <ScrollView>
       {
          insertData && insertData.map((food, i) => {
            let photo = { uri: food.img };
            return (
      <TouchableOpacity key={i} onPress={() => checkHandle(i, food)} >        
          <View style={food.checked==0 ? styles.ingredientsCard:styles.ingredientsCard2} >
              <Image 
                style={styles.ingredientsImage} 
                source={photo}
                resizeMode="contain"/>
            
            <View style={styles.ingredientsContents}>
              <Text style={styles.ingredientsFont} >{food.name}</Text>
              {/* <Text style={styles.ingredientsFont} >12</Text> */}
            </View>
          </View>
        </TouchableOpacity>
          );})
              }
                </ScrollView>
              </View>);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  ingredientsCard: {
    marginTop: Dimensions.get('screen').width*0.09,
    marginLeft: Dimensions.get('screen').width*0.09,
    width: Dimensions.get('screen').width*0.36,
    borderColor: "#191919",
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  ingredientsCard2: {
    marginTop: Dimensions.get('screen').width*0.09,
    marginLeft: Dimensions.get('screen').width*0.09,
    width: Dimensions.get('screen').width*0.36,
    borderColor: "#191919",
    backgroundColor: 'white',
    opacity: 0.6,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -3
    },
    
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  ingredientsImage: {
    width: "100%",
    height: 130,
  },
  ingredientsContents: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ingredientsFont: {
    fontSize: 20,
  },
  ingredientsList: {
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap'
  }
});
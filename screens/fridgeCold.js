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
import {useSelector, useDispatch} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import {cookbtn} from './reducer/action'

export default function FridgeCold ({ isSelectBtn }) {
  const id = useSelector((state) => state.id);
  const [selects,setSelects]=useState(0);
  const [ingredients, setIngredients] = React.useState([]);
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);
  const [select, setSelect] = React.useState([]);
  const [flagstate, setFlagstate] = React.useState([]);
  const [insertData, setInsertData] = React.useState([]);
  const [cook, setCook] = useState([]);
  const [cook2, setCook2] = useState([]);
  let get = [{
    _id:'',ing_name: '', ing_expir: '',  ing_img: ''
  }]

  React.useEffect(()=>{
    axios.get(`${API_URL}/main`,{params:{user_id:id,ing_frozen:0},get}
    ).then((result)=>{
      setIngredients(result.data);
      console.log("냉장고 재료",result.data);
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

  React.useEffect(()=>{
    isSelectBtn(flagstate,cook2);
  }, [flagstate]);

  const checkHandle = (index, food) => {//일부 선택
    const newItems = [...insertData];
    newItems[index]['checked'] = food.checked == 1 ? 0 : 1;
    setInsertData(newItems);
    let cookdata = { _id:food.idd,user_id: id, ing_name: food.name} //체크 된 배열 
    if (food.checked == 1) { //체크 한 배열
      setCook([...cook, cookdata]);
      cook2.push(food.name);
       //console.log("들어감",cook);
       //console.log("배열길이 추가",cook.length);
       console.log("이게 저기로 갑니다",cook2)
       if(cook.length>=0){
        setFlagstate({flag: true});
      }
      
    }
    else if (food.checked == 0) {//체크 취소한 배열 빼기
      cook.splice(index, 1);
      cook2.splice(index, 1);
      console.log("배열길이 취소",cook.length);
      if(cook.length<1){
        setFlagstate({flag: false});
      }
  
    }

  }

    return (
      <View  style={styles.container}>
        <ScrollView style={styles.scroll} horizontal={false}>
          <View style={styles.cardview}>
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
              }</View>
                </ScrollView>
              </View>);

}

const styles = StyleSheet.create({
  scroll:{
    flex: 1,
    width:"100%",
    backgroundColor:"#f2f2f2"
  },
  cardview:{
    flexDirection:"row",
    flexWrap:"wrap",
    //paddingHorizontal:16,
    paddingTop:5,
    justifyContent:"space-between",

  },
  container: {
    flex: 1,
    flexWrap:"wrap",
    width:'100%',
    justifyContent:"space-between",
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  ingredientsCard: {
    flex:1,
    marginTop: Dimensions.get('screen').width*0.09,
    marginLeft: Dimensions.get('screen').width*0.06,
    marginRight: Dimensions.get('screen').width*0.06,
    width: Dimensions.get('screen').width*0.38,
    borderColor: "#191919",
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    alignItems:'center',
    justifyContent:'center'
  },
  ingredientsCard2: {
    flex:1,
    marginTop: Dimensions.get('screen').width*0.09,
    marginLeft: Dimensions.get('screen').width*0.06,
    marginRight: Dimensions.get('screen').width*0.06,
    width: Dimensions.get('screen').width*0.38,
    borderColor: "#191919",
    backgroundColor: 'white',
    opacity: 0.6,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -3
    },
    alignItems:'center',
    justifyContent:'center',
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  ingredientsImage: {
    width: Dimensions.get('screen').width*0.30,
    height: 150,
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
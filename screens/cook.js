import axios from 'axios';
import  React , {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Linking } from 'react-native';
import { API_URL } from '../config/constants.js';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function CookScreen ({ route, navigation }) {
  const {ing} =route.params;
  const {recipe} =route.params;
  // console.log("배열 드르옴",ing);
  // console.log("레시피 드르옴",recipe);

  const [ingredients, setIngredients] = React.useState([]);
  const [ingredient, setIngredient] = React.useState([]);
  const aLoop = [];
  const [checked, setChecked] = useState(0);
  const [insertData, setInsertData] = React.useState([]);
  const [like, setLike] = useState([]);
  const id = useSelector((state) => state.id);

  
  React.useEffect(() => {
    recipe.map((ing) => {
      let tempData = { name: ing.recipe_name,idd: ing._id,checked:0};
      setInsertData(prev => [...prev, tempData]);    
    });
   
  }, []);

  const pushHeart =(index, food)=>{
      const newItems = [...insertData];
      newItems[index]['checked'] = food.checked == 1 ? 0 : 1;
      setInsertData(newItems);
      let likedata = { _id:food.idd, ing_name: food.name} //체크 된 배열 
      if (food.checked == 1) { //체크 한 배열
        setLike( [...like,likedata]);
        console.log(food.name);
        axios.post(`${API_URL}/cook/myheart`,
       { user_id:id,
        recipe_name:food.name})
        .then((res) => {
          //console.log("보냄", res.config.data);
          console.log("찜하기 전송", res.data);
        }).catch(error => {
          console.log(error);
          console.log('전송 에러남');
        })
      }
      else if (food.checked == 0) {//체크 취소한 배열 빼기     
        like.splice(index, 1);
        axios.post(`${API_URL}/mypage/myheart/cancel`,
        { user_id:id,
         recipe_name:food.name})
         .then((res) => {
           //console.log("보냄", res.config.data);
           console.log("찜하기 취소", res.data);
         }).catch(error => {
           console.log(error);
           console.log('취소 에러남');
         })
      }
  };

  const pushMemory =(index, food)=>{
    axios.post(`${API_URL}/cook/list`,
    {user_id:id,recipe_name:food.name})
     .then((res) => {
       //console.log("보냄", res.config.data);
       console.log("시청 기록", res.data);
     }).catch(error => {
       console.log(error);
       console.log('기록 에러남');
     })
     Linking.openURL(`https://www.youtube.com/results?search_query=${food.name}`)
  }



  return (
    <SafeAreaView style={styles.container}>
       <TouchableOpacity
          onPress={()=>{
              navigation.goBack()
          }}
          >
            <Icon name="arrow-left" style={{marginLeft: 16, marginBottom: 20}} size={40} color="#191919" />
          </TouchableOpacity>

      <Text style={styles.title}>요리하기</Text>
      <Text style={styles.appTitle}>내가 선택한 재료</Text>
        <View style={styles.mypicks} >
        {
        ing.map((ing, index)=>{
          return (
          <Text key={index} style={styles.mypick}>{ing}</Text>
          );
        })
      }
      </View>
      <View style={styles.card}>
        <ScrollView>
        {
          insertData && insertData.map((food, i) => {
            return (
          <View style={styles.menu}  key={i}>
            <View 
              width={Dimensions.get('screen').width *0.58}>
              <Text style={styles.food_text}>{food.name}</Text>
                <View style={styles.ing_container}>
                {/* {
                ing.map((ing, index)=>{
                  return (
                    <Text key={index} style={styles.food_ing}>{ing}</Text>
                    );
                  })
                } */}
              </View>
            </View>
            <View style={styles.container3}
                width={Dimensions.get('screen').width *0.2}>
              <TouchableOpacity style={styles.icon} onPress={() => {
                 pushMemory(i,food)
                                    }} >
                <Icon name="silverware-fork-knife" size={26} color="#fff" />
              </TouchableOpacity>
              <View style={styles.icon2}>
              <TouchableOpacity  onPressIn={()=>{pushHeart(i,food)}} >
            <Icon name={food.checked? 'heart' : 'heart-outline'} size={26} color="#fff" />  
              </TouchableOpacity></View>
            </View>
          </View>
            );
          })
        }
        </ScrollView>
      </View>
  </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f59b23',
    paddingTop:Dimensions.get('screen').width *0.3
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    textAlign: 'left',
  },
  appTitle: {
    color: '#ffffff',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 20,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#ffffff',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10, 
  },
  container3: {
    flexDirection:'row',
    justifyContent:'flex-end',
    marginRight:20,
    alignItems:'center',
  },
  food_text: {
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft:Dimensions.get('screen').width*0.08,
    alignItems:'center',
    justifyContent:'center',
  },
  food_ing: {
    fontWeight: '500',
    fontSize: 17,
    marginBottom:20,
    marginTop:10,
    marginRight: 10,
    },
 icon:{
   width:Dimensions.get('screen').width*0.15,
   padding:10,
   marginRight:1,
   backgroundColor:'#F59A23',
   alignItems:'center',
   borderTopLeftRadius:10,
   borderBottomLeftRadius:10,
   elevation: 10
 },
 icon2:{
  width:Dimensions.get('screen').width*0.15,
  padding:10,
  backgroundColor:'#F59A23',
  alignItems:'center',
  borderTopRightRadius:10,
  borderBottomRightRadius:10,
  elevation: 10
},
 menu:{
  borderBottomColor: '#FFD098',
  borderBottomWidth: 2,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  height:Dimensions.get('screen').width *0.27,
  paddingTop:5
 },
 mypicks:{
  flexDirection:'row',
  marginBottom:20,
  marginLeft:Dimensions.get('screen').width *0.035,
 },
 mypick:{
   borderColor:"#fff",
   backgroundColor:'#fff',
   fontSize: 16,
   fontWeight: 'bold',
   alignItems:'center',
   padding:12,
   borderRadius:20,
   height:45,
   marginRight:15,
   elevation: 10,
 },
 ing_container: {
   display: 'flex',
   flexDirection:'row', 
   justifyContent: 'flex-start',
   marginLeft:Dimensions.get('screen').width*0.07,
  }
});

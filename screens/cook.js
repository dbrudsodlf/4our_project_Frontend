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
import {API_URL} from '../config/constants.js';

export default function CookScreen (props) {
  const Array =props.route.params;
  console.log("배열 드르옴",Array)
  const [ingredients, setIngredients] = React.useState([]);
  const [ingredient, setIngredient] = React.useState([]);
  const aLoop = [];
  const [checked, setChecked] = useState(false);
  const [insertData, setInsertData] = React.useState([]);
  const [like, setLike] = useState([]);

  const pushHeart =(index, food)=>{
      const newItems = [...insertData];
      newItems[index]['checked'] = food.checked == 1 ? 0 : 1;
      setInsertData(newItems);
      let likedata = { _id:food.idd, ing_name: food.name} //체크 된 배열 
      if (food.checked == 1) { //체크 한 배열
        setLike( [...like,likedata]);
         console.log("들어감",like);
      }
      else if (food.checked == 0) {//체크 취소한 배열 빼기     
        like.splice(index, 1);
      }
  };

  React.useEffect(()=>{
    axios.get(`${API_URL}/search`
    ).then((result)=>{
      setIngredients(result.data);
      console.log("냉장고 재료",result.data);
    }).catch((error)=>{
      console.error(error);
    })
  }, []);

  React.useEffect(() => {
    ingredients.map((ing) => {
      let tempData = { name: ing.ing_name,idd: ing._id,checked:0};
      setInsertData(prev => [...prev, tempData]);
    });
  }, [ingredients]);

  
  ingredient.map((ingg, idx)=>{
    Array.map((unit, index)=>{
      if(unit==ingg.id) {
        aLoop.push(ingg);
      }
    });
  })
  
  if(!ingredient) {
    return <ActivityIndicator />
  }

 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>내가 선택한 재료</Text>
        <View style={styles.mypicks} >
        {
        aLoop.map((ingredientt, index)=>{
          return (
          <Text key={index} style={styles.mypick}>{ingredientt.name}</Text>
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
                aLoop.map((ingredientt, index)=>{
                  return (
                    <Text key={index} style={styles.food_ing}>{ingredientt.name}</Text>
                    );
                  })
                } */}
              </View>
            </View>
            <View style={styles.container3}
                width={Dimensions.get('screen').width *0.2}>
              <TouchableOpacity style={styles.icon} onPress={() => {
                      props.navigation.navigate("youtubeList")
                    }} >
                <Icon name="silverware-fork-knife" size={30} color="#fff" />
              </TouchableOpacity>
              <View style={styles.icon2}>
              <TouchableOpacity  onPressIn={()=>{pushHeart(i,food)}} >
            <Icon name={food.checked? 'heart-outline' : 'heart'} size={30} color="#fff" />  
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
    backgroundColor: '#FFD098',
    paddingTop:50
  },
  appTitle: {
    color: '#000',
    fontSize: 28,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    textAlign: 'left',
    backgroundColor: '#FFD098',
    fontWeight:'bold'
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10, 
    marginLeft: 20,
    marginRight: 20,
  },
  container3: {
    flex:1,
    flexDirection:'row',
alignItems:'center'
  },
  
  food_text: {
    flex: 5,
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft:25,
    marginTop:20
  },
  food_ing: {
    fontWeight: '500',
    fontSize: 17,
    marginBottom:20,
    marginTop:10,
    marginLeft:10,
    },
 icon:{
   width:53,
   padding:10,
   marginRight:1,
   backgroundColor:'#F59A23',
   alignItems:'center',
   borderTopLeftRadius:25,
   borderBottomLeftRadius:25
 },
 icon2:{
  width:53,
  padding:10,
  backgroundColor:'#F59A23',
  alignItems:'center',
  borderTopRightRadius:25,
  borderBottomRightRadius:25
},
 menu:{
  borderBottomColor: '#FFD098',
  borderBottomWidth: 2,
  flexDirection:'row',
  alignItems:'center',
  height:70
 },
 mypicks:{
  backgroundColor:"#FFD098",
  flexDirection:'row',
  marginBottom:30,
  marginLeft:30
 },
 mypick:{
   borderColor:"#fff",
   backgroundColor:'#fff',
   borderWidth:2,
   fontSize: 17,
   fontWeight: 'bold',
   alignItems:'center',
   padding:12,
   borderRadius:20,
   height:45,
   marginRight:15
 },
 ing_container: {
   display: 'flex',
   flexDirection:'row', 
   justifyContent: 'flex-start',
   marginLeft: 18,
  }
});

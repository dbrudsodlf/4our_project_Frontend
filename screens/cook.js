import axios from 'axios';
import * as React from 'react';
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
  const [ingredient, setIngredient] = React.useState([]);
  const aLoop = [];

  React.useEffect(()=>{
    axios.get(`${API_URL}/fridgecold`).then((result)=>{
      setIngredient(result.data.ingredients);
    }).catch((error)=>{
      console.error(error);
    })
  }, []);


  
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
          <View style={styles.menu}>
            <View 
              width={Dimensions.get('screen').width *0.6}>
              <Text style={styles.food_text}>토마토 달걀 볶음</Text>
                <View style={styles.ing_container}>
                {
                aLoop.map((ingredientt, index)=>{
                  return (
                    <Text key={index} style={styles.food_ing}>{ingredientt.name}</Text>
                    );
                  })
                }
              </View>
            </View>
            <View style={styles.container3}
                width={Dimensions.get('screen').width *0.2}>
              <TouchableOpacity style={styles.icon} onPress={() => {
                      props.navigation.navigate("youtubeList")
                    }} >
                <Icon name="silverware-fork-knife" size={40} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
  </SafeAreaView>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD098',
  },
  appTitle: {
    color: '#000',
    fontSize: 25,
    marginTop: 30,
    marginBottom: 15,
    fontWeight: 'bold',
    marginLeft:30,
    backgroundColor: '#FFD098',
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
    alignItems: 'flex-end',
  },
  food_text: {
    flex: 5,
    fontWeight: 'bold',
    fontSize: 25,
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
   width:90,
   padding:7,
   backgroundColor:'#F59A23',
   alignItems:'center',
   borderRadius:25
 },
 menu:{
  borderBottomColor: '#FFD098',
  borderBottomWidth: 2,
  flexDirection:'row',
  alignItems:'center'
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

import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import error from '../assets/error.jpg';

export default function cameraError () {
  return (
    <View  style={styles.container}>
      <View style={styles.container2}> 
        <View >
            <Image style={styles.img} source={error} />
        </View>
        <Text style={styles.text1}>
          재료를 인식하지 못했어요
        </Text>
        <Text style={styles.text2}>
          주변이 깨끗한지 확인하고
        </Text>
        <Text style={styles.text3}>
           20cm 정도 거리에서 촬영해주세요!
        </Text>
        <TouchableOpacity style={styles.tbtn1}>
            <Text style={styles.btn1}>다시 촬영하러 가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    height:'100%'
  },
  container2:{
    flexDirection:'column',
    alignItems:'center'
  },
  img:{
    width:250,
    height:200, 
    marginTop:100  
},
  text1:{
  marginTop:50,
  marginBottom:30,
  fontSize:23,
  fontWeight:'bold'
},
text2:{
    fontSize:18,
    fontWeight:'bold',
    marginBottom:5,
    color:'#483d8b'
  },
  text3:{
    fontSize:18,
    fontWeight:'bold',
    color:'#483d8b',
    marginBottom:50
  },
name:{
    fontSize:30,
    fontWeight:'bold',
    marginTop:20,
    marginBottom:40
},
btn1:{
    fontSize:18,
    padding:12,
    paddingRight:50,
    paddingLeft:50,
    borderWidth:1,
    borderRadius:10
}
});

import React from "react";
import {Text,TouchableOpacity,View,StyleSheet,Image} from "react-native";
import camera from '../assets/camera.png';
import hand from '../assets/hand.png';
import egg from '../assets/avocado.png';

export default function StartScreen() {
    return (
     <View style={styles.container}>
        <Image style={styles.egg} source={egg} />
        <View style={styles.hand}>
          <Image style={styles.hand} source={hand} /></View>
        <TouchableOpacity style={styles.flex}>
        <View style={styles.cameraicon}>
          <Image style={styles.camera} source={camera} /></View>
        <View style={styles.btn1}>
          <Text style={{fontSize: 18,padding:10,marginRight:40}}>재료 인식 시작하기</Text>
          <Text  style={{fontSize: 12,marginRight:10}}>간단한 촬영으로 나의 냉장고 완성하기</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flex2}>
        <View style={styles.btn2}>
          <Text style={{fontSize: 15,padding:10,marginRight:40}}>다음에 인식할래요</Text>
        </View>
        </TouchableOpacity>
      </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        flexDirection:'column',      
        backgroundColor: '#FFD098',
        justifyContent: 'center',
        alignItems:"center",
      },
      hand:{
        position:'absolute',
        top: 20,
        right: 0,
        width: 500,
        height: 500, 
      },
      egg:{
        left: 10,
        width: 170,
        height: 340, 
        marginBottom:140
      },
     flex:{
        position:'absolute',
        top: 520,
        right: 50,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems:"center",
        width: 300,
        height: 110,
        backgroundColor: '#fff' ,
        borderRadius: 10,
      },
      flex2:{
        position:'absolute',
        top: 635,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems:"center",
        left:150
      },
    btn1: {
      padding: 10,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    camera:{
        width: 40,
        height: 40,  
    },
    cameraicon:{
        width: 70,
        height: 70,
        backgroundColor: '#FFD098',
        borderRadius: 10,
        alignItems:"center",
        justifyContent: "center",
       marginLeft:20,
    }
  });
  
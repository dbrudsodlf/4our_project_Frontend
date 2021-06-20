import React from "react";
import {Text,TouchableOpacity,View,StyleSheet,Image,Dimensions} from "react-native";
import camera from '../assets/camera.png';
import hand from '../assets/hand.png';
import egg from '../assets/avocado.png';

export default function StartScreen(props) {
    return (
     <View style={styles.container}>
        <Image style={styles.egg} source={egg} />
        <View style={styles.hand}>
          <Image style={styles.hand} source={hand} />
             </View>
             <View>
        <TouchableOpacity style={styles.flex1} >
        <View style={styles.cameraicon}>
          <Image style={styles.camera} source={camera} /></View>
        <View style={styles.btn1}>
          <Text style={{fontSize: 18,padding:10,marginRight:40}}>재료 인식 시작하기</Text>
          <Text  style={{fontSize: 12,marginRight:10}}>간단한 촬영으로 나의 냉장고 완성하기</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flex2} onPress={() => {
            props.navigation.navigate("MainScreen")
          }}>
        <View style={styles.btn2}>
          <Text style={{fontSize: 15,padding:10,marginRight:40}}>냉장고 바로가기 </Text>
        </View>
        </TouchableOpacity>
      </View></View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        flexDirection:'column',      
        backgroundColor: '#FFD098',
        alignItems:'center',
        justifyContent: 'center',
      },
      hand:{
        position:'absolute',
        top: 55,
        right:0,
        width: 600,
        height: 500, 
      },
      egg:{
        position:'absolute',
        width: 200,
        height: 400, 
       top:140,
       left: 85
      },
     flex1:{
        flexDirection:"row",
        justifyContent: 'center',
        alignItems:"center",
        width: 300,
        height: 110,
        backgroundColor: '#fff' ,
        borderRadius: 10,
        marginTop:500
      },
      flex2:{
        flexDirection:"row",
        justifyContent: 'center',
        alignItems:"center",
        marginTop:20,
        borderWidth:1,
        borderColor:"#000",
        width: 300,
        paddingLeft:40,
        borderRadius:10
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
    },

  });
  
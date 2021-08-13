import React,{useState} from "react";
import {Text,TouchableOpacity,View,StyleSheet,Image,Dimensions} from "react-native";
import camera from '../assets/camera.png';
import hand from '../assets/hand.png';
import avocado from '../assets/avocado.png';
import * as ImagePicker from 'expo-image-picker';
export default function StartScreen(props) {
  const [pickedImagePath, setPickedImagePath] = useState('');
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
        setPickedImagePath(result.uri);
        console.log(result.uri);
    }
}

    return (
     <View style={styles.container}>
        {/* <Image style={styles.avocado} source={avocado} /> */}
        <View style={styles.hand}>
          <Image style={styles.hand} source={hand} />
             </View>
             <View>
        <TouchableOpacity style={styles.flex1}  onPress={openCamera} >
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
        height:'100%'
      },
      hand:{
        position:'absolute',
        top:Dimensions.get('screen').height/100,
        right:25,
        width:Dimensions.get('screen').width ,
        height: Dimensions.get('screen').height/1.5 ,
      },
      avocado:{
        position:'absolute',
        width: Dimensions.get('screen').width/2.5,
        height: 400, 
       top:105,
       left: 103
      },
     flex1:{
        flexDirection:"row",
        justifyContent: 'flex-start',
        alignItems:"center",
        width: Dimensions.get('screen').width*0.9,
        height: 110,
        backgroundColor: '#fff' ,
        borderRadius: 10,
        marginTop:Dimensions.get('screen').height/1.8,
        paddingLeft: Dimensions.get('screen').width/20
      },
      flex2:{
        flexDirection:"row",
        justifyContent: 'center',
        alignItems:"center",
        marginTop:30,
        borderWidth:1,
        borderColor:"#000",
        width: Dimensions.get('screen').width*0.9,
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
    },
  
  });
  
import React,{useState} from "react";
import {Text,TouchableOpacity,View,StyleSheet,Image,Dimensions} from "react-native";
//import camera from '../assets/camera.png';
import icon from '../assets/4ouricon.jpeg';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL, flask_url } from '../config/constants.js';
import { Ionicons } from '@expo/vector-icons';

export default function StartScreen(props) {
  const name = useSelector((state) => state.name);
  console.log("이름",name)
  const navigation = useNavigation();

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
    console.log("성공",result);

    if (!result.cancelled) {
        // navigation.navigate("cameraCheck", { photo:result.uri });
        //let img_url =result.uri;
        // console.log(createFormData(result));

        const data = new FormData();
    
        data.append('image', {
        name: 'image',
        type: 'image/jpeg',
        uri: Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri,
        });

        axios.post(`${flask_url}/camera/predict`,
        data
        )
        .then((res)=>{
            console.log("보냄", res);
            console.log(res.data.label);
            navigation.navigate('cameraCheck', {photo:result.uri, ingLabel: res.data.label});
        }).catch(error=>{
            console.log(error);})
      }

    }

    return (
     <View style={styles.container}>
        <View style={styles.miniBox}>
          <TouchableOpacity style={styles.flex1}  onPress={openCamera} >
            <Ionicons name='remove-outline' style={{}}size={66} color='#191919' />
            <View style={styles.iconStyle}>
              <Image style={styles.icon} source={icon} />
            </View>
            <Ionicons style={styles.cameraicon} name='camera' size={35} color='white' />
              <Text style={{fontSize: 18, margin: 20, fontWeight: 'bold'}}>재료 인식 시작하기</Text>
          </TouchableOpacity>
        </View>
        <Text  style={{fontSize: 14, marginTop: 6, fontWeight: 'bold'}}>간단한 촬영으로 나의 냉장고 완성하기</Text>
        <TouchableOpacity  onPressIn={() => {
             props.navigation.replace("MainScreen");
          }}>
          <View style={styles.btn2}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}> {name}님의 냉장고 바로가기 </Text>
          </View>
        </TouchableOpacity>
      </View>
      );
}

const styles = StyleSheet.create({
    container: {  
        backgroundColor: '#f59b23',
        alignItems:'center',
        justifyContent: 'center',
        height:'100%',
      },
    miniBox: {
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff' ,
      borderRadius: 10,
      elevation: 10,
    },
    icon:{
      alignItems: 'center',
      backgroundColor: '#f59b23',
      width:Dimensions.get('screen').width*0.8 ,
      height: Dimensions.get('screen').height*0.4 ,
      borderRadius: 10,
      overflow: "visible",
    },
    iconStyle: {
      borderRadius: 10,
      backgroundColor: '#f59b23',
      elevation: 10,
    },
    flex1:{
      alignItems:"center",
      width: Dimensions.get('screen').width*0.9,
      justifyContent: 'flex-end',
    },
    cameraicon:{
      marginTop: 20,
      padding: 15,
      backgroundColor: '#f59b23',
      borderRadius: 50,
      alignItems:"center",
      justifyContent: "center",
      elevation: 10,
    },
    btn2: {
      backgroundColor: 'white',
      marginTop: 30,
      padding: 16,
      width: Dimensions.get('screen').width*0.9,
      borderRadius: 10,
      alignItems: 'center',
      elevation: 10,
    }
  });
  
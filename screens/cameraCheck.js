import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL, flask_url } from '../config/constants.js';
import FormData from 'form-data';
import * as ImagePicker from 'expo-image-picker';

const createFormData = (photo) => {
  const data = new FormData();
  console.log(photo);

  data.append('image', {
    name: 'image',
    type: 'image/jpeg',
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  return data;
};

export default function cameraCheck ({ route, navigation }) {
  const { photo } = route.params;
  const { ingLabel } = route.params;
  const image = { uri: photo };
  // const [label, setLabel] = useState('');

  // React.useEffect(() => {
  //   axios.post(`${flask_url}/camera/predict`)
  //     .then((result) => {
  //       console.log(result.label);
  //       setLabel(result.label);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     })
  // }, []);

  const handleUploadPhoto = async () => {
        axios.post(`${flask_url}/predict`, createFormData(photo, { userId: '1' })
        // ,
        // {
        //   name: photo.fileName,
        //   type: photo.type,
        //   uri: photo.uri
        //  }
         )
        .then((res)=>{
            console.log("데이터 보냄",res.config.data);
        }).catch(error=>{
            console.log(error);})
      };

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
        navigation.navigate("cameraCheck", { photo:result.uri });
        //let img_url =result.uri;
        console.log(createFormData(result));

        axios.post(`${flask_url}/camera/predict`,
        createFormData(result))
        .then((res)=>{
            console.log("보냄", res);
            console.log(res.data.label);
        }).catch(error=>{
            console.log(error);})
      }
    }


  return (
    <View  style={styles.container}>
      <View style={styles.container2}> 
        <Text style={styles.text}>
          촬영한 재료가 맞나요?
        </Text>
        <View style={styles.imgborder}>
            <ImageBackground style={styles.img} source={image} />
        </View>
        <Text style={styles.name}>{ingLabel}</Text>
        <TouchableOpacity style={styles.tbtn1} onPress={openCamera}>
            <Text style={styles.btn1}>다시 촬영하러 가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tbtn2} onPress={handleUploadPhoto}>
            <Text style={styles.btn2}>저장하고 다른 재료도 추가하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    height:'100%',
    paddingTop:40
  },
  container2:{
    flexDirection:'column',
    alignItems:'center'
  },
  text:{
  marginTop:50,
  marginBottom:30,
  fontSize:20,
  color:'#696969',
  alignItems:'center'
},
imgborder:{
    borderWidth:1,
    borderColor:'#000'
},
img:{
    width:250,
    height:200,   
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
    paddingRight:60,
    paddingLeft:60,
    borderWidth:1,
    borderRadius:10
},
btn2:{
    fontSize:18,
    padding:12,
    paddingRight:16,
    paddingLeft:16,
    borderWidth:1,
    borderColor:'#F59A23',
    borderRadius:10,
    marginTop:30,
    backgroundColor:'#F59A23',
    color:'#fff'
}
});

import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL, flask_url } from '../config/constants.js';
import FormData from 'form-data';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

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

  const [ingredients, setIngredients] = React.useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  let today = new Date();
  const [date, setDate] = useState(new Date(today));
  const [todate, setTodate] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState('');
  const [fridge, setFridge] = useState(1);//디폴트 냉장선택
  const [fridgeice, setFridgeice] = useState(0);
  const [frozen, setFrozen] = useState(0);

  const [name, setName] = useState('');
  const [result, setResult] = React.useState([]);
  const id = useSelector((state) => state.id);
  const[ cart, setCart]=useState([]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    console.log("고른날짜",currentDate)
    shortdate(currentDate);
    setDate(currentDate);
  };

  const shortdate=(date)=>{ //날짜만 출력
    if(date==null){
      setDate(today);
    }

    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }

    if (month < 10) {
      month = '0' + month;
    }
    let tt=year+'-' + month + '-'+dt;
    setTodate(tt);
    console.log("1",todate);
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const toggleModal = (item) => {//모달띄우기
    setModalVisible(!isModalVisible);
    setModalName(item);
  };

  const gotocart = () => {
    let cartdata={user_id: id,ing_expir: todate, ing_frozen: frozen, ing_name: modalName }
    setCart([...cart,cartdata]);
    }

  const putincart=()=>{
    axios.post(`${API_URL}/camera/add`,
    {
      user_id: id,
      ing_name: modalName,
      ing_expir: todate,
      ing_frozen: frozen,
    }
      )
      .then((res) => {
        console.log("고른거 보내기", res.config.data);
      }).catch(error => {
        console.log(error);
      })
    }
  const frozenpick = (fridge, fridgeice) => {
    if (fridgeice == 0) {
      setFridge(1);
      setFridgeice(0);
    } else if (fridgeice == 1) {
      setFridge(1);
      setFridgeice(0);
    }
    setFrozen(0);
  }

  const frozenpick2 = (fridge, fridgeice) => {
    if (fridge == 0) {
      setFridge(0);
      setFridgeice(1);
    } else if (fridge == 1) {
      setFridge(0);
      setFridgeice(1);
    }
    setFrozen(1);
  }

  const { photo } = route.params;
  const { ingLabel } = route.params;
  const image = { uri: photo };
  //const [ingLabel, setIngLabel] = useState(route.params);

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

  const goToCameraList = async () => {
    navigation.navigate('cameraCart');
  }

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
        
        console.log(result);
        console.log(createFormData(result));

        //setIngLabel(route.params);
        axios.post(`${flask_url}/camera/predict`,
        createFormData(result))
        .then((res)=>{
            console.log("보냄", res);
            console.log(res.data.label);
            navigation.navigate("cameraCheck", { photo:result.uri, ingLabel: res.data.label });
        }).catch(error=>{
            console.log(error);})
      }
    }


  return (
    <View  style={styles.container}>
      <View style={styles.container2}> 
        <View>
          <ImageBackground style={styles.img} source={image} />
        </View>
        <Text style={styles.name}>{ingLabel}</Text>
        <Text style={styles.text}>
          촬영한 재료가 맞나요?
        </Text>
        
        <TouchableOpacity style={styles.tbtn2} onPressIn={() => toggleModal(ingLabel)}>
            <Text style={styles.btn2}>저장하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.tbtn1} onPress={openCamera}>
            <Text style={styles.btn1}>다른 재료 촬영하러 가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartBtn} onPressIn={() => {//장바구니로 이동
            goToCameraList()
          }}>
          {/* <Ionicons name="basket-outline" size={30} color="white" /> */}
          <Text style={{ color: 'white', fontSize: 18 }}>재료 촬영 끝내기</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        closeOnTouchOutside={true}
        isVisible={isModalVisible}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.modal}>
          <View style={styles.modal2}>
            <Text style={styles.food} key={ingredients}>{modalName}</Text>
            <Text style={styles.date} >유통 기한</Text>
            <TouchableHighlight underlayColor='#fff' onPressIn={showDatepicker}>
              <View style={styles.showdate} >
                <Icon name="calendar" size={26} color="#8C9190" />
                <Text style={styles.date2}>{date.toLocaleDateString('ko-KR')}</Text>
              </View>
            </TouchableHighlight>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="spinner"
                onChange={onChange}
                format="YYYY/MM/DD"
              />
            )}
            <Text style={styles.fridge}>보관 방법</Text>
            <View style={styles.frozenpick}>
              <TouchableOpacity delayPressIn={0} style={fridge == 0 ? styles.cold : styles.cold2} onPressIn={() => { frozenpick(fridge, fridgeice) }}  >
                <Text style={fridgeice == 0 ? styles.coldd : styles.coldd2}>냉장</Text>
              </TouchableOpacity>
              <TouchableOpacity delayPressIn={0} style={fridgeice == 0 ? styles.ice : styles.ice2} onPressIn={() => { frozenpick2(fridge, fridgeice) }} >
                <Text style={fridgeice == 0 ? styles.icee : styles.icee2}>냉동</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.touch} >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.button1}
              onPress={() => {
                setModalVisible(!isModalVisible);
                setDate(today);
                setFridge(1);
                setFridgeice(0);
              }}>
              <Text style={styles.txtCancle}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              activeOpacity={1}
              onPress={() => {
                gotocart();
                setModalVisible(!isModalVisible);
                setDate(today);
                setFridge(1);
                setFridgeice(0);
                console.log("----",cart);
                putincart();
              }}>
              <Text style={styles.txt}>담기</Text>
            </TouchableOpacity></View>
        </View>
      </Modal>

    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    height:'100%',
    paddingTop:40,
    flexDirection:'column',
    height:'100%',
    justifyContent: 'center',
    alignItems:'center',
  },
  container2:{
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10,
    elevation: 10,
    width:Dimensions.get('screen').width*0.93,
  },
  text:{
    marginLeft: Dimensions.get('screen').width*0.1,
    alignSelf: 'flex-start',
    marginBottom: Dimensions.get('screen').width*0.12,
    fontSize:16,
    color:'#696969',
    textAlign: 'left',
  },
  img:{
    padding: 0,
    margin: 0,
    width:Dimensions.get('screen').width*0.88,
    height:Dimensions.get('screen').width*0.6,   
    borderRadius: 10,
  },
  name:{
    marginLeft: Dimensions.get('screen').width*0.1,
    marginTop: Dimensions.get('screen').width*0.1,
    alignSelf: 'flex-start',
    fontSize:28,
    fontWeight:'bold',
  },
  btn1:{
    fontSize:18,
    padding:12,
    borderRadius:10,
    width: Dimensions.get('screen').width*0.9,
    height: Dimensions.get('screen').width*0.13,
    alignSelf: 'center', 
    textAlign: 'center',
    marginBottom: 10,
    color: '#191919',
    elevation: 20,
    backgroundColor: '#ffffff',
    fontWeight:'bold',
    marginBottom: 20,
  },
  btn2:{
    fontSize:18,
    padding:12,
    borderWidth:1,
    borderColor:'#f59b23',
    borderRadius:10,
    marginTop:30,
    backgroundColor:'#f59b23',
    color:'#fff',
    width: Dimensions.get('screen').width*0.8,
    height: Dimensions.get('screen').width*0.13,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight:'bold',
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  },
  cartBtn: {
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('screen').width*0.9,
    height: Dimensions.get('screen').width*0.13,
    backgroundColor: '#f59b23',
    borderRadius: 10,
    marginBottom: 10,
    fontWeight:'bold',
  },

  modal: {
    margin: 0,
    width: Dimensions.get('screen').width*0.9,
    height: Dimensions.get('screen').width*1.06,
    backgroundColor: '#fff',
    borderRadius: 20
  },
  modal2: {
    padding: 30,
  },
  food: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 13,
    marginTop: 13,
  },
  showdate: {
    flexDirection: 'row',
    backgroundColor: '#DFDFDF',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 20,
    borderRadius: 20
  },
  fridge: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    width: Dimensions.get('screen').width*0.9,
  },
  date2: {
    fontSize: 20,
    marginRight: 50
  },
  touch: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width*0.9,
    marginTop: 15,
  },
  button1: {
    width: Dimensions.get('screen').width*0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    height: Dimensions.get('screen').width*0.14,
    borderRadius: 10,
    margin: 10,
    elevation: 10,
    marginBottom: 10,
  },
  button2: {
    width: Dimensions.get('screen').width*0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59B23',
    height: Dimensions.get('screen').width*0.14,
    borderRadius: 10,
    margin: 10,
    elevation: 10,
    marginBottom: 10,
  },
  txt: {
    fontSize: 20,
    color: '#fff',
    fontWeight:'bold',
  },
  txtCancle: {
    fontSize: 20,
    color: '#191919',
    fontWeight:'bold',
  },
  cold: {
    marginRight: 20,
    width: Dimensions.get('screen').width*0.33,
    height: Dimensions.get('screen').width*0.15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    backgroundColor: '#ffffff'
  },
  cold2: {
    marginRight: 20,
    width: Dimensions.get('screen').width*0.33,
    height: Dimensions.get('screen').width*0.15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ACD32',
  },
  coldd: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight:'bold',
  },
  coldd2: {
    fontSize: 20,
    color: '#191919',
    fontWeight:'bold',
  },
  ice: {
    marginRight: 20,
    width: Dimensions.get('screen').width*0.33,
    height: Dimensions.get('screen').width*0.15,
    elevation: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  ice2: {
    marginRight: 20,
    width: Dimensions.get('screen').width*0.33,
    height: Dimensions.get('screen').width*0.15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#add8e6'
  },
  icee: {
    fontSize: 20,
    color: '#191919',
    fontWeight:'bold',
  },
  icee2: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight:'bold',
  },
  frozenpick: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 60,
    justifyContent: 'space-between',
  },
});

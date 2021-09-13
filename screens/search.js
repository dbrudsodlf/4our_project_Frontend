import { SearchBar } from 'react-native-elements';
import React, { useState } from 'react';
import { StyleSheet, View, FlatList,  Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import { API_URL } from '../config/constants.js';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function search(props) {
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

  const gotocart = (modalName) => {
    let cartdata={user_id: id,ing_expir: todate, ing_frozen: frozen, ing_name: modalName }
    setCart([...cart,cartdata]);
   
    }

const putincart=()=>{
  axios.post(`${API_URL}/search`,
  cart)
   .then((res) => {
     console.log("보냄", res.config.data);
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

  const searchword = (word) => {
    axios.get(`${API_URL}/search`, { params: { name: word, ing_name: '' } })
      .then((res) => {
        setResult(res.data);
      }).catch(error => {
        console.log(error);
      })
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleArea}>
          <Text style={styles.text}>재료 검색</Text>
          <TouchableOpacity onPress={() => {//장바구니로 이동
            props.navigation.navigate("cart");
            putincart();
          }}>
            <Icon2 name="shopping-cart" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <SearchBar platform='ios' cancelButtonTitle='취소'
        value={name}
        onChange={(event) => {
          const { eventCount, target, text } = event.nativeEvent;
          setName(text);
          { searchword(text) }
        }}
        underlineColorAndroid='transparent'
        placeholder="원하는 재료를 검색해보세요"
      />
      <FlatList
        data={result}
        keyExtractor={(_id, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => {
          return (
            <TouchableHighlight underlayColor='#F59A23' onPress={() => toggleModal(item.ing_name)}>
              <Text style={styles.flatList}>{item.ing_name}</Text>
            </TouchableHighlight>
          );
        }
       }
      />

      <Modal
        transparent={true}
        closeOnTouchOutside={true}
        isVisible={isModalVisible}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.modal}>
          <View style={styles.modal2}>
            <Text style={styles.food} key={ingredients}>{modalName}</Text>
            <Text style={styles.date} >유통 기한</Text>

            <TouchableHighlight underlayColor='#fff' onPress={showDatepicker}>
              <View style={styles.showdate} >
                <Icon name="calendar" size={30} color="#8C9190" />
                <Text style={styles.date2}>{date.toLocaleDateString('ko-KR')}
                </Text></View>
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
              <TouchableOpacity delayPressIn={0} style={fridge == 0 ? styles.cold : styles.cold2} onPress={() => { frozenpick(fridge, fridgeice) }}  >
                <Text style={styles.coldd} >냉장</Text>
              </TouchableOpacity>
              <TouchableOpacity delayPressIn={0} style={fridgeice == 0 ? styles.ice : styles.ice2} onPress={() => { frozenpick2(fridge, fridgeice) }} >
                <Text style={styles.icee}>냉동</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.touch} >
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                setModalVisible(!isModalVisible);
                setDate(today);
                setFridge(1);
                setFridgeice(0);
              }}>
              <Text style={styles.txt}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                gotocart(modalName)
                setModalVisible(!isModalVisible);
                setDate(today);
                setFridge(1);
                setFridgeice(0);
                console.log("----",cart);
              }}>
              <Text style={styles.txt}>담기</Text>
            </TouchableOpacity></View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 35
  },
  titleArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft: 10,
    paddingRight: 30,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  cold: {
    marginRight: 20,
    width: 110,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cold2: {
    marginRight: 20,
    width: 110,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ACD32'
  },
  coldd: {
    fontSize: 20,
  },
  ice: {
    marginRight: 20,
    width: 110,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ice2: {
    marginRight: 20,
    width: 110,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#add8e6'
  },
  icee: {
    fontSize: 20,
  },
  frozenpick: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 50
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  TextInputStyleClass: {
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 7,
    backgroundColor: "#FFFFFF",

  },
  flatList: {
    paddingLeft: 15,
    marginTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 2
  },
  modal: {
    margin: 0,
    width: 300,
    height: 385,
    backgroundColor: '#fff',
    borderRadius: 20
  },
  modal2: {
    padding: 30,
  },
  food: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20
  },
  date: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 13,

  },
  showdate: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#8C9190',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 20,
    borderRadius: 20
  },
  fridge: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,

  },
  date2: {
    fontSize: 20,
    marginRight: 50
  },
  touch: {
    flexDirection: 'row',
    width: 300,
    borderBottomEndRadius: 20
  },
  button1: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59A23',
    height: 60,
    borderColor: '#fff',
    borderBottomLeftRadius: 20
  },
  button2: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59A23',
    height: 60,
    borderColor: '#fff',
    borderBottomRightRadius: 20,
    borderStartWidth: 1
  },
  txt: {
    fontSize: 20,
    color: '#fff'
  }
});
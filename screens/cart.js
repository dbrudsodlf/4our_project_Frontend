import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight, Dimensions, ScrollView, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign';
import { API_URL } from '../config/constants.js';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { ScreenStackHeaderLeftView } from 'react-native-screens';

export default function cart(props) {
  let today = new Date();
  const [date, setDate] = useState(today);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [frozen, setFrozen] = useState(0);
  const [fridge, setFridge] = useState(0);
  const [fridgeice, setFridgeice] = useState(0);
  const [ingredients, setIngredients] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(0); //false
  const [insertData, setInsertData] = React.useState([]);
  const [main, setMain] = useState([]);
  const id = useSelector((state) => state.id);
  let get = [{
    _id: '', ing_name: '', ing_expir: '', ing_frozen: '', ing_img: ''
  }]

  React.useEffect(() => {
    axios.get(`${API_URL}/search/list`, {params: {user_id: id},get})
      .then((result) => {
        setIngredients(result.data);
        console.log("이것은 카트", result.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  React.useEffect(() => {
    ingredients.map((ing) => {
      // ing.ing_expir = changeDateFormat(ing.ing_expir);
      let tempData = { date: ing.ing_expir, name: ing.ing.ing_name, img: ing.ing.ing_img, frozen: ing.ing_frozen, idd: ing._id, checked: 0 };
      setInsertData(prev => [...prev, tempData]);
    });
  }, [ingredients]);

//   React.useEffect(() => {
//     ingredients.map((ing)=> {
//       ing.ing_expir = changeDateFormat(ing.ing_expir);
//     });
// }, [ingredients]);

//   const changeDateFormat = (oldDate) => {
//     if(oldDate === null) {
//       return '2021-01-01'
//     }
//     let newDate = oldDate.substr(0, 10);
//     return newDate
//   }

  const checkHandle = (index, food) => {//일부 선택
    const newItems = [...insertData];
    newItems[index]['checked'] = food.checked == 1 ? 0 : 1;
    setInsertData(newItems);
    let maindata = { _id:food.idd,user_id: id, ing_expir: food.ing_expir, ing_frozen: food.frozen, ing_name: food.name,ing_img:food.img } //체크 된 배열 
    if (food.checked == 1) { //체크 한 배열
      setMain([...main, maindata]);
       console.log("들어감",main);
    }
    else if (food.checked == 0) {//체크 취소한 배열 빼기
      main.splice(index, 1);
      // console.log("나감",main);
    }
  }


  const allCheckHandle = (value) => { //전체선택
    const newItems = [...insertData];
    newItems.map((item, index) => {
      newItems[index]['checked'] = value == 1 ? 0 : 1;
      console.log(value);
    });
    setInsertData(newItems);
    setSelectAll(value == 1 ? 0 : 1);
    console.log("check", selectAll);

  };

  const deleteHandler = (idd) => { //x표 삭제
    console.log(idd);
    axios.delete(`${API_URL}/search/list`, {data:{ _id: idd }})
      .then((res) => {
       // window.location.reload(false);
       console.log("지움w222222222222", res);
        alert("d");
        console.log("지움", idd);
      }).catch(error => {
        console.log(error);
      })

  }

  const onChange = (event, selectedDate) => {//날짜 바꾸기
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

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

  const gotoFridge = () => {
    axios.post(`${API_URL}/search/list`,
      main)
      .then((res) => {
        console.log("보냄", res.config.data);
      }).catch(error => {
        console.log(error);
      })
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>담은 재료</Text>
      <View style={styles.boxtop}>
        <View style={styles.checkboxtop}>
          <TouchableOpacity
            onPressIn={() => allCheckHandle(selectAll)}>
            <Ionicons name={selectAll == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={35} color={selectAll == 1 ? "#F59A23" : "#aaaaaa"} />
          </TouchableOpacity >
          <View style={styles.texttop}>
            <Text style={styles.checkboxtop2}>전체 선택</Text></View>
        </View>


        <TouchableHighlight underlayColor='#fff' style={styles.add}
          onPressIn={() => {
            props.navigation.navigate("MainScreen")
            gotoFridge()
          }}>
          <Text style={styles.add2}>선택 추가하기</Text>
        </TouchableHighlight>
      </View>

      <ScrollView>
        {
          insertData && insertData.map((food, i) => {
            let photo = { uri: food.img };

            return (
              <View style={styles.box} key={i}>
                <View style={styles.boxtop2}>
                  <TouchableOpacity onPress={() => checkHandle(i, food)} >
                    <Ionicons name={food.checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={35} color={food.checked == 1 ? "#F59A23" : "#aaaaaa"} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteHandler(food.idd)}>
                    <Icon name="close" size={30} color="#000" />
                  </TouchableOpacity></View>
                <View style={styles.box2} width={Dimensions.get('screen').width * 0.89}>
                  <Image style={styles.ingredientsImage}
                    source={photo}
                    resizeMode={"contain"} />
                  <View style={styles.box3}
                    width={Dimensions.get('screen').width * 0.5}>
                    <Text style={styles.food} key={i}>{food.name}</Text>
                    <TouchableHighlight underlayColor='#fff' onPress={showDatepicker}>
                      <View style={styles.showdate} >
                        <Icon name="calendar" size={30} color="#8C9190" />
                        <View style={styles.date1} >
                          {/* <Text style={styles.date2}>{food.date.substring(0,10)}</Text> */}
                          <Text style={styles.date2}>{date.toLocaleDateString('ko-KR')}</Text>
                        </View></View>
                    </TouchableHighlight>
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        minimumDate={new Date(today)}
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="spinner"
                        onChange={onChange}

                      />
                    )}

                    <View style={styles.frozenpick}>
                      <TouchableOpacity delayPressIn={0} style={food.frozen == 0 ? styles.cold2 : styles.cold} onPressIn={() => { frozenpick(fridge, fridgeice) }}  >
                        <Text style={styles.coldd} >냉장</Text>
                      </TouchableOpacity>
                      <TouchableOpacity delayPressIn={0} style={food.frozen == 0 ? styles.ice : styles.ice2} onPressIn={() => { frozenpick2(fridge, fridgeice) }} >
                        <Text style={styles.icee}>냉동</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        }
      </ScrollView>
    </View>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingTop: 50
  },
  text: {
    fontWeight: 'bold',
    fontSize: 28,
    marginTop: 20,
    marginLeft: 20,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: '#F59A23',
    borderWidth: 2,

  },
  boxtop: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#F59A23',
  },
  checkboxtop: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxtop2: {
    fontSize: 17,
    alignItems: 'center',
    fontWeight: '400'
  },
  texttop: {
    marginLeft: 7,
  },
  boxtop2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10
  },
  add: {
    borderRadius: 10,
    borderColor: "#F59A23",
    backgroundColor: '#F59A23',
    borderWidth: 2,
    padding: 10,
  },
  add2: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',

  },
  container2: {
    flex: 1,
    backgroundColor: '#fff'
  },
  box: {
    flexDirection: 'column',
    margin: 15,
    borderRadius: 10,
    borderColor: "#808080",
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10
  },
  box2: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8
  },
  box3: {
    paddingLeft: 20,
  },
  food: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 13,
  },
  date1: {
    marginLeft: 20,
    width: Dimensions.get('screen').width
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
    borderRadius: 20,
    width: Dimensions.get('screen').width * 0.49
  },
  fridge: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10

  },
  date2: {
    fontSize: 20,
    marginRight: 50,

  },
  touch: {
    flexDirection: 'row',
    width: 300,
    borderBottomEndRadius: 20
  },
  txt: {
    fontSize: 20,
    color: '#fff'
  },
  ingredientsImage: {
    width: "35%",
    height: "85%",
    borderRadius: 20,
    borderColor: "#d3d3d3",
    backgroundColor: '#fff',
    borderWidth: 1,
    marginTop: 10
  },

  cold: {
    marginRight: 20,
    width: Dimensions.get('screen').width * 0.2,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cold2: {
    marginRight: 20,
    width: Dimensions.get('screen').width * 0.2,
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
    width: Dimensions.get('screen').width * 0.2,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ice2: {
    marginRight: 20,
    width: Dimensions.get('screen').width * 0.2,
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
    marginBottom: 10,
    marginLeft: 10
  },
});
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight, Dimensions, ScrollView, Alert,Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign';
import { API_URL } from '../config/constants.js';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { ScreenStackHeaderBackButtonImage, ScreenStackHeaderLeftView } from 'react-native-screens';

export default function cameraCart(props) {
const [showDates, setShowDates] = useState({});
  let today = new Date();
  const [date, setDate] = useState([]);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState({});
  const [frozen, setFrozen] = useState(0);
  const [todate, setTodate] = useState('');
  const [fridge, setFridge] = useState(0);
  const [fridgeice, setFridgeice] = useState(0);
  const [ingredients, setIngredients] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(0); //false
  const [insertData, setInsertData] = React.useState([]);
  const [ii, setII] = React.useState([]);
  const [main, setMain] = useState([]);
  const [foodNum, setFoodNum] = useState(0);
  const id = useSelector((state) => state.id);
  let get = [{
    _id: '', ing_name: '', ing_expir: '', ing_frozen: '', ing_img: ''
  }]

  React.useEffect(() => {
    axios.get(`${API_URL}/camera/list`, {params: {user_id: id},get})
      .then((result) => {
        setIngredients(result.data);
        console.log("이것은 카트", result.data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);
  
  React.useEffect(() => {
    let dates={};
    ingredients.map((ing,index) => {
      let tempData = { date: ing.ing_expir, name: ing.ing.ing_name, img: ing.ing.ing_img, frozen: ing.ing_frozen, idd: ing._id, checked: 0,Id:index };
      setInsertData(prev => [...prev, tempData]);
      setDate(prev => [...prev, ing.ing_expir]);
      dates[ing.Id]=false;
      if(index==0){
        dates[ing.Id]=true;
      }
      setShow(dates);
    });
  }, [ingredients]);


  const checkHandle = (index, food) => {//일부 선택
    const newItems = [...insertData];
    newItems[index]['checked'] = food.checked == 1 ? 0 : 1;
    setInsertData(newItems);
    let maindata = { _id:food.idd,user_id: id, ing_expir: date, ing_frozen: food.frozen, ing_name: food.name,ing_img:food.img} //체크 된 배열 
    if (food.checked == 1) { //체크 한 배열
      setMain( [...main,maindata]);
      setII(prev=>[...prev,index]);
       console.log("들어감",main);
    }
    else if (food.checked == 0) {//체크 취소한 배열 빼기     
      main.splice(index, 1);
      ii.splice(index,1);
    }
    console.log("배열",ii);
  }


  const allCheckHandle = (value) => { //전체선택
    const newItems = [...insertData];
    newItems.map((index) => {
      index.checked = value == 1 ? 0 : 1;
      console.log(index);
      let tempData = { _id:index.idd, user_id: id, ing_expir: index.date, ing_frozen: index.frozen, ing_name: index.name, ing_img:index.img };
      setMain(prev => [...prev, tempData]);
      console.log('main', main);
    });
    setInsertData(newItems);
    setSelectAll(value == 1 ? 0 : 1);
    console.log("check", selectAll);
  };

  const deleteHandler = (idd,index) => { //x표 삭제
    axios.delete(`${API_URL}/camera/list`, {data:{ _id: idd }})
      .then((res) => {
        alert("삭제완료");
         const updatedCart = [...insertData];
         updatedCart.splice(index, 1);
         setInsertData(updatedCart);
      }).catch(error => {
        console.log(error);
      })

  }

  const onChange = (event, selectedDate) => {//날짜 바꾸기
    let i = foodNum;
    const currentDate = selectedDate || date[i];
    setShow(Platform.OS === 'ios');
    date.splice(i,1,currentDate);
    console.log(date);
    setFoodNum(0);
  };

  React.useEffect(() => {
    console.log("한 날짜",date);
    setDate(date);
  }, [foodNum]); 

  const showMode = (item,i) => {
    setShow(true);
   // setMode(currentMode);
  };

  const showDatepicker = (item,index) => {
    let dates={};
    insertData.map((data)=>{
      dates[data.Id]=false;
    })
    dates[item.Id]=true;
    setShow(dates);
    // showMode(item,i);
    // setDate(item.date);
    if( dates[item.Id]==false){
      changeit(index);
    }
    console.log("원래날짜",date[index]);

    setFoodNum(index);
    console.log(foodNum);

 };
  

const datechange=(i,food)=>{
  setDate(food.date);
  console.log("뜨고이시니니",i,food);
}
  


  const frozenpick = (i, food) => {
    const newItems = [...insertData];
    newItems[i]['frozen'] = food.frozen == 1 ? 0 : 0;
    setInsertData(newItems);
      console.log(food.frozen);
    setFrozen(0);
  }

  const frozenpick2 = (i, food) => {
    const newItems = [...insertData];
    newItems[i]['frozen'] = food.frozen == 0 ? 1 : 1;
    setInsertData(newItems);
    console.log(food.frozen);
    setFrozen(1);
  }

  const gotoFridge = () => {
    axios.post(`${API_URL}/search/list`,
      main)
      .then((res) => {
        //console.log("보냄", res.config.data);
        console.log("보냄", res);
      }).catch(error => {
        console.log(error);
      })
      props.navigation.replace("MainScreen");
      setMain([]);
  }

  const settingNum = (i) => {
    setFoodNum(i);
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>냉장고에 추가할 재료</Text>
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
              <View style={styles.box} key={i}  >
                <View style={styles.box2} width={Dimensions.get('screen').width * 0.89}>
                <TouchableHighlight onPress={() => checkHandle(i, food)} style={styles.ingredientsImage}>
                    <Image 
                    style={{
                      flex: 1,
                      resizeMode:'contain',
                      backgroundColor: '#ffffff',
                    }}
                    source={photo}/>
                  </TouchableHighlight>
                  
                  <View style={styles.box3}>
                    <View style={styles.boxtop2} width={Dimensions.get('screen').width * 0.48}>
                      <View style={styles.checkNname}>
                        <TouchableOpacity onPress={() => checkHandle(i, food)} >
                          <Ionicons name={food.checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={35} color={food.checked == 1 ? "#F59A23" : "#aaaaaa"} />
                        </TouchableOpacity>
                        <Text style={styles.food} key={i}>{food.name}</Text>
                      </View>

                      <TouchableOpacity onPress={() => deleteHandler(food.idd,i)}>
                        <Icon name="close" size={30} color="#000" />
                      </TouchableOpacity>
                    </View>
                      
                    

                    <TouchableHighlight underlayColor='#fff'
                     onPress={()=>showDatepicker(food,i)}>
                      <View style={styles.showdate} >
                        <Icon name="calendar" size={30} color="#8C9190" />
                        <View style={styles.date1} >
                          <Text style={styles.date2}>{new Date(date[i]).toLocaleDateString()}</Text>
                        </View></View>
                    </TouchableHighlight>
                    {show[food.Id] && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date(date[i])}
                        minimumDate={new Date(today)}                       
                        mode={mode}
                        is24Hour={true}
                        display="spinner"
                        onChange={onChange}
                      />
                    )}

                    <View style={styles.frozenpick}>
                      <TouchableOpacity delayPressIn={0} style={food.frozen == 0 ? styles.cold2 : styles.cold} onPressIn={() => { frozenpick(i,food) }}  >
                        <Text style={food.frozen == 0 ? styles.coldd : styles.coldd2} >냉장</Text>
                      </TouchableOpacity>
                      <TouchableOpacity delayPressIn={0} style={food.frozen == 0 ? styles.ice : styles.ice2} onPressIn={() => { frozenpick2(i,food) }} >
                        <Text style={food.frozen == 0 ? styles.icee : styles.icee2}>냉동</Text>
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
    textAlign: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  checkNname: {
    flexDirection: 'row',
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
    backgroundColor: '#fff',
    padding: 10,
    elevation: 10,
  },
  box2: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8
  },
  box3: {
    paddingLeft: 20,
    alignItems: 'center'
  },
  food: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: 'center'
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 13,
  },
  date1: {
    marginLeft: 20,
    width: Dimensions.get('screen').width
  },
  showdate: {
    flexDirection: 'row',
    backgroundColor: '#DFDFDF',
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
    marginTop: 10,
  },
  cold: {
    marginRight: 10,
    width: Dimensions.get('screen').width*0.23,
    height: Dimensions.get('screen').width*0.15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    backgroundColor: '#ffffff'
  },
  cold2: {
    marginRight: 10,
    width: Dimensions.get('screen').width*0.23,
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
    marginRight: 10,
    width: Dimensions.get('screen').width*0.23,
    height: Dimensions.get('screen').width*0.15,
    elevation: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  ice2: {
    marginRight: 10,
    width: Dimensions.get('screen').width*0.23,
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
    marginBottom: 10,
  },
});
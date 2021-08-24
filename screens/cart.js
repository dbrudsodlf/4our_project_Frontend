import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight, Dimensions, ScrollView, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SegmentedControl from 'rn-segmented-control';
import Icon from 'react-native-vector-icons/AntDesign';
import { API_URL,API_URLL } from '../config/constants.js';

import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { Ionicons} from '@expo/vector-icons';


export default function cart(props) {
  const today = new Date();
  const [date, setDate] = useState(new Date(today));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] =  React.useState(0); //0 냉장 1냉동
  const [ingredients, setIngredients] =  React.useState([]);
  const [selectAll,setSelectAll]= React.useState(0); //false
  const [insertData, setInsertData] =  React.useState([]);
  const [unchecked, setUnchecked] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${API_URLL}/fridgecold`)
      .then((result) => {
        setIngredients(result.data.ingredients);
        console.log("이것은 카트",ingredients);
        for (const value in ingredients) {
          let ingId = ingredients[value].id;
          let ingName = ingredients[value].name;
          let ingFrozen = ingredients[value].frozen;
        //  console.log("이재료 들어감",ingId);
         // console.log("이번호 들어감",ingName);
        // console.log("냉냉",ingFrozen);
          let tempData = {id: ingId, name: ingName, frozen :ingFrozen, checked: 0};
          setInsertData(prev => [...prev, tempData]);
         // console.log("인서트데이터",insertData);
         }
       // console.log("인서트데이터",insertData);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  const checkHandle=(index,value)=>{//일부 선택
    const newItems = [...insertData];  
		newItems[index]['checked'] = value == 1 ? 0 : 1; 
		setInsertData(newItems); 
    console.log(value);
  }

  const allCheckHandle=(value)=>{ //전체선택
		const newItems = [...insertData];
		newItems.map((item, index) => {
			newItems[index]['checked'] = value == 1 ? 0 : 1; 
      console.log(value);
		});
    setInsertData(newItems);
    setSelectAll(value == 1 ? 0 : 1);
    console.log("check",selectAll);
    
};

const deleteHandler = (index) => { //x표 삭제
        const updatedCart = [...insertData]; 
        updatedCart.splice(index, 1);
        setInsertData(updatedCart); 
      
}

  const handleTabsChange = (index,value) => {
    const newItems = [...insertData];  
    setTabIndex(index);
    console.log("냉장동", tabIndex);
		newItems[index]['frozen'] =value == tabIndex ? tabIndex : !tabIndex; 
    setInsertData(newItems); 
    console.log("값", value);
   // console.log("결과", insertData);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };




 

    return (
      <View style={styles.container}>
        <Text style={styles.text}>담은 재료</Text>
      <View style={styles.boxtop}>
       <View style={styles.checkboxtop}>
        <TouchableOpacity
          onPress={() => allCheckHandle(selectAll)}>
         <Ionicons name={selectAll == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={35} color={selectAll == 1 ? "#F59A23" : "#aaaaaa"} />
          </TouchableOpacity >
          <View style={styles.texttop}>
        <Text style={styles.checkboxtop2}>전체 선택</Text></View>
        </View> 


      <TouchableHighlight underlayColor='#fff' style={styles.add}
        onPress={() => { props.navigation.navigate("MainScreen") }}>
        <Text style={styles.add2}>선택 추가하기</Text>
      </TouchableHighlight>
    </View>

     <ScrollView>
       {
         insertData && insertData.map((food,i)=>{
           return(
            <View style={styles.box}  key={i}> 
            <View style={styles.boxtop2}>          
          <TouchableOpacity onPress={() => checkHandle(i,food.checked)}>
          <Ionicons name={food.checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={35} color={food.checked == 1 ? "#F59A23" : "#aaaaaa"} />
          </TouchableOpacity>
         <TouchableOpacity onPress={() => deleteHandler(i)}>
         <Icon name="close" size={30} color="#000" />
         </TouchableOpacity></View>
          <View style={styles.box2} width={Dimensions.get('screen').width * 0.89}>
            <Image style={styles.ingredientsImage} 
           // source={{uri:item.imgUrl}}
             resizeMode={"contain"} />
            <View style={styles.box3}
              width={Dimensions.get('screen').width * 0.5}>
              <Text style={styles.food} key={i}>{food.name}</Text>
              <TouchableHighlight underlayColor='#fff' onPress={showDatepicker}>
                <View style={styles.showdate} >
                  <Icon name="calendar" size={30} color="#8C9190" />
                  <View style={styles.date1} >
                    <Text style={styles.date2}>{date.toLocaleDateString('ko-KR')}
                    </Text></View></View>
              </TouchableHighlight>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="spinner"
                  onChange={onChange}
  
                />
              )}
  
              <SegmentedControl
                tabs={['냉장', '냉동']}
                currentIndex={tabIndex}
                onChange={()=>{handleTabsChange(i,food.frozen)}}
                segmentedControlBackgroundColor='#fff'
                activeSegmentBackgroundColor='#ffe0ad'
                paddingVertical={14}
                width={Dimensions.get('screen').width / 2}
                textStyle={{
                  fontWeight: '300',
                }}
              />
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
    paddingTop:50
  },
  text:{
    fontWeight:'bold',
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
    alignItems:'center',
  },
  checkboxtop2: {
    fontSize: 17,
    alignItems:'center',
    fontWeight:'400'
  },
  texttop:{
      marginLeft:7,
  },
  boxtop2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight:10
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
    marginTop:8,
    marginBottom:8
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
    width:Dimensions.get('screen').width
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
    borderRadius:20,
    width:Dimensions.get('screen').width *0.49
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
  }
});
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableHighlight, Dimensions, ScrollView, FlatList} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SegmentedControl from 'rn-segmented-control';
import Icon from 'react-native-vector-icons/AntDesign';
import { API_URL } from '../config/constants.js';
import axios from 'axios';
import { TouchableOpacity } from 'react-native';
import { Ionicons} from '@expo/vector-icons';


export default function cart(props) {
  const Food =props.route.params;
  const today = new Date();
  const [date, setDate] = useState(new Date(today));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [ingredients, setIngredients] = React.useState([]);
  const [allchecked,setAllChecked]= useState(false);
  const [checked,setChecked]= useState(0);
  const [gomain,setGomain]=useState([]);
  const [insertData, setInsertData] = React.useState([]);

  useEffect(()=>{
    for (const value in Food){
      let ingName = Food[value];
      let check=checked;
      let tempData = { name: ingName, select:check};
      setInsertData(prev => [...prev, tempData]);
      //console.log("이거시다",Food[value]);
      console.log("요것이다",insertData);
    }
  },[])
  
  const checkHandle=(index,value)=>{
    const newItems = [...insertData]; // clone the array 
		newItems[index]['select'] === 1 ? 
    newItems[index]['select']=0 : newItems[index]['select']=1; // set the new value 
		setInsertData(newItems); // set new state
      console.log(index);
      console.log("인서트데이터",newItems[index]['checked'])
      console.log(newItems);
  }
  const allCheckHandle=()=>{
    setAllChecked(!allchecked);
    setChecked(!checked);
};

  const handleTabsChange = index => {
    setTabIndex(index);
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


  React.useEffect(() => {
    axios.get(`${API_URL}/search/list`)
      .then((result) => {
        setIngredients(result.data);
        console.log("이것은 카트",ingredients);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

 

    return (
      <View style={styles.container}>
        <Text style={styles.text}>담은 재료</Text>
      <View style={styles.boxtop}>
       <View style={styles.checkboxtop}>
        <TouchableOpacity
          onPress={() => allCheckHandle()}>
         <Ionicons name={allchecked == true ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={35} color={allchecked == true ? "#F59A23" : "#aaaaaa"} />
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
         Food.map((food,i)=>{
           return(
            <View style={styles.box}  key={i}> 
            <View style={styles.boxtop2}>          
          <TouchableOpacity onPress={() => checkHandle(i)}>
          <Ionicons name={checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={35} color={checked == 1 ? "#F59A23" : "#aaaaaa"} />
          </TouchableOpacity>
         <TouchableOpacity>
         <Icon name="close" size={30} color="#000" />
         </TouchableOpacity></View>
          <View style={styles.box2} width={Dimensions.get('screen').width * 0.89}>
            <Image style={styles.ingredientsImage} 
           // source={{uri:item.imgUrl}}
             resizeMode={"contain"} />
            <View style={styles.box3}
              width={Dimensions.get('screen').width * 0.5}>
              <Text style={styles.food} key={i}>{food}</Text>
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
                onChange={handleTabsChange}
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
import React, {useState} from 'react';
import { 
  StyleSheet, 
  Button, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  TouchableHighlight,
  Image, 
  ActivityIndicator, 
  Alert,
  Dimensions
 } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CheckboxList from 'rn-checkbox-list';
import { Checkbox } from 'react-native-paper';
import {API_URL} from "../config/constants";
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import SegmentedControl from 'rn-segmented-control';
import { useSelector } from 'react-redux';

export default function manageFridge () {
  const [ingredients, setIngredients] = React.useState([]);
  const [insertData, setInsertData] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [cartItemIsLoading, setCartItemIsLoading] = React.useState(false);
  const [unchecked, setUnchecked] = React.useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const today = new Date();
  const [date, setDate] = useState(new Date(today));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [modalName, setModalName] = useState('');
  const [modalDate, setModalDate] = useState([]);
  const [modalFrozen, setModalFrozen] = useState(1);
  const id = useSelector((state) => state.id);

  React.useEffect(()=>{
    axios.get(`${API_URL}/manage?user_id=${id}`).then((result)=>{
      setIngredients(result.data);
      console.log(ingredients);
      // for (const value in ingredients) {
      //   console.log(ingredients[value].ing_name);
      //   let ingId = ingredients[value]._id;
      //   let ingName = ingredients[value].ing_name;
      //   let tempData = {id: ingId, name: ingName, checked: 0};
      //   setInsertData(prev => [...prev, tempData]);
      // }
      // console.log(insertData);
    }).catch((error)=>{
      console.error(error);
    })
  }, []);

  React.useEffect(() => {
    ingredients.map((ing)=> {
      if(ing.ing.ing_name === null) {
        ing.ing.ing_name = '';
      }
        let tempData = {id: ing._id, name: ing.ing.ing_name, checked: 0};
        setInsertData(prev => [...prev, tempData]);
    });
}, [ingredients]);

  // const copyArray = ((fa) => {
  //   setInsertData(prev => [...prev, fa])
  // })

	const selectHandler = (index, value) => {
		const newItems = [...insertData]; // clone the array 
		newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 
		setInsertData(newItems); // set new state
	}
	
	const selectHandlerAll = (value) => {
		const newItems = [...insertData]; // clone the array 
		newItems.map((item, index) => {
			newItems[index]['checked'] = value == true ? 0 : 1; // set the new value 
		});
    //this.setState({ cartItems: newItems, selectAll: (value == true ? false : true) }); // set new state
    setInsertData(newItems);
    setSelectAll(value == true ? false : true);
	}
	
	const deleteHandler = (idd,index) => {
		Alert.alert(
			'관리 페이지에서 정말 삭제하시겠습니까?',
			'',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Delete', onPress: () => {
          // const updatedCart = [...insertData]; /* Clone it first */
          // // console.log('delete'+updatedCart);
					// updatedCart.splice(index, 1); /* Remove item from the cloned cart state */
          // setInsertData(updatedCart); /* Update the state */
          axios.delete(`${API_URL}/manage`, {data:{ _id: idd }})
          .then((res) => {
            alert("삭제완료");
            const updatedCart = [...insertData];
            updatedCart.splice(index, 1);
            setInsertData(updatedCart);
          }).catch(error => {
            console.log(error);
          })
				}},
			],
			{ cancelable: false }
		);
  }
  
  const deleteSelectedHandler = () => {
    const deleteSelected = [...insertData];
		Alert.alert(
			'선택 항목을 관리 페이지에서 정말 삭제하시겠습니까?',
			'',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Delete', onPress: () => {
          deleteSelected.map((item, index) => {
            if(item['checked'] === false)
              deleteHandler(item.id, index);
          });
				}},
      ],
			{ cancelable: false }
		);
  }
  

  const handleTabsChange = index => {
    setTabIndex(index);
    console.log(index);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(date);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


  const toggleModal = (item) => {//모달띄우기
    setModalVisible(!isModalVisible);
    setModalName(item.name);
    setModalFrozen(item.frozen);
    //setModalDate(item.date);
  };



  return (
    <View style={styles.container}>
      {/* <SafeAreaView  style={{flex: 1, backgroundColor: '#fff', fontSize:20 }}>
        <CheckboxList
          headerName="전체선택"
          headerStyle={{ 
            backgroundColor: '#fff',
            fontSize: 14,
            fontWeight: 500,
          }}
          theme="orange"
          listItems={insertData}
          onChange={({ ids, items }) => console.log('My updated list :: ', ids)}
          listItemStyle={{ 
            borderBottomColor: 'black', 
            borderWidth: 1, 
            borderRadius: 20, 
            marginHorizontal: 14,
            marginVertical: 10
          }}
          checkboxProp={{ boxType: 'square' }} // iOS (supported from v0.3.0)
        />
      </SafeAreaView> */}
      <View style={{paddingHorizontal: 20, paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={[styles.centerElement, {width: 60}]}>
          <TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => selectHandlerAll(selectAll)}>
            <Ionicons name={selectAll == true ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={selectAll == true ? "black" : "#aaaaaa"} />
          </TouchableOpacity>
          <View style={{ justifyContent: 'space-between', alignItems: 'center'}}>
            <Text>전체 선택</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.centerElement} onPress={() => deleteSelectedHandler()}>
          {/* <Ionicons name="md-trash" size={25} color="#ee4d2d" /> */}
          <Text style={styles.textBox}>선택 삭제</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>	
        {insertData && insertData.map((item, i) => (
          <TouchableOpacity key={i} onPress={()=>toggleModal(item)}>
            <View key={i} style={[styles.itemList, {flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 60}]}>
              <View style={[styles.centerElement, {width: 60}]}>
              <TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => selectHandler(i, item.checked)}>
                  <Ionicons name={item.checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={item.checked == 1 ? "black" : "#aaaaaa"} />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                <View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                  <Text numberOfLines={1} style={{fontSize: 15}}>{item.name}</Text>
                </View>
              </View>
              <View style={[styles.centerElement, {width: 60}]}>
                <TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => deleteHandler(item.id, i)}>
                  <Ionicons name="md-trash" size={25} color="#ee4d2d" />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        transparent={true}
        closeOnTouchOutside={true}
        isVisible={isModalVisible}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.modal}>
          <View style={styles.modal2}>
            <Text style={styles.food} key={ingredients._id}>{modalName}</Text>
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
                is24Hour={true}
                display="spinner"
                onChange={onChange}
                format="YYYY-MM-DD"
              />
            )}

            <Text style={styles.fridge}>보관 방법</Text>

            <SegmentedControl
              tabs={['냉장', '냉동']}//냉장:0 , 냉동:1
              currentIndex={tabIndex}
              onChange={handleTabsChange}
              segmentedControlBackgroundColor='#fff'
              activeSegmentBackgroundColor='#ffe0ad'
              paddingVertical={15}
              width={Dimensions.get('screen').width / 2}
              textStyle={{
                fontWeight: '300',
              }}
            />
          </View>

          <View style={styles.touch} >
            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                setModalVisible(!isModalVisible);
              }}>
              <Text style={styles.txt}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                pickfood(modalName)
                setModalVisible(!isModalVisible);
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
  },
  centerElement:{
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemList: {
    borderWidth: 1,
    borderRadius: 10,
    margin: Dimensions.get('screen').width*0.05,
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  modal: {
    margin: 0,
    width: 300,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 20
  },
  modal2: {
    padding: 30,
  },
  food: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  },
  date: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,

  },
  showdate: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#8C9190',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 30
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

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

export default function manageFridge ({ navigation }) {
  const [ingredients, setIngredients] = React.useState([]);
  const [insertData, setInsertData] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [cartItemIsLoading, setCartItemIsLoading] = React.useState(false);
  const [unchecked, setUnchecked] = React.useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  let today = new Date();
  const [date, setDate] = useState(new Date(today));
  const [modalDate, setModalDate] = useState('');
  const [todate, setTodate] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState('');
  const [fridge, setFridge] = useState(1);//디폴트 냉장선택
  const [fridgeice, setFridgeice] = useState(0);
  const [frozen, setFrozen] = useState(0);
  const [ingId, setIngId] = useState('');
  const [ingExpir, setIngExpir] = useState(new Date(today));
  
  const [tabIndex, setTabIndex] = React.useState(0);
  
  const id = useSelector((state) => state.id);
  const[ cart, setCart]=useState([]);

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
      ingredients.map((ing) => {
        // ing.ing_expir = changeDateFormat(ing.ing_expir);
        ing.ing_expir = changeDateFormat(ing.ing_expir);
        let tempData = {id: ing._id, expir: ing.ing_expir, name: ing.ing.ing_name, checked: 0};
        setInsertData(prev => [...prev, tempData]);
      });
  }, [ingredients]);

  const changeDateFormat = (oldDate) => {
    if(oldDate === null) {
      return '2021-01-01'
    }
    let newDate = oldDate.substr(0, 10);
    return newDate
  }

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
    console.log(deleteSelected);
		Alert.alert(
			'선택 항목을 관리 페이지에서 정말 삭제하시겠습니까?',
			'',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Delete', onPress: () => {
          deleteSelected.map((item, index) => {
            if(item['checked'] === 1){
              console.log(item.id);
              axios.delete(`${API_URL}/manage`, {data:{ _id: item.id }})
              .then((res) => {
                alert("삭제완료");
                const updatedCart = [...insertData];
                updatedCart.splice(index, 1);
                setInsertData(updatedCart);
              }).catch(error => {
                console.log(error);
              })
            }
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
    console.log("고른날짜",currentDate)
    shortdate(currentDate);
  };

  // React.useEffect(() => {
  //   console.log('useEffect Date: ', date);
  // }, [date]);

  React.useEffect(() => {
    console.log('useEffect ToDate: ', todate);
    setDate(todate);
    console.log('useEffect Date: ', date);
  }, [todate]);

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

    console.log("sort-date:",todate);
    setDate(todate);
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
    console.log(item);
    setModalName(item.name);
    setIngId(item.id);
    setDate(item.expir);
  };

  React.useEffect(()=>{
    console.log(date);
  },[date]);

  const gotocart = () => {
    let cartdata={user_id: id,ing_expir: todate, ing_frozen: frozen, ing_name: modalName }
    setCart([...cart,cartdata]);
  }

  const reloadPage = async () => {
    axios.get(`${API_URL}/manage?user_id=${id}`).then((result)=>{
      setIngredients(result.data);
      console.log(ingredients);
    }).catch((error)=>{
      console.error(error);
    })
  }

  const editDate=()=>{
    axios.post(`${API_URL}/manage`,{ 
      user_id: id,
      _id: ingId, 
      ing_expir: todate,
      ing_frozen: frozen }
      )
      .then((res) => {
        console.log("고른거 보내기", res);
      }).catch(error => {
        console.log(error);
      });

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

            <TouchableHighlight underlayColor='#fff' onPressIn={showDatepicker}>
              <View style={styles.showdate} >
                <Icon name="calendar" size={30} color="#8C9190" />
                <Text style={styles.date2}>{new Date(date).toLocaleDateString()}</Text>
              </View>
            </TouchableHighlight>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(date)}
                mode={'date'}
                onChange={onChange}
                display="spinner"
                format="YYYY-MM-DD"
              />
            )}
            <Text style={styles.fridge}>보관 방법</Text>
            <View style={styles.frozenpick}>
              <TouchableOpacity delayPressIn={0} style={fridge == 0 ? styles.cold : styles.cold2} onPressIn={() => { frozenpick(fridge, fridgeice) }}  >
                <Text style={styles.coldd} >냉장</Text>
              </TouchableOpacity>
              <TouchableOpacity delayPressIn={0} style={fridgeice == 0 ? styles.ice : styles.ice2} onPressIn={() => { frozenpick2(fridge, fridgeice) }} >
                <Text style={styles.icee}>냉동</Text>
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
                setIngId();
              }}>
              <Text style={styles.txt}>취소</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              activeOpacity={1}
              onPress={() => {
                editDate();
                setModalVisible(!isModalVisible);
                setDate(today);
                setFridge(1);
                setFridgeice(0);
                setIngId();
                reloadPage();
              }}>
              <Text style={styles.txt}>변경</Text>
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
});

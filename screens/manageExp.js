import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert
} from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CheckboxList from 'rn-checkbox-list';
import { Checkbox } from 'react-native-paper';
import { API_URL } from "../config/constants";
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function manageExp () {
  const [ingredients, setIngredients] = React.useState([]);
  const [insertData, setInsertData] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [cartItemIsLoading, setCartItemIsLoading] = React.useState(false);
  const [unchecked, setUnchecked] = React.useState([]);
  const [counting, setCounting] = React.useState(0);

  const id = useSelector((state) => state.id);
  React.useEffect(()=>{
    axios.get(`${API_URL}/manage/manageover?user_id=${id}`).then((result)=>{
      setIngredients(result.data);
      console.log('기한초과페이지', result.data);
    }).catch((error)=>{
      console.error(error);
    })
  }, []);

  // React.useEffect(()=>{
  //   for (const value in ingredients) {
  //     console.log(ingredients[value].name);
  //     let ingId = ingredients[value].id;
  //     let ingName = ingredients[value].name;
  //     let tempData = {id: ingId, name: ingName, checked: 0};
  //     setInsertData(prev => [...prev, tempData]);
  //   }
  //   console.log('ins', insertData);
  // }, [ingredients]);

  // React.useEffect(() => {
  //   ingredients.map((ing) => {
  //     // ing.ing_expir = changeDateFormat(ing.ing_expir);
  //     console.log('날짜', ing.ing_expir);
  //     console.log('오늘 날짜', date);
  //     if( ing.ing_expir < date ) {
  //       console.log('재료 변환', ing.ing.ing_name);
  //       ing.ing_expir = changeDateFormat(ing.ing_expir);
  //       let tempData = {id: ing._id, expir: ing.ing_expir, name: ing.ing.ing_name, checked: 0};
  //       setInsertData(prev => [...prev, tempData]);
  //     }
  //   });
  // }, [ingredients]);

  React.useEffect(() => {
    ingredients.map((ing) => {
      // ing.ing_expir = changeDateFormat(ing.ing_expir);
      //ing.ing_expir = changeDateFormat(ing.ing_expir);
      let tempData = {name: ing.ing_name, checked: 0};
      setInsertData(prev => [...prev, tempData]);
    });
  }, [ingredients]);


  //const data = [{id: 1, name: '계란'}, {id: 2, name: '토마토'}, {id: 3, name: '오이'}];
	const selectHandler = (index, value) => {
		const newItems = [...insertData]; // clone the array 
		newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 
    setInsertData(newItems); // set new state

    if(newItems[index].checked == 1){
        setCounting(counting + 1);
        console.log(counting);
      } else if(newItems[index].checked == 0){
        setCounting(counting - 1);
      }
    }
	
	const selectHandlerAll = (value) => {
		const newItems = [...insertData]; // clone the array 
		newItems.map((item) => {
      item['checked'] = (value == true ? 0 : 1); // set the new value 
      if(item.checked == 1){
        setCounting(counting + 1);
      } else if(item.checked == 0){
        setCounting(counting - 1);
      }
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
			'선택 항목을 냉장고에서 정말 삭제하시겠습니까?',
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
  
  const addBasketHandler = () => {
    const addBasketSelected = [...insertData];
    console.log(addBasketSelected);
		Alert.alert(
			'선택 항목을 장바구니에 넣으시겠습니까?',
			'',
			[
				{text: '취소', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: '장바구니 담기', onPress: () => {
          addBasketSelected.map((item, index) => {
            if(item['checked'] === 1){
              console.log(item.id);
              axios.post(`${API_URL}/manage/managebasket`,{ 
                user_id: id,
                ing_name: item.name }
                )
                .then((res) => {
                  console.log("장바구니보내기", res);
                }).catch(error => {
                  console.log(error);
                });

              axios.delete(`${API_URL}/manage`, {data:{ _id: item.id }})
              .then((res) => {
                alert("나의 냉장고에서 삭제");
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
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>전체 선택</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.centerElement} onPress={() => deleteSelectedHandler()}>
          <Text style={styles.textBox}>선택 삭제</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>	
        {insertData && insertData.map((item, i) => (
          <View key={i} style={[styles.itemList, {flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 60}]}>
            <View style={[styles.centerElement, {width: 60}]}>
            <TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => selectHandler(i, item.checked)}>
                <Ionicons name={item.checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={item.checked == 1 ? "black" : "#aaaaaa"} />
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
              <View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
                <Text numberOfLines={1} style={{fontSize: 16, fontWeight: 'bold'}}>{item.name}</Text>
              </View>
            </View>
            <View style={[styles.centerElement, {width: 60}]}>
              <TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => deleteHandler(item.id, i)}>
                <Ionicons name="md-trash" size={25} color="#ee4d2d" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={[styles.cartBtn , {backgroundColor : counting > 0 ? '#f59b23' : '#fcd9ae'}]} onPress={() => addBasketHandler()}>
          <Ionicons name="basket-outline" size={30} color='white' />
          <Text style={{ color: 'white', fontSize: 18 }}> 장바구니에 담기</Text>
        </TouchableOpacity>
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
    flexDirection: 'row'
  },
  itemList: {
    borderWidth: 1,
    borderRadius: 10,
    margin: Dimensions.get('screen').width*0.05,
  },
  textBox: {
    padding: 5,
    fontWeight: 'bold',
    fontSize: 14
  },
  cartBtn: {
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width*0.12,
  }
});
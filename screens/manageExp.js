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

export default function manageExp () {
  const [ingredients, setIngredients] = React.useState([]);
  const [insertData, setInsertData] = React.useState([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [cartItemIsLoading, setCartItemIsLoading] = React.useState(false);
  const [unchecked, setUnchecked] = React.useState([]);

  React.useEffect(()=>{
    axios.get(`${API_URL}/manage?user_id=103783810692615626282`).then((result)=>{
      setIngredients(result.data);
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

  React.useEffect(() => {
    ingredients.map((ing)=> {
      let tempData = {id: 1, name: ing.ing.ing_name, checked: 0};
      setInsertData(prev => [...prev, tempData]);
      console.log("tempData",tempData);
      console.log('insssss', insertData);
    });
}, [ingredients]);

  //const data = [{id: 1, name: '계란'}, {id: 2, name: '토마토'}, {id: 3, name: '오이'}];
	const selectHandler = (index, value) => {
		const newItems = [...insertData]; // clone the array 
		newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 
		setInsertData(newItems); // set new state
	}
	
	const selectHandlerAll = (value) => {
		const newItems = [...insertData]; // clone the array 
		newItems.map((item) => {
			item['checked'] = value == true ? 0 : 1; // set the new value 
		});
    //this.setState({ cartItems: newItems, selectAll: (value == true ? false : true) }); // set new state
    setInsertData(newItems);
    setSelectAll(value == true ? false : true);
	}
	
	const deleteHandler = (index) => {
		Alert.alert(
			'관리 페이지에서 정말 삭제하시겠습니까?',
			'',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Delete', onPress: () => {
          const updatedCart = [...insertData]; /* Clone it first */
          // console.log('delete'+updatedCart);
					updatedCart.splice(index, 1); /* Remove item from the cloned cart state */
					setInsertData(updatedCart); /* Update the state */
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
            if(deleteSelected[index]['checked'] === false)
              unchecked = [...deleteSelected[index]]
          });
          setInsertData(unchecked); /* Update the state */
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
              <TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => deleteHandler(i)}>
                <Ionicons name="md-trash" size={25} color="#ee4d2d" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.cartBtn} onPress={() => deleteSelectedHandler()}>
          <Ionicons name="basket-outline" size={30} color="white" />
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
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  cartBtn: {
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width*0.12,
    backgroundColor: '#fcd9ae',
  }
});
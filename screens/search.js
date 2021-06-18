import { SearchBar } from 'react-native-elements';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, View, FlatList, ScrollView, Text, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import SegmentedControl from 'rn-segmented-control';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import { API_URL } from '../config/constants.js';
import axios from 'axios';

export default function search(props) {
  const [ingredients, setIngredients] = React.useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const today = new Date();
  const [date, setDate] = useState(new Date(today));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [modalData, setModalData] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

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


  const toggleModal = (ingredients) => {//모달띄우기
    setModalVisible(!isModalVisible);
    setModalData(ingredients.name);
  };

  React.useEffect(() => {//데이터 받아오기
    axios.get(`${API_URL}/fridgecold`)
      .then((result) => {
        setIngredients(result.data.ingredients);
        console.log(ingredients);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

   const searchFilterFunction = (text) => {//검색필터
      if (text) { //빈칸이 아니면
        const newData = masterDataSource.filter(
          function (ingredients) {
            const itemData = ingredients
              ? ingredients.name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setFilteredDataSource(newData);
        setSearch(text);
      } else {
        // Inserted text is blank
        // Update FilteredDataSource with masterDataSource
        setFilteredDataSource(masterDataSource);
        setSearch(text);
      }
    };

  return (

    <View style={styles.container}>
      <View>
        <View style={styles.titleArea}>
          <Text style={styles.text}>재료 검색</Text>
          <TouchableOpacity onPress={() => {//장바구니로 이동
            props.navigation.navigate("cart")
          }}>
            <Icon2 name="shopping-cart" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <SearchBar platform='ios' cancelButtonTitle='취소'
        onChangeText={(text) => searchFilterFunction(text)}
         value={search}
        underlineColorAndroid='transparent'
        placeholder="원하는 재료를 검색해보세요" />


      <FlatList
        data={ingredients} 
        keyExtractor={(id, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => {
          return (
            <TouchableHighlight underlayColor='#F59A23'  onPress={() => toggleModal(item)}>
              <Text style={styles.flatList}>{item.name}</Text>
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
            <Text style={styles.food} key={ingredients.id}>{modalData}</Text>
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
              />
            )}

            <Text style={styles.fridge}>보관 방법</Text>

            <SegmentedControl
              tabs={['냉장', '냉동']}
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
            // onPress={onPress}
            >
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
  text: {
    fontSize: 32,
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
  foodList: {

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
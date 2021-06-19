import React, { useState } from 'react';
ScrollView
import { StyleSheet, View, Image, Text, TouchableHighlight, Dimensions, ScrollView, FlatList} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SegmentedControl from 'rn-segmented-control';
import Icon from 'react-native-vector-icons/AntDesign';
import EggImage from '../assets/egg.jpeg';
import { API_URL } from '../config/constants.js';
import axios from 'axios';
import SelectMultiple from 'react-native-select-multiple'
import { Checkbox } from 'react-native-paper';

export default function cart(props) {
  const today = new Date();
  const [date, setDate] = useState(new Date(today));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [ingredients, setIngredients] = React.useState([]);
  const [checked, setChecked] = React.useState(false);

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
    axios.get(`${API_URL}/fridgecold`)
      .then((result) => {
        console.log("result : ", result.data);
        setIngredients(result.data.ingredients);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

const state = { selectedFruits: [] }

  const onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
   setState({ selectedFruits })
  }

  
  const render = ({ item, index }) => {

    return (
      <View style={styles.box}>
          <Checkbox
            color="#F59A23"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}

          ></Checkbox>
        <View style={styles.box2} width={Dimensions.get('screen').width * 0.89}>
          <Image style={styles.ingredientsImage} source={{ 
         uri:item.imgUrl
           }} resizeMode={"contain"} />
          <View style={styles.box3}
            width={Dimensions.get('screen').width * 0.5}>
            <Text style={styles.food} key={item.id}>{item.name}</Text>
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
  };

  return (
    <View style={styles.container}>

      <View style={styles.boxtop}>
        {/* <View style={styles.checkboxtop}>
          <Checkbox
            color="#F59A23"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}

          ></Checkbox>
          <Text style={styles.checkboxtop2}>전체 선택</Text></View> */}


        <TouchableHighlight underlayColor='#fff' style={styles.add}
          onPress={() => { props.navigation.navigate("cart") }}>
          <Text style={styles.add2}>선택 추가하기</Text>
        </TouchableHighlight>
      </View>


      <View style={styles.container2}     >
          <View >
            <FlatList
              data={ingredients}
              renderItem={render}
              numColumns={1}
              scrollEnabled={true}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  boxtop: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    justifyContent:'flex-end',
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#F59A23',
  },
  checkboxtop: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  checkboxtop2: {
    fontSize: 15,
    marginTop: 7
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
    borderColor: "#000",
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10
  },
  box2: {
    flexDirection: 'row',
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
    marginBottom: 10,
  },
  date1: {
    marginLeft: 15
  },
  showdate: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#8C9190',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 15
  },
  fridge: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10

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
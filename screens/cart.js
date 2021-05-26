import React, { useState } from 'react';
ScrollView
import { StyleSheet, View, Image, Text, TouchableHighlight, Dimensions, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SegmentedControl from 'rn-segmented-control';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import EggImage from '../assets/egg.jpeg';

export default function cart() {
  const today = new Date();
  const [date, setDate] = useState(new Date(today));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
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

  return (
    <View style={styles.container}>

         <View style={styles.boxtop}>
      <Checkbox
        color="#7DDED2"
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }}
        
      >전체선택</Checkbox>
      <TouchableHighlight underlayColor='#fff'style={styles.add} >
        <Text>선택 추가하기</Text>
      </TouchableHighlight>
      </View>


      <View style={styles.container2}>
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden' }}>
          <View style={styles.box}>
            <Checkbox
              color="#7DDED2"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />


            <View style={styles.box2}>
              <Image style={styles.ingredientsImage} source={EggImage} resizeMode={"contain"} />
              <View style={styles.box3}>

                <Text style={styles.food}>재료이름</Text>
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

                <SegmentedControl
                  tabs={['냉장', '냉동']}
                  currentIndex={tabIndex}
                  onChange={handleTabsChange}
                  segmentedControlBackgroundColor='#fff'
                  activeSegmentBackgroundColor='#7DDED2'
                  paddingVertical={15}
                  width={Dimensions.get('screen').width - 180}

                  textStyle={{
                    fontWeight: '300',
                  }}
                />
              </View>
            </View>


          </View>


          <View style={styles.box}>
            <Checkbox
              color="#7DDED2"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />


            <View style={styles.box2}>
              <Image style={styles.ingredientsImage} source={EggImage} resizeMode={"contain"} />
              <View style={styles.box3}>

                <Text style={styles.food}>재료이름</Text>
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

                <SegmentedControl
                  tabs={['냉장', '냉동']}
                  currentIndex={tabIndex}
                  onChange={handleTabsChange}
                  segmentedControlBackgroundColor='#fff'
                  activeSegmentBackgroundColor='#7DDED2'
                  paddingVertical={15}
                  width={Dimensions.get('screen').width - 180}

                  textStyle={{
                    fontWeight: '300',
                  }}
                />
              </View>
            </View>


          </View>

          <View style={styles.box}>
            <Checkbox
              color="#7DDED2"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />


            <View style={styles.box2}>
              <Image style={styles.ingredientsImage} source={EggImage} resizeMode={"contain"} />
              <View style={styles.box3}>

                <Text style={styles.food}>재료이름</Text>
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

                <SegmentedControl
                  tabs={['냉장', '냉동']}
                  currentIndex={tabIndex}
                  onChange={handleTabsChange}
                  segmentedControlBackgroundColor='#fff'
                  activeSegmentBackgroundColor='#7DDED2'
                  paddingVertical={15}
                  width={Dimensions.get('screen').width - 180}

                  textStyle={{
                    fontWeight: '300',
                  }}
                />
              </View>
            </View>


          </View>
        </ScrollView>
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
  boxtop:{
    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor: '#fff',
paddingLeft:20,
paddingRight:20,
paddingTop:10,
paddingBottom:10

  },
  add:{
    borderRadius: 10,
    borderColor: "#000",
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff'
  },
  box: {
    flexDirection: 'column',
    margin: 10,
    borderRadius: 10,
    borderColor: "#000",
    backgroundColor: '#fff',
    borderWidth: 1,
    padding: 10
  },
  box2: {
    flexDirection: 'row'
  },
  box3: {
    paddingLeft: 10
  },
  food: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10

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
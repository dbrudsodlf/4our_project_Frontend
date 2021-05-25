import { SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableHighlight, TouchableOpacity,Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import SegmentedControl from 'rn-segmented-control';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';


export default function search(props) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [heroes, setHeroes] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const today = new Date();
  const [date, setDate] = useState(new Date(today));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);


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


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };



  const fetchData = async () => {
    const res = await fetch('https://api.opendota.com/api/heroes');
    const json = await res.json();
    setData(json);
    setHeroes(json.slice());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatNames = (hero) => {
    let heroName = hero.name.charAt(14).toUpperCase() + hero.name.slice(15);
    heroName = heroName.replace(/_/g, " ");
    return heroName;
  }

  const updateQuery = (input) => {
    setQuery(input);
    setHeroes(data.slice());
  }

  const filterNames = (hero) => {
    let search = query.toLowerCase().replace(/ /g, "_");
    if (hero.name.startsWith(search, 14)) {
      return formatNames(hero);
    } else {
      heroes.splice(heroes.indexOf(hero), 1);
      return null;
    }
  }


  return (

    <View style={styles.container}>
        <View>
        <View style={styles.titleArea}>
            <Text style={styles.text}>재료 검색</Text>  
          <TouchableOpacity onPress={()=>{
            props.navigation.navigate("cart")
          }}>
            <Icon2 name="shopping-cart" size={30}  color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <SearchBar platform='ios' cancelButtonTitle='취소'
        onChangeText={updateQuery}
        value={query}
        underlineColorAndroid='transparent'
        placeholder="원하는 재료를 검색해보세요" />

      <FlatList
        data={heroes} keyExtractor={(i) => i.id.toString()}
        extraData={query}
        renderItem={({ item }) => {
          return (
            <TouchableHighlight underlayColor='#F59A23' onPress={toggleModal}>
              <Text style={styles.flatList}>{filterNames(item)}
              </Text>
            </TouchableHighlight>
          );
        }
        }
      />
      <Modal  closeOnTouchOutside={true} isVisible={isModalVisible} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.modal}>
        <View style={styles.modal2}>
          <Text style={styles.food}>재료이름</Text>
          <Text style={styles.date}>유통 기한</Text>
      <TouchableHighlight underlayColor='#fff' onPress={showDatepicker}>
        <View style={styles.showdate} >
        <Icon name="calendar" size={30}  color="#8C9190" />
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
        activeSegmentBackgroundColor='#7DDED2'  
        paddingVertical={15}
        width={Dimensions.get('screen').width - 180}
  
        textStyle={{
          fontWeight: '300',
        }}
      />
 </View>
 <View  style={styles.touch} >
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
  titleArea:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    paddingLeft:10,
    paddingRight:30,
    paddingTop:20,
    backgroundColor:'#fff'
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
  modal2:{
    padding: 30,
  },
  food: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  },
  date:{
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
    
  },
  showdate:{
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#8C9190',
    height:50,
    alignItems:'center',
    justifyContent:'space-between',
    padding:15,
    marginBottom:30
  },
  fridge:{
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
    
  },
  date2:{
    fontSize: 20,
    marginRight:50
  },
  touch:{
    flexDirection: 'row',
    width:300,
    borderBottomEndRadius:20
  },
  button1:{
    width:150,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#F59A23',
    height:60,
    borderColor:'#fff',
    borderBottomLeftRadius:20
  },
  button2:{
    width:150,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#F59A23',
    height:60,
    borderColor:'#fff',
    borderBottomRightRadius:20,
    borderStartWidth:1
  },
  txt:{
    fontSize:20,
    color:'#fff'
  }
});
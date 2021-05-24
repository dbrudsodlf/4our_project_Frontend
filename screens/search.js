import { SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { StyleSheet,View,FlatList,Text,TouchableHighlight,Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';



export default function search() {
  const [data, setData] = useState([]);
const [query, setQuery] = useState('');
const [heroes, setHeroes] = useState([]);
const [isModalVisible, setModalVisible] = useState(false);
const [date, setDate] = useState(new Date(1598051730000));
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);

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
  let search = query.toLowerCase().replace(/ /g,"_"); 
  if(hero.name.startsWith(search, 14)){
     return formatNames(hero);
  }else{ 
     heroes.splice(heroes.indexOf(hero), 1);
     return null;
  }
}


    return (

        <View style={styles.container}>
    <SearchBar platform='ios' cancelButtonTitle='취소'
 onChangeText={updateQuery}
 value={query}   
 underlineColorAndroid='transparent'
 placeholder="원하는 재료를 검색해보세요"/>

<FlatList 
   data={heroes} keyExtractor = {(i)=>i.id.toString()}
  extraData = {query} 
  renderItem = {({item}) =>{
    return(
      <TouchableHighlight underlayColor='#F59A23' onPress={toggleModal}>
      <Text style={styles.flatList}>{filterNames(item)}
     </Text>
     </TouchableHighlight>
    );
  }
} 
/>
<Modal isVisible={isModalVisible} style={{flex:1, justifyContent: 'center',alignItems: 'center'}}>
        <View style={styles.modal}>
          <Text style={styles.food}>재료이름</Text>
          <Text style={styles.date}>유통 기한</Text>
          <View style={styles.pickedDateContainer}>
        <Text style={styles.pickedDate}>{date.toLocaleDateString()}</Text>
      </View>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
          <Text style={styles.fridge}>보관 방법</Text>

        </View>
      </Modal>
     
        </View>

        
    );
}

const styles = StyleSheet.create({
  container :{
    justifyContent: 'center',
    flex:1,
    },
  TextInputStyleClass:{  
    textAlign: 'center',
    height: 40,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 7 ,
    backgroundColor : "#FFFFFF",
         
    },
  flatList:{
      paddingLeft: 15, 
      marginTop:15,
      paddingBottom:15,
      fontSize: 20,
      borderBottomColor: '#d3d3d3',
      borderBottomWidth:2
  },
  modal:{
    margin: 0,
    padding:30,
    width: 300,
    height: 400,
    backgroundColor:'#fff',
    borderRadius:20
  },
  food:{
    fontSize:30,
    fontWeight:"bold",
    marginBottom:20
  }
});

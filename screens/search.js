import { SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { StyleSheet,View,FlatList,Text,TouchableHighlight } from 'react-native';



export default function search() {
  const [data, setData] = useState([]);
const [query, setQuery] = useState('');
const [heroes, setHeroes] = useState([]);


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
      <TouchableHighlight underlayColor='#F59A23' onPress={()=>{alert(filterNames(item));}}>
      <Text style={styles.flatList}>{filterNames(item)}
     </Text>
     </TouchableHighlight>
    );
  }
} 
/>
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
  }
});

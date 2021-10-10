import React, { useState } from 'react';
import axios from 'axios';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { API_URL } from '../config/constants.js';
import { useSelector } from 'react-redux';
import { Linking } from 'react-native';

export default function CookList(props) {
    const [checked, setChecked] = useState(false);
    const[ingredients,setIngredients]=useState([]);
    const [insertData, setInsertData] = React.useState([]);
    const id = useSelector((state) => state.id);

    React.useEffect(() => {
        axios.get(`${API_URL}/mypage/mycook?user_id=${id}`, {recipe_name:'',recipe_check:''})
          .then((result) => {
            setIngredients(result.data);
            console.log("이것은 시청목록", result.data);
          })
          .catch((error) => {
            console.error(error);
          })
      }, []);

      React.useEffect(() => {
        ingredients.map((ing) => {
          let tempData = { name: ing.recipe_name,idd: ing._id,checked:1};
          setInsertData(prev => [...prev, tempData]);  
        });
      }, [ingredients]);

    return (
    <SafeAreaView style={styles.container}>
         <View style={styles.top}>
         <Icon name="sc-youtube" size={60} color="#ff0000" />
        <Text style={styles.text}>시청한 요리 내역</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scroll}>
        {
       insertData && insertData.map((food, index)=>{
         return(
             <View key={index}>
            <TouchableOpacity  onPress={() => 
            {  Linking.openURL(`https://www.youtube.com/results?search_query=${food.name}`)}}> 
                <View style={styles.list}> 
                    <Text style={styles.name}>{food.name}</Text>
                    <Icon name="sc-youtube" size={60} color="#ff0000" />
                </View>
            </TouchableOpacity>
            </View>);
        })
      }
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
        paddingTop:50
    },
    top:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20,
        backgroundColor: '#fff',
    },
    text:{
        fontWeight:'bold',
        fontSize: 28,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
      },
    list:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:20,
        paddingLeft:20,
        padding:5,
        borderWidth:2,
        marginRight:30,
        marginLeft:30,
        marginTop:30,
        borderRadius:20,
        backgroundColor:'#fff'
    },
    name:{
        fontSize:20,
    }
});

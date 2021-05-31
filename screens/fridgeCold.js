import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image
} from 'react-native';
import EggImage from '../assets/egg.jpeg';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {API_URL} from '../config/constants.js';

export default function FridgeCold (props) {

  const [ingredients, setIngredients] = React.useState([]);
  React.useEffect(()=>{
    axios.get(`${API_URL}/fridgecold`).then((result)=>{
      console.log(result);
      setIngredients(result.data.ingredients);
    }).catch((error)=>{
      console.error(error);
    })
  }, []);

  return (
    <View>
    <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden'}}>
        <View style={styles.ingredientsList} >
          {
            ingredients.map((ingredient, index)=>{
              return (
                <View style={styles.ingredientsCard}>
                  <View>
                    <Image 
                      style={styles.ingredientsImage} 
                      source={{
                        uri: `${ingredient.imgUrl}`
                      }} 
                      resizeMode={"contain"}/>
                  </View>
                  <View style={styles.ingredientsContents}>
                    <Text style={styles.ingredientsFont}>{ingredient.name}</Text>
                    <Text style={styles.ingredientsFont}>{ingredient.dday}</Text>
                  </View>
                </View>
              );
            })
          }
        </View>
        
        {/* <TouchableOpacity disabled={true}>
          <View style={styles.ingredientsCard}>
            <View style={{ alignItems: 'center', padding: 10 }}>
              <Icon name='help-circle-outline' size={110} color='#191919' />
            </View>
            <View style={styles.ingredientsContents}>
              <Text style={styles.ingredientsFont}> </Text>
              <Text style={styles.ingredientsFont}> </Text>
            </View>
          </View>
        </TouchableOpacity>
         */}
    </ScrollView>
    </View>
  );

  // function onMultiChange() {
  //   return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  // }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
  ingredientsCard: {
    marginTop: 40,
    marginLeft: 40,
    width: 150,
    borderColor: "#191919",
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: 0.3,
    shadowRadius: 6
  },
  ingredientsImage: {
    width: "100%",
    height: 130,
  },
  ingredientsContents: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ingredientsFont: {
    fontSize: 20,
  },
  ingredientsList: {
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap'
  }
});
import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

export default function YoutubeList () {
  return (
    <View style={styles.container}>
         <View style={styles.boxtop}>
         <Icon name="sc-youtube" size={60} color="#000" />
         <View style={styles.food1}>
         <Text style={styles.food2}>토마토 달걀 볶음</Text></View>
         <Icon2 name="ios-heart-outline" size={45} color="#000" />
         </View>

      <View style={styles.container2}     >
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden' }}>
          <View style={styles.box}>

            <View style={styles.box2} width={Dimensions.get('screen').width*0.9}>
             
              <View style={styles.box3}
              width={Dimensions.get('screen').width*0.5}>
              


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
    backgroundColor: '#FFD098',
padding:20,
  },
  food1:{
    marginLeft:20,
    marginTop:7 ,
    marginRight:120
  },
  food2: {
    fontSize: 25,
    fontWeight: "bold"
  },
  checkboxtop:{
    marginTop:5,
    flexDirection: 'row',
    justifyContent:'center'
  },
  checkboxtop2:{
    fontSize:15,
    marginTop:7
  },
  add:{
    borderRadius: 10,
    borderColor: "#F59A23",
    backgroundColor: '#F59A23',
    borderWidth: 2,
    padding: 10,
  },
  add2:{
    fontSize:13,
    fontWeight:'bold',
    color:'#fff'
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
    padding: 10,

    elevation:5
  },
  box2: {
    flexDirection: 'row',
  },
  box3: {
    paddingLeft: 20,
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

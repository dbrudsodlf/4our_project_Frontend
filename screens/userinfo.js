import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image
} from 'react-native';
import user from '../assets/user.png';

export default function UserInfo () {
  return (
    <View style={styles.container}>
      <View style={styles.area}>
        <View style={styles.userimg}>
        <Image style={styles.userimg} source={user}  /></View>
        <Text  style={styles.username}>포아워</Text> 
        <Text  style={styles.userid}>4our@naver.com</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
height:'100%',
backgroundColor:'#fff'
  },
  area:{
    alignItems:'center',
    paddingTop:60
  },
  userimg:{
    width:120,
    height:120,
},
username:{
  flexDirection:"row",
 fontWeight:'bold',
 fontSize:30,
 marginTop:30,

},
userid:{
  flexDirection:"row",
 fontWeight:'bold',
 fontSize:20,
 marginTop:30,
},
});

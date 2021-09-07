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
import { useSelector } from 'react-redux';

export default function UserInfo () {
  const name = useSelector((state) => state.name);
  const email = useSelector((state) => state.email);
  console.log("이름",name,email)
  return (
    <View style={styles.container}>
      <View style={styles.area}>
        <View style={styles.userimg} source={user}>
        <Image style={styles.userimg}  /></View>
        <Text  style={styles.username}>{name}</Text> 
        <Text  style={styles.userid}>{email}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
height:'100%',
backgroundColor:'#fff',
paddingTop:50
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

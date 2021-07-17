import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';

export default function Notice () {
  return (
    <View  style={styles.container}>
      <View> 
        <Text style={styles.text}>
          version 1.0
        </Text>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    height:'100%'
  },
  text:{
  padding:30,
  fontSize:15,
  fontStyle:'italic',
  color:'#696969'
}
});

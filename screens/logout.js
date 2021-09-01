import * as React from 'react';
import { ImageBackground } from 'react-native';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  
  SafeAreaView
} from 'react-native';

export default function Logout ({ route, navigation }) {
  const { photo } = route.params;
  const image = { uri: photo };
  console.log("주소",photo);
  return (
    <View style={{ flex: 1 , padding: 16}}>
        <ImageBackground
          source={image}
          style={{
            width:'100%',
            height:'100%'
          }}/>
    </View>
  );
}

/*
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
*/
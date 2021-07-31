import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import CheckboxList from 'rn-checkbox-list';
import { Checkbox } from 'react-native-paper';

export default function manageFridge () {

const data = [{id: 1, name: '계란'}, {id: 2, name: '토마토'}, {id: 3, name: '오이'}];

  return (
    <View style={styles.container}>
      <SafeAreaView  style={{flex: 1}}>
        <CheckboxList
          headerName="전체선택"
          theme="orange"
          listItems={data}
          onChange={({ ids, items }) => console.log('My updated list :: ', ids)}
          istItemStyle={{ borderBottomColor: '#eee', borderBottomWidth: 1 }}
          checkboxProp={{ boxType: 'square' }} // iOS (supported from v0.3.0)
        />
      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    height:'100%'
  },
});

import React, { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function HeartList({ checked, id }) {
  // const [likes, setLikes] = useState([]);

  // const onToggle = id => e => {//누르면 하트 표시
  //   setLikes(
  //     likes.map(like =>
  //       like.id === id ? { ...like, checked: !like.checked } : like,
  //     ),
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.list}>
          <Text style={styles.name}>토마토 달걀 볶음</Text>
          <View style={styles.nolike} >
            <Icon name="heart" size={30} color="#ff0000" />
          </View>
          {/* <TouchableOpacity onPressOut={onToggle(id)}>
              {checked ? (
                <View style={styles.likeit}>
                  <Icon name="hearto" size={30} color="#000" />
                </View>
              ) : (
                <View style={styles.nolike} >
                   <Icon name="heart" size={30} color="#ff0000" />
                  </View>
              )}
            </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff'
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    padding: 10,
    borderWidth: 2,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 30,
    borderRadius: 20,
    backgroundColor: '#fff'
  },
  name: {
    fontSize: 20,
  }
});

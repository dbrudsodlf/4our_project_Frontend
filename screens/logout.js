import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';

export default function Logout () {
  return (
    <View style={{ flex: 1 , padding: 16}}>
        <Text>
        로그아웃 하시겠습니까? 모달을 띄우는게 나으려나
        </Text>
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
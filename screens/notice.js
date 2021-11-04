import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';

export default function Notice () {
  return (
    <View  style={styles.container}>
      <View width={Dimensions.get('screen').width*0.88}> 
        <Text style={styles.topic}>
          저희 어플을 소개합니다
          </Text>
        <Text style={styles.text}>
          안녕하세요 4OUR팀 입니다. </Text>
          <Text style={styles.text}>저희 팀의 [냉장고를 부탁해]를 이용해 주셔서 감사합니다.</Text>
          <Text style={styles.text}>
          냉장고를 부탁해는 요리에 친숙하지 않은 많은 요리 초보생들과 매일 무엇을 해먹을지 고민이신 분들을 위해 만들어진
          메뉴 고민을 덜어드리는 어플입니다.</Text>
          <Text style={styles.text}>많은 사랑 부탁드립니다. 감사합니다.</Text>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    height:'100%',
    paddingTop:50,
    alignItems: 'center'
  },
  topic:{
     paddingTop:40,
     color:'#000',
     fontSize:26,
     paddingBottom:30
  },
  text:{
    marginBottom: 10,
    fontSize:16,
    color:'#696969'
  }
});

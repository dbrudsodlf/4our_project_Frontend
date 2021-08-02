import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MyPageUser from './mypageUser';

export default function MypageScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <MyPageUser />
      <TouchableOpacity style={styles.cooklist} onPress={() => { props.navigation.navigate("cooklist") }}>
        <Text style={styles.text}> 요리내역 </Text>
        <Icon name="right" size={30} color="#a9a9a9" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.heartlist} onPress={() => { props.navigation.navigate("heartlist") }}>
        <Text style={styles.text}> 찜한 목록 </Text>
        <Icon name="right" size={30} color="#a9a9a9" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.notice} onPress={() => { props.navigation.navigate("notice") }}>
        <Text style={styles.text}> 공지사항 </Text>
        <Icon name="right" size={30} color="#a9a9a9" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.versioninfo} onPress={() => { props.navigation.navigate("versioninfo") }}>
        <Text style={styles.text}> 버전 정보 </Text>
        <Icon name="right" size={30} color="#a9a9a9" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.userinfo} onPress={() => { props.navigation.navigate("userinfo") }}>
        <Text style={styles.text}> 회원 정보 </Text>
        <Icon name="right" size={30} color="#a9a9a9" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logout} onPress={() => { props.navigation.navigate("logout") }}>
        <Text style={styles.text}> 로그아웃 </Text>
        <Icon name="right" size={30} color="#a9a9a9" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    //backgroundColor:'#ffefd5'
  },
  cooklist: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:1,
    backgroundColor: '#fff',
    marginTop: 20,
    height: 50,
    paddingRight: 10,
    paddingLeft: 20
  },
  heartlist: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 50,
    paddingRight: 10,
    paddingLeft: 20
  },
  notice: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:1,
    backgroundColor: '#fff',
    marginTop: 20,
    height: 50,
    paddingRight: 10,
    paddingLeft: 20
  },
  versioninfo: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:1,
    backgroundColor: '#fff',
    height: 50,
    paddingRight: 10,
    paddingLeft: 20
  },
  userinfo: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:1,
    backgroundColor: '#fff',
    height: 50,
    paddingRight: 10,
    paddingLeft: 20
  },
  logout: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 50,
    paddingRight: 10,
    paddingLeft: 20
  },
  text: {
    fontSize: 18
  }
});

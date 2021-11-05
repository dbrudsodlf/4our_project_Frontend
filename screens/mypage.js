import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MyPageUser from './mypageUser';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native-gesture-handler';

export default function MypageScreen(props) {
  const logoutalert = () => {
    Alert.alert(
      //title
      '',
   '로그아웃 되었습니다',
      [
        {
          text: '확인',
          onPress: () => props.navigation.navigate("login") 
        }
     
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.top}>
      {/* <Icon2 name='account-outline' size={45} color={'#F59A23'}/>  */}
      <Text style={styles.appTitle}>마이페이지</Text>
    </View>
    <ScrollView>
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
      <TouchableOpacity style={styles.logout} onPress={() => 
      {  logoutalert();}}>
        
        <Text style={styles.text}> 로그아웃 </Text>
        <Icon name="right" size={30} color="#a9a9a9" />
      </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop:50,
    flex: 1,
  },
  top:{
    flexDirection: "row",
    alignItems: 'center',
    paddingLeft:20,
    marginBottom:20
  },
  appTitle: {
    color: '#000',
    fontSize: 22,
    marginTop: 20,
    marginLeft: 10,
    fontWeight: '300',
    textAlign: 'left',
    fontWeight:'bold'
  },
  cooklist: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:1,
    backgroundColor: '#fff',
    marginTop: 20,
    height: 70,
    paddingRight: 10,
    paddingLeft: 20
  },
  heartlist: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 70,
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
    height: 70,
    paddingRight: 10,
    paddingLeft: 20
  },
  versioninfo: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:1,
    backgroundColor: '#fff',
    height: 70,
    paddingRight: 10,
    paddingLeft: 20
  },
  userinfo: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom:1,
    backgroundColor: '#fff',
    height: 70,
    paddingRight: 10,
    paddingLeft: 20
  },
  logout: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 70,
    paddingRight: 10,
    paddingLeft: 20,
    marginBottom:50
  },
  text: {
    fontSize: 20
  }
});

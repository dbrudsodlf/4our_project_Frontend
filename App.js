import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, SafeAreaView, Text, View, Button, TouchableOpacity } from 'react-native';
import LoginScreen from './screens/login.js';
import StartScreen from './screens/start.js';
import MainScreen from './screens/main.js';
import ManageScreen from './screens/manage.js';
import BasketScreen from './screens/basket.js';
import MypageScreen from './screens/mypage.js';
import ChoiceScreen from './screens/choice.js';
import SearchScreen from './screens/search.js';
import CartScreen from './screens/cart.js';
import CookScreen from './screens/cook.js';
import CookList from './screens/cooklist.js';
import HeartList from './screens/heartlist';
import Notice from './screens/notice';
import UserInfo from './screens/userinfo';
import Logout from './screens/logout.js';
import YoutubeList from './screens/youtubeList';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const MainTab = createBottomTabNavigator();
const Stack = createStackNavigator();
const SettingsStack = createStackNavigator();



function BottomSH() {

}

function MainTabScreen() {
  return (
    <MainTab.Navigator
      initialRouteName="MainScreen"
      tabBarOptions={{
        activeTintColor: '#F59A23',
        inactiveTintColor: '#191919',
        style: {
          paddingBottom: 20,
          backgroundColor: '#FFF',
          padding: 20,
          alignItems: 'center',
          justifyContent: 'space-around',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: -9
          },
          shadowOpacity: 0.4,
          shadowRadius: 10
        },
        indicatorStyle: {
          borderBottomColor: '#F59A23',
          borderBottomWidth: 4,
        },
        showIcon: true,
        showLabel: false
      }}
    >
      <MainTab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarLabel: '냉장',
          tabBarIcon: ({ tintColor }) => (
            <Icon name='fridge-outline' color='#191919' size={30} />
          )
        }} />
      <MainTab.Screen
        name="ManageScreen"
        component={ManageScreen}
        options={{
          tabBarLabel: '냉장',
          tabBarIcon: ({ tintColor }) => (
            <Icon name='calendar-month-outline' color='#191919' size={30} />
          )
        }} />
      <MainTab.Screen
        name="ChoiceScreen"
        component={ChoiceScreen}
        options={{
          tabBarLabel: '냉장',
          tabBarIcon: ({ tintColor }) => (
            <Icon name='plus' color='#191919' size={30} />
          ),

        }}
      />
      <MainTab.Screen
        name="BasketScreen"
        component={BasketScreen}
        options={{
          tabBarLabel: '냉장',
          tabBarIcon: ({ tintColor }) => (
            <Icon name='basket-outline' color='#191919' size={30} />
          )
        }} />
      <MainTab.Screen
        name="MypageScreen"
        component={MypageScreen}
        options={{
          tabBarLabel: '냉장',
          tabBarIcon: ({ tintColor }) => (
            <Icon name='account-outline' color='#191919' size={30} />
          )
        }} />

    </MainTab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="mypage">
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
              title: "로그인 화면"
            }} />
          <Stack.Screen
            name="start"
            component={StartScreen}
            options={{
              title: "촬영 유도 화면"
            }} />
          <Stack.Screen
            name="search"
            component={SearchScreen}
            options={{
              title: "재료 검색 화면"
            }} />
          <Stack.Screen
            name="cart"
            component={CartScreen}
            options={{
              title: "담은 재료"
            }} />
          <Stack.Screen
            name="MainScreen"
            component={MainTabScreen}
            options={{
              title: "메인 화면"
            }} />
            <Stack.Screen
            name="cook"
            component={CookScreen}
            options={{
              title: "요리 하기"
            }} />
          <Stack.Screen
            name="youtubeList"
            component={YoutubeList}
            options={{
              title: "요리 하기"
            }} />   
          <Stack.Screen
            name="basket"
            component={BasketScreen}
            options={{
              title: "장바구니"
            }} />     
          <Stack.Screen
            name="mypage"
            component={MypageScreen}
            options={{
              title: "마이페이지"
            }} />  
          <Stack.Screen
            name="cooklist"
            component={CookList}
            options={{
              title: "요리내역"
            }} /> 
          <Stack.Screen
            name="heartlist"
            component={HeartList}
            options={{
              title: "찜한 목록"
            }} /> 
          <Stack.Screen
            name="notice"
            component={Notice}
            options={{
              title: "공지사항"
            }} /> 
          <Stack.Screen
            name="userinfo"
            component={UserInfo}
            options={{
              title: "회원 정보"
            }} />  
          <Stack.Screen
            name="logout"
            component={Logout}
            options={{
              title: "로그아웃"
            }} />      
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

import React from 'react';
import {Button, StyleSheet, Text, View,Image} from 'react-native';
import user from '../assets/user.png';

const MyPageUser = ({}) => {
    return (
        <View style={styles.container}>
        <View style={styles.userimg}>
        <Image style={styles.userimg} source={user} /></View>
        <View style={styles.user}>
            <Text  style={styles.username}>포아워</Text> 
            <Text  style={styles.userid}>4our@naver.com</Text>
        </View>
        </View>
  
        );
    };

const styles = StyleSheet.create({
    container:{
    padding:25,
    backgroundColor:'#fff',
    flexDirection:"row",
    },
    userimg:{
        width:60,
        height:60,
        marginRight:20
    },
    user:{
        flexDirection:"column",
    },
    username:{
        flexDirection:"row",
       fontWeight:'bold',
       fontSize:20,
       marginTop:3,
       marginBottom:3
    }
});

export default MyPageUser;
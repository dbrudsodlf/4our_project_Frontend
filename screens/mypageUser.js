import React from 'react';
import {Button, StyleSheet, Text, View,Image} from 'react-native';
import user from '../assets/user.png';
import { useSelector } from 'react-redux';

const MyPageUser = ({}) => {
    const name = useSelector((state) => state.name);
    const email = useSelector((state) => state.email);
    return (
        <View style={styles.container}>
        <View style={styles.userimg}>
        <Image style={styles.userimg} source={user} /></View>
        <View style={styles.user}>
            <Text  style={styles.username}>{name}</Text> 
            <Text  style={styles.userid}>{email}</Text>
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
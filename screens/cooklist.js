import * as React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function CookList(props) {
    return (
    <SafeAreaView style={styles.container}>
         <View style={styles.top}>
         <Icon name="sc-youtube" size={60} color="#ff0000" />
        <Text style={styles.text}>시청한 요리 내역</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scroll}>
            <TouchableOpacity  onPress={() => { props.navigation.navigate("youtubeList") }}> 
                <View style={styles.list}>
                    <Text style={styles.name}>토마토 달걀 볶음</Text>
                    <Icon name="sc-youtube" size={60} color="#ff0000" />
                </View>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        height:'100%',
        paddingTop:50
    },
    top:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20,
        backgroundColor: '#fff',
    },
    text:{
        fontWeight:'bold',
        fontSize: 28,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
      },
    list:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:20,
        paddingLeft:20,
        padding:5,
        borderWidth:2,
        marginRight:30,
        marginLeft:30,
        marginTop:30,
        borderRadius:20,
        backgroundColor:'#fff'
    },
    name:{
        fontSize:20,
    }
});

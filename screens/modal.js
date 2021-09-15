import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
    View,
    StyleSheet,
    Text,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_URL, flask_url } from '../config/constants.js';
import FormData from 'form-data';

//useEffect cleanup function 추가해야함
//To fix, cancel all subscriptions and asynchronous tasks

const createFormData = (photo) => {
    const data = new FormData();
    console.log(photo);
  
    data.append('image', {
      name: '',
      type: 'image/jpeg',
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
    // data.append('image', {type: 'image/jpeg',image: photo})
  
    return data;
  };

const ModalPage = (props) => {
    const { modalVisible, setModalVisible } = props;
    const [pickedImagePath, setPickedImagePath] = useState('');
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;
    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });
    const navigation = useNavigation();

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 0,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(() => {
        if (props.modalVisible) {
            resetBottomSheet.start();
        }
    }, [props.modalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(() => {
            setModalVisible(false);
        })
    }

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        // Explore the result
        console.log("성공",result);

        if (!result.cancelled) {
            navigation.navigate("cameraCheck", { photo:result.uri });
            //let img_url =result.uri;
            console.log(createFormData(result));

            axios.post(`${flask_url}/camera/predict`,
            createFormData(result)
            // , {
            //     headers: {
            //         'content-type': 'multipart/form-data',
            //     }
            // }
            )
            //{image: Platform.OS === 'ios' ? result.uri.replace('file://', '') : result.uri})
            .then((res)=>{
                console.log("보냄", res);
                console.log(res.data.label);
            }).catch(error=>{
                console.log(error);})

            // axios({
            //     method: 'post',
            //     url: `${flask_url}/camera/predict`,
            //     headers: { 'content-type': 'multipart/form-data' }, 
            //     data: createFormData(result)
            //   })
            //   .then((res)=>{
            //         console.log("보냄", res);
            //         console.log(res.data.label);
            //     }).catch(error=>{
            //         console.log(error);})
        }

    }

    const pickImage = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            console.log(result.uri);
        }
    };
  
    // useEffect(()=>{
    //     console.log('나타남');
       
    //     return()=>{
    //         console.log('닫힘');
    //         closeModal();
    //     }
       
    // },[navigation])

    

  
    return (
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{ ...styles.bottomSheetContainer, transform: [{ translateY: translateY }] }}
                    {...panResponders.panHandlers}
                >
                    <View style={styles.header}>
                        <Text style={styles.headername}>재료 추가하기</Text>
                        <TouchableOpacity onPress={closeModal}>
                            <Icon name='close' color='#191919' size={32} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <TouchableOpacity style={styles.contents} onPress={openCamera}>
                            <Icon name='camera' color='#191919' size={32}
                                style={{
                                    backgroundColor: '#ffe4c4',
                                    width: 52,
                                    padding: 10,
                                    borderRadius: 30,
                                    marginRight: 20
                                }} />
                            <Text style={styles.texts}>사진 촬영하러 가기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contents} onPress={pickImage}>
                            <Icon name='import' color='#191919' size={32}
                                style={{
                                    backgroundColor: '#ffe4c4',
                                    width: 52,
                                    padding: 10,
                                    borderRadius: 30,
                                    marginRight: 20
                                }} />
                            <Text style={styles.texts} >라이브러리에서 사진 가져오기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.contents}
                            onPress={()=> {
                                navigation.navigate('search');
                            }}>
                            <Icon name='magnify' color='#191919' size={32}
                                style={{
                                    backgroundColor: '#ffe4c4',
                                    width: 52,
                                    padding: 10,
                                    borderRadius: 30,
                                    marginRight: 20
                                }} />
                            <Text style={styles.texts}>직접 검색하러 가기</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    headername: {
        fontSize: 20
    },
    content: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,

    },
    contents: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
        width: '100%'
    },
    texts: {
        fontSize: 17
    },
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        height: 300,
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }
})

export default ModalPage;
// import * as React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
// import Animated from 'react-native-reanimated';
// import BottomSheet from 'reanimated-bottom-sheet';

// export default function ChoiceScreen () {
//   const renderContent = () => (
//     <View
//       style={{
//         backgroundColor: 'white',
//         padding: 16,
//         height: 450,
//       }}
//     >
//       <Text>Swipe down to close</Text>
//     </View>
//   );

//   const sheetRef = React.useRef(null);

//   return (
//       <View style={styles.container}>
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: 'papayawhip',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <Button
//           title="Open Bottom Sheet"
//           onPress={() => sheetRef.current.snapTo(0)}
//         />
//       </View>
//       <BottomSheet
//         ref={sheetRef}
//         snapPoints={[450, 300, 0]}
//         borderRadius={10}
//         renderContent={renderContent}
//       />
//       </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignContent: 'center',
//     textAlign: 'center',
//     paddingTop: 30,
//     backgroundColor: '#307ecc',
//     padding: 16,
//   },
//   buttonStyle: {
//     width: '100%',
//     height: 40,
//     padding: 10,
//     backgroundColor: '#f5821f',
//     marginTop: 30,
//   },
//   buttonTextStyle: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   titleStyle: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 20,
//     marginTop: 10,
//   },
// });

import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet
} from 'react-native';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import ImagePicker from 'react-native-image-crop-picker';
import MainScreen from './main';
import Fridge from './fridge.js';

const ChoiceScreen = () => {

  const {colors} = useTheme();

  const sheetRef = React.useRef(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      sheetRef.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      sheetRef.current.snapTo(1);
    });
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Ingredients Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>사진 촬영하러 가기</Text>
        <Icon name='camera' color='#191919' size={32} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>라이브러리에서 사진 가져오기</Text>
        <Icon name='import' color='#191919' size={32} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} >
        <Text style={styles.panelButtonTitle}>직접 검색하러 가기</Text>
        <Icon name='magnify' color='#191919' size={32} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => sheetRef.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderInner}
        renderHeader={renderHeader}
      />
      
      {/* <Animated.View style={{margin: 20,
        opacity: Animated.add(1.0, Animated.multiply(fadeAnim, 1.0)),
    }}>
      <MainScreen />
      </Animated.View> */}
    </View>
  );
};

export default ChoiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderColor: '#191919',
    borderWidth: 1,
    marginVertical: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191919',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
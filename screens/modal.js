import React,{useState} from 'react';
import {StyleSheet,  Text,View,TouchableHighlight,SegmentedControl,tabIndex,Dimensions,TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';


const ModalPage=(props)=>  {
  const[open,name]=props;
  const today = new Date();
  const [date, setDate] = useState(new Date(today));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const pickfood=(ingredients)=>{
    setCartin([...cartin,modalName]);
    console.log("카트:",cartin)
    }

  const showModal=()=>{
    setModalVisible(!isModalVisible);
   }

  const handleTabsChange = index => {
    setTabIndex(index);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <Modal
    transparent={true}
    closeOnTouchOutside={true}
    isVisible={open}
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <View style={styles.modal}>
      <View style={styles.modal2}>
        <Text style={styles.food}>{name}</Text>
        <Text style={styles.date} >유통 기한</Text>

        <TouchableHighlight underlayColor='#fff' onPress={showDatepicker}>
          <View style={styles.showdate} >
            <Icon name="calendar" size={30} color="#8C9190" />
            <Text style={styles.date2}>{date.toLocaleDateString('ko-KR')}
            </Text></View>
        </TouchableHighlight>

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        )}

        <Text style={styles.fridge}>보관 방법</Text>

        <SegmentedControl
          tabs={['냉장', '냉동']}
          currentIndex={tabIndex}
          onChange={handleTabsChange}
          segmentedControlBackgroundColor='#fff'
          activeSegmentBackgroundColor='#ffe0ad'
          paddingVertical={15}
          width={Dimensions.get('screen').width / 2}
          textStyle={{
            fontWeight: '300',
          }}
        />
      </View>

      <View style={styles.touch} >
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            setModalVisible(!isModalVisible);
          }}>
          <Text style={styles.txt}>취소</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            pickfood({name})
            setModalVisible(!isModalVisible);
          }}>
          <Text style={styles.txt}>담기</Text>
        </TouchableOpacity></View>
    </View>
  </Modal>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
  },
  modal: {
    margin: 0,
    width: 300,
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 20
  },
  modal2: {
    padding: 30,
  },
  food: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  },
  date: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,

  },
  showdate: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#8C9190',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 30
  },
  fridge: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,

  },
  date2: {
    fontSize: 20,
    marginRight: 50
  },
  touch: {
    flexDirection: 'row',
    width: 300,
    borderBottomEndRadius: 20
  },
  button1: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59A23',
    height: 60,
    borderColor: '#fff',
    borderBottomLeftRadius: 20
  },
  button2: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59A23',
    height: 60,
    borderColor: '#fff',
    borderBottomRightRadius: 20,
    borderStartWidth: 1
  },
  txt: {
    fontSize: 20,
    color: '#fff'
  }
});

export default ModalPage;
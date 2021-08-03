import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const BasketInsert = ({ onAddBasket }) => {
  const [newBasketItem, setNewBasketItem] = useState('');

  const BasketInputHandler = newBasket => {
    setNewBasketItem(newBasket);
  };

  const addBasketHandler = () => {
    onAddBasket(newBasketItem);
    setNewBasketItem('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="사야할 재료를 입력해주세요"
        placeholderTextColor={'#999'}
        autoCorrect={false}
        onChangeText={BasketInputHandler}
        value={newBasketItem}
      />
      <View style={styles.button}>
        <Button title={'추가'} color={'#F59A23'} onPress={addBasketHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingBottom: 10,
    paddingTop: 30,
    paddingLeft: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 15,
    marginLeft: 20,
  },
  button: {
    marginRight: 15,
    marginLeft: 15,
    marginTop: 20

  },
});

export default BasketInsert;
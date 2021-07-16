import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const BasketInsert = ({ onAddTodo }) => {
  const [newTodoItem, setNewTodoItem] = useState('');

  const todoInputHandler = newTodo => {
    setNewTodoItem(newTodo);
  };

  const addTodoHandler = () => {
    onAddTodo(newTodoItem);
    setNewTodoItem('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="사야할 재료를 입력해주세요"
        placeholderTextColor={'#999'}
        autoCorrect={false}
        onChangeText={todoInputHandler}
        value={newTodoItem}
      />
      <View style={styles.button}>
        <Button title={'추가'} color={'#F59A23'} onPress={addTodoHandler} />
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
    fontSize: 20,
    marginLeft: 20,
  },
  button: {
    marginRight: 15,
    marginLeft: 15,
    marginTop: 20

  },
});

export default BasketInsert;
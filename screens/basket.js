import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import BasketInsert from './basketInsert.js';
import BasketList from './basketList.js';


export default function BasketScreen() {
  const [todos, setTodos] = useState([]);

  const addTodo = text => { //장바구니 추가
    setTodos([
      ...todos,
      { id: Math.random().toString(), textValue: text, checked: false },
    ]);
  };

  const onRemove = id => e => { //장바구니 삭제
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const onToggle = id => e => {//누르면 완료 표시
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.appTitle}>장바구니</Text>
      <View style={styles.card}>
        <BasketInsert onAddTodo={addTodo} />
        <BasketList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appTitle: {
    color: '#000',
    fontSize: 30,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 20,
    fontWeight: '300',
    textAlign: 'left',
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#F59A23',
    flex: 1,
    borderTopLeftRadius: 10, // to provide rounded corners
    borderTopRightRadius: 10, // to provide rounded corners
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24,
    marginLeft: 20,
  },
});

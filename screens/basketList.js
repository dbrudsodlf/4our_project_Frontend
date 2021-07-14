import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import BasketListItem from './basketListItem.js';

const BasketList = ({todos,onRemove, onToggle}) => {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
        {todos.map(todo => (
        <BasketListItem key={todo.id} {...todo} onRemove={onRemove}  onToggle={onToggle}/>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
  },
});

export default BasketList;
import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import BasketListItem from './basketListItem.js';

const BasketList = ({baskets,onRemove, onToggle}) => {
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
        {baskets.map(basket => (
        <BasketListItem key={basket.id} {...basket} onRemove={onRemove}  onToggle={onToggle} _id={basket._id}/>
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
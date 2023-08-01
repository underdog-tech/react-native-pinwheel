/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import type {Event} from '../types';

type Props = {
  events: Event[];
};

const EventListView: React.FC<Props> = ({events}) => {
  return (
    <SafeAreaView>
      <FlatList
        data={events}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => {
          return (
            <View style={{backgroundColor: 'white'}}>
              <Text>{JSON.stringify(item)}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default EventListView;

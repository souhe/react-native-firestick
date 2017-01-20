/* @flow */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type TProps = {
  url: string;
  name: string;
  onPress: Function;
}

export default function Article({ url, name, onPress }: TProps) {
  return (
    <TouchableOpacity style={styles.feed} onPress={onPress}>
      <Text style={styles.feedName}>{name}</Text>
      <Text style={styles.feedUrl}>url: {url}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  feedName: {
    fontSize: 15,
  },
  feedUrl: {
    fontSize: 10,
    color: 'gray',
  },
  feed: {
    margin: 10,
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: 'gray',
  },
});

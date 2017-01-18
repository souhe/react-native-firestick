/* @flow */

import React from 'react';
import { View, Text } from 'react-native';

import type { Article } from '../types';

type TProps = {
  article: Article;
}

export default function(props: TProps) {
  const { article } = props;
  return (
    <View>
      <Text>{article.title}</Text>
      {article.creator && <Text>Creator: {article.creator}</Text>}
      <Text>{article.pubDate.toGMTString()}</Text>
    </View>
  );
}

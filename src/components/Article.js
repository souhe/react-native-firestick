/* @flow */

import React from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native';

import type { TArticle } from '../types';

type TProps = {
  article: TArticle;
}

export default function Article(props: TProps) {
  const { article } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      <View style={styles.info}>
        {article.creator && (
          <Text style={styles.infoItem}>Creator: {article.creator}</Text>
        )}
        <Text style={styles.infoItem}>Date: {article.pubDate.toGMTString()}</Text>
      </View>
      <View style={styles.content}>
        {(article.description || article.encoded) && (
          <View style={styles.webviewContainer}>
            <WebView
              style={styles.webview}
              startInLoadingState
              source={{ html: article.description || article.encoded }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingLeft: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#004b8b',
  },
  title: {
    fontSize: 18,
    color: '#004b8b',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    fontSize: 13,
    color: 'gray',
  },
  webviewContainer: {
    marginTop: 10,
    height: 150,
    borderWidth: 1,
    borderColor: '#004b8b',
  },
  webview: {
    flex: 1,
  },
});

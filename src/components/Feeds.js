/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';

import { selectable, SelectableContainer, SelectableInput } from './Selectable';
import Router from '../Router';

type TProps = {
  navigator: Object;
}

type TState = {
  url: string;
  feeds: Array<Object>;
}

const SelectableButton = selectable(Button);

const SelectableFeedItem = selectable(({ url, name, onPress }) => (
  <TouchableOpacity style={styles.feed} onPress={onPress}>
    <Text style={styles.feedName}>{name}</Text>
    <Text style={styles.feedUrl}>url: {url}</Text>
  </TouchableOpacity>
));

export default class Feeds extends Component {
  props: TProps

  state: TState = {
    url: 'http://',
    feeds: [
      { url: 'http://javascriptweekly.com/rss/1b4h23bp', name: 'JS Weekly' },
      { url: 'https://blog.callstack.io/feed', name: 'Callstack.io blog' },
    ],
  }

  handleOpenClick = () => {
    console.log('URL', this.state.url);
    this.setState({ feeds: [...this.state.feeds, { url: this.state.url, name: this.state.url }] });
  }

  handleTextChange = (text: string) => {
    this.setState({ url: text });
  }

  render() {
    const { url, feeds } = this.state;
    const { navigator } = this.props;
    return (
      <View>
        <SelectableContainer>
          <View style={styles.addContainer}>
            <SelectableInput
              value={url}
              onChangeText={this.handleTextChange}
            />
            <SelectableButton
              style={styles.button}
              title="ADD"
              onPress={this.handleOpenClick}
            />
          </View>

          {feeds.map(feed => (
            <SelectableFeedItem
              name={feed.name}
              url={feed.url}
              onPress={() => navigator.push(Router.getRoute('articles', { url: feed.url }))}
              key={feed.url}
            />
          ))}
        </SelectableContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
  },
  addContainer: {
    margin: 10,
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#004b8b',
  },
  feed: {
    margin: 10,
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: 'gray',
  },
  feedName: {
    fontSize: 15,
  },
  feedUrl: {
    fontSize: 10,
    color: 'gray',
  },
});

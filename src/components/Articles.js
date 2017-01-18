/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import fetchRss from '../fetchRss';
import ArticleComponent from './Article';
import { SelectableContainer } from './Selectable';
import type { Article } from '../types';

type TState = {
  loading: boolean;
  feeds: Array<Article>;
  error?: Object;
}

type TProps = {
  url: string;
}

export default class Articles extends Component {
  props: TProps
  state: TState = {
    loading: true,
    articles: [],
  };

  componentDidMount() {
    if (this.props.url) {
      fetchRss(this.props.url)
        .then((articles) => this.setState({ loading: false, articles }))
        .catch((error) => this.setState({ loading: false, error }));
    }
  }

  _getArticles = () => {
    return this.state.articles.map((article) => (
      <ArticleComponent
        key={article.guid}
        article={article}
      />
    ));
  }

  render() {
    return (
      <View>
        <SelectableContainer>
          <Text>Articles for {this.props.url}</Text>
          { this.state.loading && <ActivityIndicator animating size="large" /> }
          { this._getArticles() }
        </SelectableContainer>
      </View>
    );
  }
}


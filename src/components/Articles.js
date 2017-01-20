/* @flow */

import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';

import fetchRss from '../fetchRss';
import Article from './Article';
import { SelectableContainer, selectable } from './Selectable';
import type { TArticle } from '../types';

type TState = {
  loading: boolean;
  articles: Array<TArticle>;
  error?: Object;
}

type TProps = {
  url: string;
  navigator: any;
}

const SelectableArticle = selectable(Article);

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
      <SelectableArticle
        key={article.guid}
        article={article}
      />
    ));
  }

  render() {
    return (
      <View>
        <SelectableContainer>
          { this.state.loading && <ActivityIndicator animating size="large" /> }
          { this._getArticles() }
        </SelectableContainer>
      </View>
    );
  }
}


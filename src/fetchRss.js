/* @flow */

import type { Article } from './types';

export default function fetchRss(url: string): Array<Article> {
  return fetch(getYqUrl(url))
    .then((res) => res.json())
    .then((result) => {
      try {
        return result.query.results.item;
      } catch (_) {
        return [];
      }
    })
    .then((articles) => articles.map((a) => ({
      ...a,
      pubDate: new Date(a.pubDate),
      guid: a.guid.content ? a.guid.content : a.guid,
    })));
}

function getYqUrl(url: string) {
  const query = encodeURIComponent(`select * from rss where url='${url}'`);
  return `https://query.yahooapis.com/v1/public/yql?q=${query}&format=json`;
}

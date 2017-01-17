/* @flow */

import {
  createRouter,
} from '@exponent/ex-navigation';

import Feeds from './components/Feeds';
import Articles from './components/Articles';

const Router = createRouter(() => ({
  feeds: () => Feeds,
  articles: () => Articles,
}));

export default Router;

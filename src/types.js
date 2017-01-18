/* @flow */

export type Article = {
  description?: string;
  encoded?: string;
  creator?: string;
  link: string;
  pubDate: Date;
  title: string;
  guid: {
    content: string;
    isPermaLink: bool;
  };
}


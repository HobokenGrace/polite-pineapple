import React from 'react';
import moment from 'moment-strftime';

import { getData } from '../utils';

const TimeStamp = (props) => {
  const {
    data = {},
    date_type,
    page: post,
  } = props;
  return (
    <>
      <time className="published" dateTime={moment(post?.frontmatter?.date).strftime('%Y-%m-%d %H:%M')}>
        {(date_type === 'short')
          ? (moment(post?.frontmatter?.date).strftime('%B %d, %Y'))
          : moment(post?.frontmatter?.date).strftime('%A, %B %e, %Y')}
      </time>
      {
        post?.frontmatter?.author && ((() => {
          const author = getData(data, post?.frontmatter?.author);
          return (`, by ${author?.first_name} ${author?.last_name}`);
        })())
      }
    </>
  );
};

export default TimeStamp;

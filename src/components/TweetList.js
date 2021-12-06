import React from 'react';

import Tweet from './Tweet';
import classes from './../css/TweetList.module.css';

const TweetList = (props) => {
  return (
    <ul className={classes['tweet-list']}>
      {props.tweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          id={tweet.id}
          message={tweet.message}
          postdate={tweet.postdate}
          fromUser={tweet.fromUser}
          likes={tweet.likes}
        />
      ))}
    </ul>
  );
};

export default TweetList;

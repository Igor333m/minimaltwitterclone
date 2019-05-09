import { saveLikeToggle, saveTweet } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

// Tweet events
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';

// Normal action creator to update the state
function addTweet (tweet) {
  return {
    type: ADD_TWEET,
    tweet
  }
}

// Asynchronous action creator
export function handleAddTweet (text, replyingTo) {
  return (dispach, getState) => {
    const { authedUser } = getState();

    dispach(showLoading());

    return saveTweet({
      text,
      author: authedUser,
      replyingTo
    }).then( tweet => dispach(addTweet(tweet)))
      .then(dispach(hideLoading()));
  }
}

export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

function toggleTweet ({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}

export function handleToggleTweet (info) {
  return (dispach) => {
    dispach(toggleTweet(info));

    return saveLikeToggle(info)
      .catch((e) => {
        console.warn('Error in handleToggleTweet: ', e);
        dispach(toggleTweet(info));
        alert('There was an error liking this tweet, try again.');
      });
  }
}
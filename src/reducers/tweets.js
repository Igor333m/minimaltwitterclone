import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET} from '../actions/tweets';


export default function tweets (state = {}, action) {
  switch (action.type) {
    case RECEIVE_TWEETS :
      return {
        ...state,
        ...action.tweets
      }
    case TOGGLE_TWEET :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked === true
            ? state[action.id].likes.filter( uid => uid !== action.authedUser )
            : state[action.id].likes.concat([action.authedUser])
        }
      }
      /**
       * New Tweet Reducer.
       * the new tweet needs to be added to the list of tweets
       * an already existing tweet needs to be modified
       *  if the new tweet is a response to another tweet
       * In this reducer, we'll
       * ***concatenate the new tweet to the list of the already-existing tweets.
       *  Remember that the object spread operator offers us the most concise way of doing that;
       * *** modify the replies property of the tweet the new tweet is replying to.
       */
    case ADD_TWEET :
      const { tweet } = action;

      let replyingTo = {};
      if (tweet.replyingTo !== null) {
        replyingTo = {
          [tweet.replyingTo]: {
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        }
      }

      return {
        ...state,
        [action.tweet.id]: action.tweet,
        ...replyingTo
      }
    default :
      return state
  }
}
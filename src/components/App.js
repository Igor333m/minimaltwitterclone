import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import NewTweet from './NewTweet';

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div>
        <LoadingBar />
        { this.props.loading === true 
          ? null
          : <NewTweet /> }        
      </div>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

// connect() function upgrades a component to a container.
// Containers can read state from the store and dispatch actions.
export default connect(mapStateToProps)(App);
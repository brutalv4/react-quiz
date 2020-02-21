import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Logout from './components/Logout/Logout';
import Auth from './containers/Auth/Auth';
import Quiz from './containers/Quiz/Quiz';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Layout from './hoc/Layout/Layout';
import { autoLogin } from './store/actions/auth';

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        {!this.props.isAuthenticated ? (
          <Route path="/auth" component={Auth} />
        ) : (
          <Route path="/quiz-creator" component={QuizCreator} />
        )}
        <Route path="/quiz/:id" component={Quiz} />
        {this.props.isAuthenticated ? (
          <Route path="/logout" component={Logout} />
        ) : null}
        <Route path="/" exact={true} component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token,
});

const mapDispatchToProps = dispatch => ({
  autoLogin: () => dispatch(autoLogin()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

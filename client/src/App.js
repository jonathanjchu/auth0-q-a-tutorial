import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Questions from './components/Questions';
import Question from './components/Question';
import Callback from './Callback';
import NewQuestion from './components/NewQuestion';
import SecuredRoute from './SecuredRoute';
import auth0Client from './Auth';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    }

    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }

    this.setState({ checkingSession: false });
  }

  render() {
    return (
      <div className="App">
        <NavBar />

        <Switch>
          <Route exact path='/' component={Questions} />
          <SecuredRoute exact path='/questions/new' component={NewQuestion} checkingSession={this.state.checkingSession} />
          <Route exact path='/questions/:questionId' component={Question} />
          <Route exact path='/callback' component={Callback} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/nav/Nav";
import SideBar from "./components/sideBar/SideBar";
import Loader from "./components/preLoader/Loader";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import reducer from "./reducers";
import TodoListContainer from "./containers/TodoListContainer";
import TodoListFormContainer from "./containers/TodoListFormContainer";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
require('./app.scss');
// require('../assets/images/favicon.ico');


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <div>
          <Loader />
          <Nav />
          <SideBar />
          <Switch>
            <Route exact path="/" component={TodoListFormContainer} />
            <Route exact path="/TodoList" component={TodoListContainer} />
          </Switch>
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("app")
);

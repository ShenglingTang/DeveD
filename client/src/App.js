import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
//Redux
import { Provider } from 'react-redux'; //it connects react and redux
import store from "./store";
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';



const App = () => {

  useEffect(()=> {
    //check for token in localStorage when app first runs
    if (localStorage.token) {
      //if there is a token, set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    
    store.dispatch(loadUser());
  },[]);

  //wrap all the components with Provider so that they can access the state.
  
  return (
    <Provider store = {store}> 
      <Router>
          <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <section className='container'>
              <Alert />
              <Switch>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
              </Switch>
            </section>
            </Fragment>
        </Router>
    </Provider>
  );
}
  
  
  
  

export default App;
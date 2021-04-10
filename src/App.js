import { useState } from 'react';
import { UserContext } from './context/UserContext';
import { BrowserRouter as  Router, Route, Switch } from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { ToastContainer } from 'react-toastify';

import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import Footer from './layout/Footer';
import Header from './layout/Header';

import firebaseConfig from './config/firebaseConfig';
firebase.initializeApp(firebaseConfig);

function App() {
  
  const [user, setUser] = useState(null);

  return (
    <Router>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route path="*" component={PageNotFound} />
        </Switch>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
}

export default App;

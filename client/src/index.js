import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    Route,
    Switch,
    BrowserRouter as Router
} from 'react-router-dom'
import App from './components/App'
import Nav from './components/Nav'
import Create from './components/Create'
import Contact from './components/Contact'
import Post from './components/Post'
import Notfound from './components/Notfound'
import PostList from './components/PostList';

const routing = (
    <Router>
      <div>
        <Nav />
        <Switch>
            <Route exact path="/posts" component={PostList} />
            <Route exact path="/create" component={Create} />
            <Route path="/:id" component={Post} />
            <Route exact path="/" component={App} />
            <Route path="/contact" component={Contact} />
            <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));


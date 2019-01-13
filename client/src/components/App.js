import React, { Component } from 'react';
import {
  Route,
  Link,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom'
import Nav from './Nav'
import Update from './Update'
import Create from './Create'
// import Notfound from './components/Notfound'
import { api } from '../api/init'
import store from '../config/store'
import { setPostsAction, setLoggedInAction, setLoginErrorAction } from '../config/actions'


// const routing = (
//   <Router>
//     <div>
//       <Nav />
//       <Switch>
//           <Route path="/" component={Nav} />
//           <Route path="/update/:id" component={Update} />
//           <Route path="/create" component={Create} />
//           {/* <Route component={Notfound} /> */}
//       </Switch>
//     </div>
//   </Router>
// )

class App extends Component {

  fetchPosts() {
    api.get('/posts').then((res) => {
      store.dispatch(setPostsAction(res.data))
    }).catch((err) => {
      console.error('Couldn\'t retrieve posts', err)
    })
  }

  componentDidMount(){
    this.fetchPosts()
  }

  render() {
    const posts = store.getState().posts
    return (
      <div className="App">
        <h1>Posts</h1>
        <ul>
          {posts.map(post => <li key={post._id}>{post.title}</li> )}
        </ul>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import store from './config/store';
import App from './components/App'

const render = () => ReactDOM.render(<App />, document.getElementById('root'));

store.subscribe(render)
render()


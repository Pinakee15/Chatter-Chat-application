import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join.js'

function App() {
    return (
        <div className="App" >
            <Router>
                <Route path="/" exact component={Join} ></Route>
                <Route path="/chat" component={Chat} ></Route>
            </Router>
        </div>
    )
}

export default App

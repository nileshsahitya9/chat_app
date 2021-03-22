import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


// import Join Component
import Join from '../Components/Join';

// import Chat Component
import Chat from '../Components/Chat';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/chat" component={Chat} />
                <Route path="/" component={Join} />
            </Switch>
        </Router>
    );
}
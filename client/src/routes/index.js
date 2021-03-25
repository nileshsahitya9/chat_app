import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


// import Join Component
import Join from '../components/join';

// import Chat Component
import Chat from '../components/chat';

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
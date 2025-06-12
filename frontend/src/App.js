import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Register from './Register';
import Login from './Login';

import TrainingPlans from './TrainingPlans';
import NotFound from './NotFound';

function App() {

  const isAuthenticated = () => {
    // Tutaj implementacja sprawdzania, czy użytkownik jest zalogowany
    // Przechowanie tokenu w localStorage
    return localStorage.getItem('access_token') !== null;
};



    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/training-plans" render={() => (
                    isAuthenticated() ? <TrainingPlans /> : <Redirect to="/login" />
                )} />
                {/* Inne ścieżki */}
                
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
}

export default App;

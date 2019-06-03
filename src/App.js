import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage'
import {HashRouter} from 'react-router-dom'
import routes from './routes'
function App() {
  return (
    <HashRouter>
      <div className="App">
        {routes}
      </div>
    </HashRouter>
  );
}

export default App;
